'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { GenerationForm } from '@/components/create/generation-form';
import { ImagePreview } from '@/components/create/image-preview';
import { generateImage } from '@/lib/comfyui';
import { checkComfyUIStatus } from '@/lib/api';
import type { GenerationParams } from '@/lib/types';

export default function CreatePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isComfyUIReady, setIsComfyUIReady] = useState(false);

  useEffect(() => {
    checkComfyUIStatus().then(setIsComfyUIReady);
  }, []);

  const handleGenerate = async (params: GenerationParams) => {
    if (!isComfyUIReady) {
      setError('ComfyUI is not running. Please start it and try again.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = await generateImage(params);
      setGeneratedImage(imageUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <GenerationForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            error={error}
          />
          <ImagePreview imageUrl={generatedImage} />
        </div>
      </main>
    </div>
  );
}