import NavBar from "@/components/NavBar";
import SearchCard from "@/components/SearchCard";
import SearchHeader from "@/components/SearchHeader";
import SearchSideBar from "@/components/SearchSideBar";

const SearchPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <SearchHeader />
        <div className="flex py-4 m-auto w-2/3 justify-between items-start">
          <SearchSideBar />
          <div className="w-5/6">
            <SearchCard />
          </div>
        </div>
      </main>
    </main>
  );
};

export default SearchPage;
