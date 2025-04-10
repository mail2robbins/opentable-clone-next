import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Background pattern overlay */}
      {/* <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat"></div> */}
      
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Find your table for any occasion
        </h1>
        
        {/* SEARCH BAR */}
        <div className="w-full max-w-3xl">
          <SearchBar />
        </div>
        {/* SEARCH BAR */}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default Header;
