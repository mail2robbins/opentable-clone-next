import SearchBar from "./SearchBar";

const SearchHeader = ({ city }: { city?: string }) => {
  return (
    <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
      <SearchBar city={city} />
    </div>
  );
};

export default SearchHeader;
