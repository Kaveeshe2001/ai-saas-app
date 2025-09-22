import { useCallback, useMemo, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { generatedAIImageAPI, getCloudinarySignatureAPI } from "../../services/GeneratedImageService";
import axios from "axios";
import { toast } from "react-toastify";
import ConfigurationForm from "./_components/ConfigurationForm";
import DisplayImage from "./_components/DisplayImage";
import apiClient from "../../services/apiClient";

const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    if (arr.length < 2) throw new Error("Invalid Base64 string");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Could not determine MIME type");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

const allStyles = ["Realistic", "Ghibli style", "Anime style", "Cartoon style", "Fantasy style", "3D style", "Portrait style"];
const freeStyles = ["Realistic", "Cartoon style", "Portrait style"];

const GenerateImages = () => {
  const { isPremium } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(allStyles[0]);
  const [makePublic, setMakePublic] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const availableStyles = useMemo(() => (
    isPremium ? allStyles : freeStyles
  ), [isPremium]);

  const handleSubmit = useCallback (async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setGeneratedImageUrl(null);

    try {
      //Generate the AI image
      const aiResponse = await generatedAIImageAPI(prompt, selectedStyle);
      if (!aiResponse || !aiResponse.imageUrl) throw new Error("AI did not return an image.");
      const imageFile = base64ToFile(aiResponse.imageUrl, "ai-generated-image.png");

      //Get the signature for Cloudinary upload
      const sigResponse = await getCloudinarySignatureAPI();
      if (!sigResponse) throw new Error("Could not get upload signature.");
      const { signature, timestamp, apiKey, cloudName, folder } = sigResponse;

      //Upload the file directly to Cloudinary
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('api_key', apiKey);
      formData.append('timestamp', String(timestamp));
      formData.append('signature', signature);
      formData.append('folder', folder);

      const cloudinaryResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const finalImageUrl = cloudinaryResponse.data.secure_url;

      //Save the final Url and details to DB
      //await saveImageToDB_API({ prompt, style: selectedStyle, imageUrl: finalImageUrl, isPublic: makePublic });
      await apiClient.post('/generate-images/save', { 
          prompt, 
          style: selectedStyle, 
          imageUrl: finalImageUrl, 
          isPublic: makePublic 
      });

      //display Image
      setGeneratedImageUrl(finalImageUrl);
      toast.success("Image generated successfully!");

    } catch (error) {
      toast.error("An error occurred during image generation.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedStyle, makePublic, isPremium]);

  return (
    <div className="bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        {isLoading ? (
          <div className="text-center text-gray-600">
            <svg className="animate-spin h-8 w-8 text-[var(--primary-color)] mx-auto mb-4" viewBox="0 0 24 24">...</svg>
            <p className="text-lg font-semibold">Generating your masterpiece...</p>
            <p>This can take up to 30 seconds.</p>
          </div>
        ) : generatedImageUrl ? (
          <DisplayImage imageUrl={generatedImageUrl} onGenerateAnother={() => setGeneratedImageUrl(null)} />
        ) : (
          <ConfigurationForm 
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              availableStyles={availableStyles}
              allStyles={allStyles}
              makePublic={makePublic}
              setMakePublic={setMakePublic}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              isPremium={isPremium}
          />
        )}
      </div>
    </div>
  )
}

export default GenerateImages
