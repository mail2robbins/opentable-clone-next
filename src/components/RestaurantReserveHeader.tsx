import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";

const RestaurantReserveHeader = ({
  name,
  image,
  date,
  partySize,
}: {
  name: string;
  image: string;
  date: string;
  partySize: string;
}) => {
  const [day, time] = date.split("T");
  return (
    <div>
      <h3 className="font-bold">You&apos;re almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "ccc, LLL d, yyyy")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReserveHeader;
