import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Textarea } from "~/components/ui/textarea";

interface VideoUploadProps {
  onUpload?: (file: File) => void;
  maxSize?: number; // in bytes
}

export const VideoUpload = ({
  onUpload,
  maxSize = 100 * 1024 * 1024,
}: VideoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const openRef = useRef<() => void | undefined>();

  const resetUpload = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setVideoName(null);
    setError(null);
    setDescription("");
    openRef.current?.();
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      const file = acceptedFiles[0];

      if (!file) return;

      if (!file.type.startsWith("video/")) {
        setError("Please upload a video file");
        return;
      }

      if (file.size > maxSize) {
        setError(
          `File size must be less than ${Math.floor(maxSize / (1024 * 1024))}MB`,
        );
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setVideoName(file.name);
      onUpload?.(file);
    },
    [maxSize, onUpload],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      "video/*": [],
    },
    maxSize,
    multiple: false,
  });

  openRef.current = open;

  return (
    <div className="h-full">
      {!videoPreview && (
        <div
          {...getRootProps()}
          className={`mx-auto flex h-72 max-w-4xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          } hover:border-gray-400`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <p className="text-gray-600">
              {isDragActive
                ? "Drop the video here"
                : "Drag and drop a video file here, or click to select"}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Maximum file size: {Math.floor(maxSize / (1024 * 1024))}MB
            </p>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
        </div>
      )}

      {videoPreview && (
        <div className="mx-auto flex max-w-3xl flex-col space-y-4">
          <div className="overflow-hidden rounded-lg border border-gray-200 p-4">
            <h3 className="mb-2 text-lg font-semibold">{videoName}</h3>
            <div className="relative aspect-video">
              <video
                controls
                className="absolute h-full w-full rounded-lg object-contain"
                src={videoPreview}
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-gray-200 p-4">
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Edit the video with natural language
              </label>
              <Textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetUpload}
              className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              New Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
