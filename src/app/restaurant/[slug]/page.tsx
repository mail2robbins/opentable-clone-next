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
    <>
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
    </>
  );
};

export default RestaurantDetails;
