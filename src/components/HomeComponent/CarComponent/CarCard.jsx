import PropTypes from "prop-types";
import { BsPeople } from "react-icons/bs";
import { GiGearStick } from "react-icons/gi";
import { Link } from "react-router-dom";

const formatToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const CarCard = ({ car }) => {
  // Conditional class for status color
  const getStatusColor = () => {
    switch (car.status) {
      case "available":
        return "bg-green-600";
      case "rented":
        return "bg-red-600";
      case "repair":
        return "bg-yellow-500";
      default:
        return "bg-gray-700";
    }
  };

  const isAvailable = car.status === "available";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform duration-200 hover:shadow-lg hover:-translate-y-1">
      {/* Status badge - Improved positioning and sizing */}
      <div
        className={`absolute top-2 right-2 rounded-full py-1 px-2 sm:px-3 ${getStatusColor()} z-10`}
      >
        <p className="text-xs font-medium text-white capitalize">
          {car.status}
        </p>
      </div>

      {/* Car image - Better responsive sizing */}
      <div className="relative">
        <img
          src={car.image}
          className="w-full h-40 sm:h-44 md:h-48 object-cover"
          alt={`${car.brand} ${car.model || ""}`}
        />
      </div>

      {/* Card content - Improved spacing */}
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h2 className="text-lg sm:text-xl font-bold mb-1 text-gray-800 line-clamp-1">
          {car.brand}
        </h2>

        <p className="text-white bg-slate-800 rounded-md p-2 font-bold text-sm sm:text-base mb-3">
          {formatToRupiah(car.rentPerday)} per day
        </p>

        {/* Car details - Better mobile appearance */}
        <div className="border rounded-md p-2 sm:p-3 bg-gray-800 text-white mb-3">
          <div className="grid grid-cols-2 gap-2">
            <p className="flex items-center font-medium text-xs sm:text-sm">
              <BsPeople className="mr-1.5" /> {car.seat} Seats
            </p>
            <p className="flex items-center font-medium text-xs sm:text-sm">
              <GiGearStick className="mr-1.5" /> {car.transmission}
            </p>
            <p className="font-medium text-xs sm:text-sm col-span-2">
              Year: {car.carYear}
            </p>
          </div>
        </div>

        {/* Action buttons - Improved spacing and mobile presentation */}
        <div className="flex flex-col sm:flex-row mt-auto gap-2">
          <Link
            to={`/rental/car/${car?.id}`}
            className={`text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-300 font-medium rounded text-sm px-4 py-2 text-center w-full ${
              isAvailable ? "" : "bg-gray-400 pointer-events-none opacity-60"
            }`}
            disabled={!isAvailable}
          >
            Sewa
          </Link>
          <Link
            to={`/car/${car?.id}`}
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 font-medium rounded text-sm px-4 py-2 text-center w-full"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string,
    rentPerday: PropTypes.number.isRequired,
    seat: PropTypes.number.isRequired,
    transmission: PropTypes.string.isRequired,
    carYear: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["available", "rented", "repair"]).isRequired,
  }).isRequired,
};

export default CarCard;
