import { RiHeartFill, RiHeartLine } from "@remixicon/react";
import type { PublicImage } from "../../../models/GeneratedImage";
import { useState } from "react";
import { toast } from "react-toastify";
import { likeImageAPI } from "../../../services/GeneratedImageService";

interface ImageCardProps {
    image: PublicImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
  const [isLiked, setIsLiked] = useState(image.isLikedByCurrentUser || false);
  const [likeCount, setLikeCount] = useState(image.likes || 0);

  const handleLikeClick = async () => {
    const originalLikedStatus = isLiked;
    const originalLikeCount = likeCount;

    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    try {
        const result = await likeImageAPI(image.id);
        setLikeCount(result.newLikeCount);
    } catch (error) {
        toast.error("Failed to update like status.");
        setIsLiked(originalLikedStatus);
        setLikeCount(originalLikeCount);
    }
  }

  return (
    <div className="group relative block w-full aspect-square overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1">
      <img
        src={image.imageUrl}
        alt={image.prompt}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
        <p className="text-white text-sm font-medium truncate group-hover:whitespace-normal">
            {image.prompt}
        </p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-300">by @{image.userName}</p>
            <div className="flex items-center gap-1 text-white bg-black/30 rounded-full px-2 py-1">
                <button
                    onClick={handleLikeClick}
                    className={`flex items-center gap-1 rounded-full px-2 py-1 transition-colors ${
                        isLiked ? 'text-red-500 bg-white/30' : 'text-white bg-black/30 hover:bg-white/20'
                    }`}
                >
                    {isLiked ? <RiHeartFill size={16} /> : <RiHeartLine size={16} />}
                    <span className="text-xs font-bold">{likeCount}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
