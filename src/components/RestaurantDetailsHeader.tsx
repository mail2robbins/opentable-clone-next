const RestaurantDetailsHeader = ({
  name,
  location,
}: {
  name: string;
  location: string;
}) => {
  return (
    <div className="relative h-52 overflow-hidden shadow-lg">
      {/* Background gradient with modern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] opacity-90 shadow-inner">
        {/* Subtle pattern overlay for texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      </div>
      
      {/* Content container with improved positioning */}
      <div className="relative h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        {/* Restaurant name with modern typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold capitalize text-center tracking-tight drop-shadow-md">
          {name}
        </h1>
        
        {/* Location with subtle styling */}
        <div className="mt-3 text-white/90 text-lg sm:text-xl font-medium drop-shadow-sm">
          {location}
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default RestaurantDetailsHeader;
