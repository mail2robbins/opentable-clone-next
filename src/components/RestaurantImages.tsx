import { Image } from "lucide-react";

const RestaurantImages = ({ images }: { images: string[] }) => {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Image className="w-5 h-5 text-gray-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          {images.length} {images.length === 1 ? "Photo" : "Photos"}
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative aspect-square rounded-lg overflow-hidden group"
          >
            <img 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              src={image} 
              alt={`Restaurant image ${index + 1}`} 
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantImages;
