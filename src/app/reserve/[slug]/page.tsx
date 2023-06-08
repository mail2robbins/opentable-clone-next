import ReservationForm from "@/components/ReservationForm";
import RestaurantReserveHeader from "@/components/RestaurantReserveHeader";

const Reserve = () => {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <RestaurantReserveHeader />
        <ReservationForm />
      </div>
    </div>
  );
};

export default Reserve;
