'use client';

import Link from 'next/link';
import { ImagePlus, Images } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold">
          AI Gallery
        </Link>
        
        <div className="flex items-center gap-4">
          <Link
            href="/gallery"
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Images className="h-5 w-5" />
            <span>Gallery</span>
          </Link>
          
          <Link
            href="/create"
            className="flex items-center gap-2 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ImagePlus className="h-5 w-5" />
            <span>Create</span>
          </Link>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}