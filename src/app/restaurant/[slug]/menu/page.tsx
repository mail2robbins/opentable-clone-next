import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import RestaurantDetailsMenu from "@/components/RestaurantDetailsMenu";
import RestaurantNavBar from "@/components/RestaurantNavBar";

const RestaurantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar />
        <RestaurantDetailsMenu />
      </div>
    </>
  );
};

export default RestaurantMenu;
