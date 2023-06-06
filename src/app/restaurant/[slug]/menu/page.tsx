import NavBar from "@/components/NavBar";
import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import RestaurantDetailsMenu from "@/components/RestaurantDetailsMenu";
import RestaurantNavBar from "@/components/RestaurantNavBar";

const RestaurantMenu = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <RestaurantDetailsHeader />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar />
            <RestaurantDetailsMenu />
          </div>
        </div>
      </main>
    </main>
  );
};

export default RestaurantMenu;
