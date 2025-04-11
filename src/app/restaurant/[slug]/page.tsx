import RestaurantDetailsDescription from "@/components/RestaurantDetailsDescription";
import RestaurantDetailsHeader from "@/components/RestaurantDetailsHeader";
import RestaurantDetailsRating from "@/components/RestaurantDetailsRating";
import RestaurantDetailsReviews from "@/components/RestaurantDetailsReviews";
import RestaurantDetailsTitle from "@/components/RestaurantDetailsTitle";
import RestaurantImages from "@/components/RestaurantImages";
import RestaurantNavBar from "@/components/RestaurantNavBar";
import RestaurantReservation from "@/components/RestaurantReservation";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
import { MapPin, Clock, DollarSign } from "lucide-react";

const prisma = new PrismaClient();
export interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  open_time: string;
  close_time: string;
  slug: string;
  price: PRICE;
  location: Location;
  cuisine: Cuisine;
  reviews: Review[];
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      open_time: true,
      close_time: true,
      slug: true,
      price: true,
      location: true,
      cuisine: true,
      reviews: true,
    },
  });

  if (!restaurant) {
    throw new Error("Cannot find restaurant!");
  }
  return restaurant;
};

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  // Format time for display
  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get price level display
  const getPriceLevel = (price: PRICE) => {
    switch (price) {
      case "CHEAP":
        return "$";
      case "REGULAR":
        return "$$";
      case "EXPENSIVE":
        return "$$$";
      default:
        return "$$";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero section with first image */}
      <div className="relative h-64 md:h-96 w-full rounded-xl overflow-hidden mb-8">
        {restaurant.images.length > 0 && (
          <img 
            src={restaurant.images[0]} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{restaurant.location.name}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTime(restaurant.open_time)} - {formatTime(restaurant.close_time)}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>{getPriceLevel(restaurant.price)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Restaurant details */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <RestaurantNavBar slug={restaurant.slug} />
              <div className="mt-6">
                <RestaurantDetailsRating reviews={restaurant.reviews} />
              </div>
              <div className="mt-6">
                <RestaurantDetailsDescription desc={restaurant.description} />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100">
              <RestaurantImages images={restaurant.images} />
            </div>
            
            <div className="p-6 border-t border-gray-100">
              <RestaurantDetailsReviews reviews={restaurant.reviews} />
            </div>
          </div>
        </div>
        
        {/* Right column - Reservation */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-8">
            <RestaurantReservation
              openTime={restaurant.open_time}
              closeTime={restaurant.close_time}
              slug={restaurant.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
