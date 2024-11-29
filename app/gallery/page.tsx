'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import type { Image } from '@/lib/types';

export default function GalleryPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/images?page=${page}`);
      const data = await response.json();
      setImages((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="overflow-hidden rounded-lg border bg-card">
              <div className="aspect-square">
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm">{image.prompt}</p>
                {image.category && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                    {image.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {!loading && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
}