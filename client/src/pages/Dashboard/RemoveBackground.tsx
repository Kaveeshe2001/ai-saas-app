import { useState } from "react"
import { toast } from "react-toastify";
import { removeBackgroundAPI } from "../../services/ImageEditingService";
import { RiDownloadLine, RiRefreshLine, RiSparkling2Fill, RiUploadCloud2Line } from "@remixicon/react";

const RemoveBackground = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null); 
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file (eg: JPG, PNG)");
        return;
      }
      setOriginalImageFile(file);
      setOriginalImageUrl(URL.createObjectURL(file)); // Create URL for preview
      setProcessedImageUrl(null); // Clear previous processed image
    }
  };

  const handleRemoveBackground = async () => {
    if (!originalImageFile) {
      toast.error("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setProcessedImageUrl(null); // Clear previous result

    try {
      const result = await removeBackgroundAPI(originalImageFile);
      if (result && result.processedImageUrl) {
        setProcessedImageUrl(result.processedImageUrl);
        toast.success("Background removed successfully!");
      } else {
        toast.error("Received an invalid response from the server.");
      }
    } catch (error) {
      toast.error("Failed to remove background. Please try again.");
      console.error("Error removing background:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImageFile(null);
    setOriginalImageUrl(null);
    setProcessedImageUrl(null);
    setIsLoading(false);
  };

  //UI rendering logic
  if (processedImageUrl) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 text-green-600">
            <RiSparkling2Fill size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Background Removed!</h2>
          </div>

          <div className="relative w-full h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mb-6 overflow-hidden bg-gray-100">
            <img 
                src={processedImageUrl} 
                alt="Processed" 
                className="max-w-full max-h-full object-contain" // Ensures image fits without distortion
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={processedImageUrl}
              download="background-removed.png"
              className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <RiDownloadLine size={20} /> Download Image
            </a>

            <button
              onClick={handleReset}
              className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <RiRefreshLine size={20} /> Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  //Display original image preview
  if (originalImageUrl) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex gap-3 mb-6 text-[var(--primary-color)]">
            <RiSparkling2Fill size={24} />
            <h2 className="text-2xl font-bold text-gray-800">Remove Image Background</h2>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mb-4">Image Preview:</h3>

          <div className="relative w-full h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mb-6 overflow-hidden bg-gray-100">
            <img 
              src={originalImageUrl} 
              alt="Original" 
              className="max-w-full max-h-full p-2 object-contain" // Ensures image fits without distortion
            />

            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleRemoveBackground}
            disabled={isLoading}
            className="w-full bg-[var(--primary-color)] text-white font-bold py-3 px-4 cursor-pointer rounded-md hover:bg-green-700 disabled:bg-green-300 flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? 'Removing Background...' : 'Remove Background'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 w-full bg-gray-400 text-white font-bold py-3 px-4 cursor-pointer rounded-md hover:bg-gray-500 transition-colors flex items-center justify-center gap-2"
          >
            Change Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-10 bg-gray-50">
      <div className="w-full bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-6 text-green-600">
          <RiSparkling2Fill size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Remove Image Background</h2>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Your Image</h3>

        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <RiUploadCloud2Line size={48} className="text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">Click to Upload or Drag & Drop</span>
          <span className="text-xs text-gray-400 mt-1">Supports PNG, JPG, JPEG, WebP</span>
        </label>
      </div>
    </div>
  );
};

export default RemoveBackground;
