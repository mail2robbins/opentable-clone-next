import NavBar from "@/components/NavBar";
import ReservationForm from "@/components/ReservationForm";
import RestaurantReserveHeader from "@/components/RestaurantReserveHeader";

const Reserve = () => {
  return (
    <main className="bg-gray-100 min-h-screen w-screen text-black">
      <main className="max-w-screen-2xl m-auto bg-white">
        <NavBar />
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <RestaurantReserveHeader />
            <ReservationForm />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Reserve;
