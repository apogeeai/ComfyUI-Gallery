import { APIError, fetchWithError } from './api';
import type { GenerationParams } from './types';

const COMFYUI_URL = 'http://localhost:7860';

interface WorkflowResponse {
  prompt_id: string;
  number: number;
}

interface QueueResponse {
  status: {
    exec_info: {
      queue_remaining: number;
    };
  };
}

interface HistoryResponse {
  [key: string]: {
    outputs: {
      [key: string]: {
        images: Array<{
          filename: string;
          type: string;
          subfolder: string;
        }>;
      };
    };
  };
}

export async function generateImage(params: GenerationParams): Promise<string> {
  try {
    const workflow = {
      "3": {
        "inputs": {
          "seed": params.seed ?? -1,
          "steps": params.steps ?? 20,
          "cfg": 7,
          "sampler_name": "euler",
          "scheduler": "normal",
          "denoise": 1,
          "model": ["4", 0],
          "positive": params.prompt,
          "negative": params.negativePrompt || "",
          "latent_image": ["5", 0]
        },
        "class_type": "KSampler"
      },
      "4": {
        "inputs": {
          "ckpt_name": "sd_xl_base_1.0.safetensors"
        },
        "class_type": "CheckpointLoaderSimple"
      },
      "5": {
        "inputs": {
          "width": params.width ?? 512,
          "height": params.height ?? 512,
          "batch_size": 1
        },
        "class_type": "EmptyLatentImage"
      },
      "6": {
        "inputs": {
          "samples": ["3", 0],
          "vae": ["4", 2]
        },
        "class_type": "VAEDecode"
      },
      "7": {
        "inputs": {
          "filename_prefix": "ComfyUI",
          "images": ["6", 0]
        },
        "class_type": "SaveImage"
      }
    };

    const promptResponse = await fetchWithError(`${COMFYUI_URL}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: workflow,
        client_id: crypto.randomUUID(),
      }),
    });

    const { prompt_id }: WorkflowResponse = await promptResponse.json();

    while (true) {
      const queueResponse = await fetchWithError(`${COMFYUI_URL}/queue`);
      const queueData: QueueResponse = await queueResponse.json();

      if (queueData.status.exec_info.queue_remaining === 0) {
        const historyResponse = await fetchWithError(`${COMFYUI_URL}/history/${prompt_id}`);
        const historyData: HistoryResponse = await historyResponse.json();

        if (historyData[prompt_id]) {
          const outputs = historyData[prompt_id].outputs;
          const imageNode = Object.values(outputs).find(output => output.images?.length > 0);
          
          if (imageNode && imageNode.images[0]) {
            const image = imageNode.images[0];
            return `${COMFYUI_URL}/view?filename=${image.filename}&subfolder=${image.subfolder}&type=${image.type}`;
          }
        }
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    throw new APIError('Image generation failed', 500);
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError('Failed to connect to ComfyUI', 503);
  }
}