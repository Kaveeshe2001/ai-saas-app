import { RiImageLine, RiSparkling2Fill, RiVipCrownFill } from "@remixicon/react";
import Textarea from "../../../components/ui/TextArea/Textarea";
import { useState } from "react";

interface ConfigurationFormProps {
    prompt: string;
    setPrompt: (value: string) => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    availableStyles: string[];
    allStyles: string[];
    makePublic: boolean;
    setMakePublic: (value: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    isPremium: boolean;
}

const ConfigurationForm = ({
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    availableStyles,
    allStyles,
    makePublic,
    setMakePublic,
    handleSubmit,
    isLoading,
    isPremium,
}: ConfigurationFormProps) => {
  
  const premiumStyles = ["Ghibli style", "Fantasy style", "3D style", "Cinematic"];
  const [errors, setErrors] = useState<{
    prompt?: string;
  }>({});

  const newErrors: {prompt?: string;} = {};
  
  if (!prompt) {
      newErrors.prompt = "Please describe the image you want to generate.";
  }
  
  if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
  } else {
      setErrors({});
  }
  
  setErrors({});

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center gap-3 mb-6 text-blue-600">
        <RiSparkling2Fill size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Generate Your Image</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <Textarea
            id='prompt'
            value={prompt}
            name='prompt'
            label='Describe Your Image'
            onChange={(e) => setPrompt(e.target.value)}
            error={errors.prompt}
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
              Style
          </label>
          <div className="flex flex-wrap gap-3">
            {allStyles.map((style) => {
              const isAvailable = availableStyles.includes(style);
              const isPremiumStyle = premiumStyles.includes(style);

              return (
                <button
                    key={style}
                    type="button"
                    onClick={() => isAvailable && setSelectedStyle(style)}
                    disabled={!isAvailable}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-md transition-colors flex items-center gap-2 ${
                        selectedStyle === style
                            ? 'bg-blue-500 text-white'
                            : isAvailable
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    title={!isAvailable ? "Upgrade to Premium to use this style" : ""}
                >
                    {isPremiumStyle && <RiVipCrownFill size={16} className={isPremium ? "text-yellow-400" : "text-gray-400"} />}
                    {style}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <label htmlFor="makePublic" className="text-sm font-medium text-gray-700 cursor-pointer">
              Make this image Public
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
              <input
                  type="checkbox"
                  id="makePublic"
                  checked={makePublic}
                  onChange={(e) => setMakePublic(e.target.checked)}
                  className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center gap-2 transition-colors"
        >
            {isLoading ? (
                 <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Image...
                </>
            ) : (
                <>
                    <RiImageLine size={20} /> Generate Image
                </>
            )}
        </button>
      </form>
    </div>
  )
}

export default ConfigurationForm
