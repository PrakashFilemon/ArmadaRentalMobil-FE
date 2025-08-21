import { Link } from "react-router-dom";
// import BreadCrumbRental from "./BreadCrumb";
import RentalForm from "./RentalForm";

const Rental = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      {/* <div className="mb-6">
        <BreadCrumbRental />
      </div> */}

      <Link
        to="/"
        className="mb-8 inline-flex items-center justify-center w-full sm:w-auto h-12 px-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out rounded-lg text-white text-base font-medium shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali ke Beranda
      </Link>

      <RentalForm />
    </div>
  );
};

export default Rental;
