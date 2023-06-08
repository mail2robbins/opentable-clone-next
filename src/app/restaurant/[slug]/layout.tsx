import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import React from "react";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RestaurantDetailsHeader />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
