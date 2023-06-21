const RestaurantDetailsHeader = ({
  name,
  location,
}: {
  name: string;
  location: string;
}) => {
  return (
    <div className="h-72 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {name} ({location})
        </h1>
      </div>
    </div>
  );
};

export default RestaurantDetailsHeader;
