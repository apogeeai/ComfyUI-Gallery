'use client';

import { useState } from 'react';
import { AlertCircle, Loader2, Wand2 } from 'lucide-react';
import type { GenerationParams } from '@/lib/types';

interface GenerationFormProps {
  onGenerate: (params: GenerationParams) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export function GenerationForm({ onGenerate, isGenerating, error }: GenerationFormProps) {
  const [params, setParams] = useState<GenerationParams>({
    prompt: '',
    negativePrompt: '',
    width: 512,
    height: 512,
    steps: 20,
    seed: -1,
  });

  const handleOptimizePrompt = async () => {
    if (!params.prompt) return;
    const enhancedPrompt = `${params.prompt}, highly detailed, professional quality, trending on artstation, 8k resolution`;
    setParams({ ...params, prompt: enhancedPrompt });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Create Image</h1>
      
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Prompt</label>
          <div className="mt-1 flex gap-2">
            <textarea
              value={params.prompt}
              onChange={(e) => setParams({ ...params, prompt: e.target.value })}
              className="w-full rounded-lg border bg-background px-3 py-2"
              rows={4}
              placeholder="Describe your image..."
            />
            <button
              onClick={handleOptimizePrompt}
              disabled={!params.prompt}
              className="flex-shrink-0 rounded-lg border px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
            >
              <Wand2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Negative Prompt</label>
          <textarea
            value={params.negativePrompt}
            onChange={(e) => setParams({ ...params, negativePrompt: e.target.value })}
            className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
            rows={2}
            placeholder="What to avoid in the image..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Width</label>
            <input
              type="number"
              value={params.width}
              onChange={(e) => setParams({ ...params, width: parseInt(e.target.value) })}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
              min={64}
              max={2048}
              step={64}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Height</label>
            <input
              type="number"
              value={params.height}
              onChange={(e) => setParams({ ...params, height: parseInt(e.target.value) })}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
              min={64}
              max={2048}
              step={64}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Steps</label>
            <input
              type="number"
              value={params.steps}
              onChange={(e) => setParams({ ...params, steps: parseInt(e.target.value) })}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
              min={1}
              max={100}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Seed</label>
            <input
              type="number"
              value={params.seed}
              onChange={(e) => setParams({ ...params, seed: parseInt(e.target.value) })}
              className="mt-1 w-full rounded-lg border bg-background px-3 py-2"
              min={-1}
            />
          </div>
        </div>

        <button
          onClick={() => onGenerate(params)}
          disabled={isGenerating || !params.prompt}
          className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate Image'
          )}
        </button>
      </div>
    </div>
  );
}