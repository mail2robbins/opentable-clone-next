import NavBar from "@/components/NavBar";
import RestaurantDetailsDescription from "@/components/RestaurantDetailsDescription";
import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import RestaurantDetailsRating from "@/components/RestaurantDetailsRating";
import RestaurantDetailsReviews from "@/components/RestaurantDetailsReviews";
import RestaurantDetailsTitle from "@/components/RestaurantDetailsTitle";
import RestaurantImages from "@/components/RestaurantImages";
import RestaurantNavBar from "@/components/RestaurantNavBar";
import RestaurantReservation from "@/components/RestaurantReservation";

const RestaurantDetails = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <RestaurantDetailsHeader />
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[70%] rounded p-3 shadow">
            <RestaurantNavBar />
            <RestaurantDetailsTitle />
            <RestaurantDetailsRating />
            <RestaurantDetailsDescription />
            <RestaurantImages />
            <RestaurantDetailsReviews />
          </div>
          <div className="w-[27%] relative text-reg">
            <RestaurantReservation />
          </div>
        </div>
      </main>
    </main>
  );
};

export default RestaurantDetails;
