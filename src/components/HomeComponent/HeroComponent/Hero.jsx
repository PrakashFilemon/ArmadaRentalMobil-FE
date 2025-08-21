import HeroImage from "@/assest/images/Hero image.jpg";
import { Link } from "react-router-dom"; // Import Link untuk navigasi

const HeroComponent = () => {
  return (
    <div className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Hero Image */}
      <img
        src={HeroImage}
        className="absolute top-0 left-0 w-full h-full object-cover"
        alt="Hero"
        loading="eager" // Prioritas loading gambar
      />

      {/* Overlay dengan gradient yang ditingkatkan */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-16 w-full max-w-screen-xl mx-auto py-8">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-extrabold tracking-wide drop-shadow-lg mb-4 md:mb-6">
          Armada Rental Mobil Cibubur
        </h1>

        <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl max-w-md md:max-w-lg lg:max-w-2xl mx-auto font-serif font-medium drop-shadow-lg mb-6 md:mb-8">
          Rental Mobil di daerah Cibubur menjadi lebih mudah dan hemat waktu
          secara online. <br className="hidden sm:block" /> Kami menawarkan sewa
          mobil yang terpercaya dan aman ketika Anda membutuhkannya.
        </p>

        {/* <Link
          to="/sewa"
          className="inline-block mt-2 px-6 py-3 sm:px-8 sm:py-4 bg-green-500 text-white text-sm sm:text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Mulai Sewa Sekarang
        </Link> */}
      </div>

      {/* Tambahan elemen dekoratif untuk layar besar */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/80 to-transparent"></div>
    </div>
  );
};

export default HeroComponent;
