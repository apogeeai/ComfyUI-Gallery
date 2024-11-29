export interface GenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  seed?: number;
  style?: string;
}

export interface Image {
  id: string;
  url: string;
  prompt: string;
  params: GenerationParams;
  createdAt: string;
  category?: string;
}