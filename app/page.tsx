import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { ImagePlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Create Amazing AI Images
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Generate unique images using ComfyUI and browse an infinite gallery of AI-created artwork
          </p>
          <div className="mt-10">
            <Link
              href="/create"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
            >
              <ImagePlus className="h-5 w-5" />
              Start Creating
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}