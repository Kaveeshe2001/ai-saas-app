import { RiSparkling2Fill } from "@remixicon/react"

interface DisplayObjectRemovedImageProps {
    processedImage: string;
    resetState: () => void;
}

const DisplayObjectRemovedImage = ({
    processedImage, 
    resetState 
}: DisplayObjectRemovedImageProps) => {
  return (
    <div className="max-w-4xl mx-auto p-10 text-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-[var(--primary-color)]"><RiSparkling2Fill /></span>
            <h2 className="text-2xl font-bold text-gray-800">Your Result</h2>
        </div>
        <div className="relative inline-block border shadow-lg mb-6">
            <img src={processedImage} alt="Processed result" className="block max-w-full max-h-[400px]" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
            <a 
                href={processedImage} 
                download="object-removed.png" 
                className="flex-1 bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
                Download Image
            </a>
            <button 
                onClick={resetState} 
                className="flex-1 bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
                Start Over
            </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayObjectRemovedImage;
