import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";

const SearchPage = () => {
  return (
    <>
      <SearchHeader />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          <SearchCard />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
