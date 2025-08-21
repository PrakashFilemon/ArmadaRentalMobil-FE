import ServiceCard from "./ServiceCard";
import SewaMobil from "@/assest/images/Sewa Mobil.jpg";
import Murah from "@/assest/images/Murah Image.jpg";
import Service from "@/assest/images/Service Mobil.jpg";
import Jam from "@/assest/images/Jam.jpg";
import { useEffect, useRef } from "react";

// Data layanan
const services = [
  {
    image: SewaMobil,
    title: "Pemesanan Yang Mudah",
    description:
      "Sewa mobil dapat dilakukan secara online dengan mengisi data diri dan memilih mobil yang Anda inginkan. Silahkan ambil di tempat kami.",
  },
  {
    image: Murah,
    title: "Harga Termurah",
    description:
      "Kami memberikan pilihan mobil dengan biaya sewa yang transparan dan paling murah di daerah kami.",
  },
  {
    image: Service,
    title: "Keamanan dan Kenyamanan",
    description:
      "Kami selalu melakukan pengecekan dan perawatan berkala sebelum mobil digunakan pelanggan agar aman dan nyaman.",
  },
  {
    image: Jam,
    title: "Selalu Siap Kapan Pun!",
    description:
      "Kami selalu siap melayani Anda kapan saja ketika ingin menyewa mobil.",
  },
];

const ServiceComponent = () => {
  // Ref untuk scrolling ke services section
  const sectionRef = useRef(null);

  // Effect untuk handle scrolling ketika id diklik di navbar
  useEffect(() => {
    const handleScrollToServices = () => {
      const hash = window.location.hash;
      if (hash === "#services" && sectionRef.current) {
        // Menambahkan timeout kecil untuk memastikan scroll berfungsi setelah render
        setTimeout(() => {
          sectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    };

    // Panggil handler saat komponen di-mount
    handleScrollToServices();

    // Event listener untuk perubahan URL
    window.addEventListener("hashchange", handleScrollToServices);
    return () => {
      window.removeEventListener("hashchange", handleScrollToServices);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-10 sm:py-16 px-2 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Title dengan ukuran responsif */}
        <div className="text-center mb-6 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Kenapa Sewa Mobil di Armada?
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-green-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-xs sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Kami memberikan Anda kenyamanan dalam berkendara bersama keluarga
            dan teman-teman Anda, dengan layanan terbaik dan harga terjangkau.
          </p>
        </div>

        {/* Services Grid - Tetap 4 kolom bahkan di mobile */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2 md:gap-4 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="h-full">
              <ServiceCard
                image={service.image}
                title={service.title}
                description={service.description}
              />
            </div>
          ))}
        </div>

        {/* Call-to-action responsif */}
        {/* <div className="mt-8 sm:mt-16 text-center">
          <a
            href="/sewa"
            className="inline-block bg-green-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-full hover:bg-green-600 transition duration-300 shadow-md hover:shadow-lg text-xs sm:text-base"
          >
            Sewa Mobil Sekarang
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default ServiceComponent;
