interface ImagePreviewProps {
  imageUrl: string | null;
}

export function ImagePreview({ imageUrl }: ImagePreviewProps) {
  return (
    <div className="rounded-lg border p-4">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated image"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Generated image will appear here
          </div>
        )}
      </div>
    </div>
  );
}