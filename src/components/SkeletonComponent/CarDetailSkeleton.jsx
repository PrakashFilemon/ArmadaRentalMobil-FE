import { Skeleton } from "../ui/skeleton";
import "./ShimmerEffect.css"; // Pastikan file CSS dimasukkan

const CarDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="relative group">
          <Skeleton className="w-full h-96 bg-gray-200 rounded-3xl" />
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-10 w-48 bg-gray-300" />
            <Skeleton className="h-8 w-24 bg-green-500 rounded-lg" />
          </div>

          <Skeleton className="h-6 w-56 bg-gray-300" />
          <Skeleton className="h-24 w-full bg-gray-300" />

          <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-xl shadow-md">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 bg-gray-300" />
                <Skeleton className="h-6 w-24 bg-gray-300" />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="h-12 w-full md:w-1/2 bg-green-600 rounded-xl" />
            <Skeleton className="h-12 w-full md:w-1/2 bg-yellow-500 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailSkeleton;
