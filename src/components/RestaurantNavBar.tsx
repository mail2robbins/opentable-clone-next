"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils } from "lucide-react";

const RestaurantNavBar = ({ slug }: { slug: string }) => {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-4">
      <Link 
        href={`/restaurant/${slug}`} 
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive(`/restaurant/${slug}`) 
            ? "bg-red-50 text-red-600 font-medium" 
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Home className="w-4 h-4 mr-2" />
        <span>Overview</span>
      </Link>
      <Link 
        href={`/restaurant/${slug}/menu`} 
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive(`/restaurant/${slug}/menu`) 
            ? "bg-red-50 text-red-600 font-medium" 
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        <Utensils className="w-4 h-4 mr-2" />
        <span>Menu</span>
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
