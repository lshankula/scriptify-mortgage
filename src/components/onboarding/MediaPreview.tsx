interface MediaPreviewProps {
  mediaBlob: Blob | null;
  mediaType: 'voice' | 'video' | null;
}

export const MediaPreview = ({ mediaBlob, mediaType }: MediaPreviewProps) => {
  if (!mediaBlob) return null;

  return (
    <div className="mt-4">
      {mediaType === 'video' ? (
        <video src={URL.createObjectURL(mediaBlob)} controls className="w-full" />
      ) : (
        <audio src={URL.createObjectURL(mediaBlob)} controls className="w-full" />
      )}
    </div>
  );
};