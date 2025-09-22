import { RiHeartLine } from "@remixicon/react";
import type { PublicImage } from "../../../models/GeneratedImage";

interface ImageCardProps {
    image: PublicImage;
}

const ImageCard = ({ image }: ImageCardProps) => {
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
                <RiHeartLine size={16} />
                <span className="text-xs font-bold">0</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
