import type { GenerationParams } from './types';

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function fetchWithError(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  
  if (!response.ok) {
    throw new APIError(
      `HTTP error! status: ${response.status}`,
      response.status,
      await response.json().catch(() => null)
    );
  }
  
  return response;
}

export async function checkComfyUIStatus(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:7860/system_stats');
    return response.ok;
  } catch {
    return false;
  }
}