import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { removeObjectAPI } from "../../services/ImageEditingService";
import { RiSparkling2Fill, RiUploadCloud2Line } from "@remixicon/react";

const RemoveObject = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setOriginalImage(e.target.files[0]);
      setProcessedImage(null);
    }
  };

  useEffect(() => {
    //Draw the uploaded image onto the main canvas
    if (originalImage && canvasRef.current && maskCanvasRef.current) {
      const canvas = canvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const maskCtx = maskCanvas.getContext('2d');
      const img = new Image();
      img.src = URL.createObjectURL(originalImage);
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        maskCanvas.width = img.width;
        maskCanvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        maskCtx!.fillStyle = 'black';
        maskCtx?.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
      };
    }
  }, [originalImage]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => setIsDrawing(false);
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !maskCanvasRef.current) return;
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d');
    const rect = maskCanvas.getBoundingClientRect();
    const scaleX = maskCanvas.width / rect.width;
    const scaleY = maskCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    maskCtx!.fillStyle = 'white';
    maskCtx?.beginPath();
    maskCtx?.arc(x, y, 20, 0, Math.PI * 2); // 20px brush size
    maskCtx?.fill();
  };

  const handleRemoveObject = async () => {
    if (!originalImage || !maskCanvasRef.current) {
      toast.error("Please upload an image and mark an area to remove.");
      return;
    }
    setIsLoading(true);

    maskCanvasRef.current.toBlob(async (blob) => {
      if (!blob) {
        toast.error("Could not create mask.");
        setIsLoading(false);
        return;
      }
      const maskFile = new File([blob], "mask.png", { type: "image/png" });

      try {
        const result = await removeObjectAPI(originalImage, maskFile);
        setProcessedImage(result.processedImageUrl);
        toast.success("Object removed successfully!");
      } catch (error) {
        toast.error("Failed to remove object.");
      } finally {
          setIsLoading(false);
      }
    }, "image/png");
  };

  if (processedImage) {
    return;
  }

  if (originalImage) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[var(--primary-color)]"><RiSparkling2Fill /></span>
            <h2 className="text-2xl font-bold text-gray-800">Marked the Object to Remove</h2>
          </div>
          <div className="relative inline-block border shadow-lg">
            <canvas ref={canvasRef} className="block" />
            <canvas 
              ref={maskCanvasRef} 
              className="absolute top-0 left-0 opacity-50 cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
            />
          </div>
          <button onClick={handleRemoveObject} disabled={isLoading} className="w-full bg-[var(--primary-color)] text-white font-bold py-3 px-4 rounded-md hover:bg-green-800 cursor-pointer disabled:bg-green-300 flex items-center justify-center gap-2 transition-colors">
            {isLoading ? 'Processing...' : 'Remove Object'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full mx-auto p-10 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[var(--primary-color)]"><RiSparkling2Fill /></span>
          <h2 className="text-2xl font-bold text-gray-800">Remove Object From Image</h2>
        </div>
        <h2 className="text-lg font-semibold text-[var(--title-color)] mb-4">Upload Your Image</h2>
        <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} className="hidden" />
        <label htmlFor="imageUpload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed cursor-pointer">
          <RiUploadCloud2Line size={48} className="text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">Click to Upload</span>
        </label>
      </div>
    </div>
  );
};

export default RemoveObject;
