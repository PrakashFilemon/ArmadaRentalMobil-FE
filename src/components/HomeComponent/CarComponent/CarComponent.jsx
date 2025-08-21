import { useDispatch, useSelector } from "react-redux";
import CarCard from "./CarCard";
import { useEffect } from "react";
import { getAllCars } from "@/redux/actions/car";

const CarComponent = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 my-6 sm:my-8 md:my-10 pt-6 sm:pt-10 md:pt-16">
      {/* Header Section - Improved text responsiveness */}
      <div className="text-center mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
          Daftar Mobil Kami
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
          Temukan mobil yang sesuai dengan kebutuhan Anda
        </p>
      </div>

      {/* Car Grid Section - Better responsive grid with consistent 4 columns on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <div key={car.id} className="h-full">
              <CarCard
                car={{
                  ...car,
                  rentPerday: parseFloat(car.rentPerday),
                }}
              />
            </div>
          ))
        ) : (
          // Error Message Section - Improved mobile styling
          <div className="col-span-full text-center text-white bg-red-500 p-4 sm:p-6 rounded-lg shadow-lg my-8">
            <p className="text-lg sm:text-xl font-bold">
              🚗 Maaf, belum ada mobil yang tersedia saat ini!
            </p>
            <p className="mt-2 text-sm sm:text-base text-white opacity-90">
              Silakan cek kembali nanti atau hubungi kami untuk informasi lebih
              lanjut.
            </p>
          </div>
        )}
      </div>

      {/* Optional: Pagination controls for large collections */}
      {cars && cars.length > 12 && (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border text-sm bg-gray-100 hover:bg-gray-200">
              Sebelumnya
            </button>
            <span className="px-3 py-1 rounded border bg-blue-500 text-white text-sm">
              1
            </span>
            <button className="px-3 py-1 rounded border text-sm bg-gray-100 hover:bg-gray-200">
              Selanjutnya
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default CarComponent;
