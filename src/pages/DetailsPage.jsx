import CarDetail from "@/assest/images/car.webp";
import { BsPeople } from "react-icons/bs";
import {
  MdOutlineDateRange,
  MdArrowBack,
  MdDirectionsCar,
} from "react-icons/md";
import { GiGearStick } from "react-icons/gi";
import {
  IoColorPaletteOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCar } from "@/redux/actions/car";
import CarDetailSkeleton from "@/components/SkeletonComponent/CarDetailSkeleton";

const formatToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const DetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { carInfo } = useSelector((state) => state.car);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCar(navigate, id));
  }, [dispatch, id, navigate]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleRent = () => {
    navigate(`/rental/car/${id}`);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "available":
        return (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
            Tersedia
          </div>
        );
      case "rented":
        return (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
            Disewa
          </div>
        );
      case "repair":
        return (
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
            Perbaikan
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Header with Breadcrumb */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
            >
              <MdArrowBack className="text-xl mr-1" />
              <span className="text-sm sm:text-base">Kembali</span>
            </button>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="text-gray-600 hover:text-blue-600 text-sm sm:text-base"
                  >
                    Beranda
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-blue-600 text-sm sm:text-base">
                      Detail Mobil
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight font-sans">
            Detail Mobil
          </h1>
        </div>

        {!carInfo ? (
          <CarDetailSkeleton />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative group overflow-hidden h-64 sm:h-80 md:h-96 lg:h-full">
                {renderStatus(carInfo?.status)}
                <div
                  className={`absolute inset-0 bg-gray-200  ${
                    isImageLoaded ? "opacity-0" : "opacity-100"
                  } transition-opacity duration-300`}
                ></div>
                <img
                  src={carInfo?.image || CarDetail}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  alt={`${carInfo?.brand} ${carInfo?.model}`}
                  onLoad={handleImageLoad}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Car Details Section */}
              <div className="p-6 sm:p-8 md:p-10 space-y-6">
                {/* Title and Price */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
                    <div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        {carInfo?.brand}
                      </h1>
                      <h2 className="text-lg sm:text-xl text-gray-600 mt-1">
                        {carInfo?.model} ({carInfo?.carYear})
                      </h2>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-lg sm:text-xl shadow-md">
                        {formatToRupiah(carInfo?.rentPerday)}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        per hari
                      </span>
                    </div>
                  </div>
                </div>

                {/* Car Information */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <IoInformationCircleOutline className="text-2xl text-blue-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      {carInfo?.information ||
                        "Mobil ini merupakan pilihan yang sempurna untuk perjalanan Anda dengan kenyamanan dan performa yang handal. Dilengkapi dengan fitur modern dan perawatan rutin, kami menjamin pengalaman berkendara yang menyenangkan."}
                    </p>
                  </div>
                </div>

                {/* Car Specifications */}
                <div className="grid grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl shadow-inner">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <GiGearStick className="text-xl text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transmisi</p>
                      <p className="font-medium">{carInfo?.transmission}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <BsPeople className="text-xl text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kapasitas</p>
                      <p className="font-medium">{carInfo?.seat} Orang</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <MdOutlineDateRange className="text-xl text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tahun</p>
                      <p className="font-medium">{carInfo?.carYear}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <IoColorPaletteOutline className="text-xl text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Warna</p>
                      <p className="font-medium">
                        {carInfo?.color || "Tidak tersedia"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rental Information */}
                {carInfo?.status === "available" ? (
                  <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                      <FaRegMoneyBillAlt className="text-xl text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">
                        Informasi Sewa
                      </h3>
                      <p className="text-sm text-green-700 mt-1">
                        Mobil ini tersedia untuk disewa. Harga sewa{" "}
                        {formatToRupiah(carInfo?.rentPerDay)} per hari sudah
                        termasuk asuransi dasar. Silakan klik tombol "Sewa
                        Sekarang" untuk melanjutkan.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-start space-x-3">
                    <div className="bg-yellow-100 p-2 rounded-full flex-shrink-0">
                      <MdDirectionsCar className="text-xl text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-800">
                        Informasi Sewa
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        Mohon maaf, mobil ini sedang{" "}
                        {carInfo?.status === "rented"
                          ? "disewa"
                          : "dalam perbaikan"}
                        . Silakan pilih mobil lain atau hubungi kami untuk
                        informasi lebih lanjut.
                      </p>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleRent}
                    disabled={carInfo?.status !== "available"}
                    className={`flex-1 font-bold py-3 px-4 rounded-xl shadow-lg transition-all duration-300 text-base sm:text-lg flex items-center justify-center
                      ${
                        carInfo?.status === "available"
                          ? "bg-green-600 hover:bg-green-700 text-white hover:shadow-green-200 hover:shadow-lg"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    {carInfo?.status === "available"
                      ? "Sewa Sekarang"
                      : "Tidak Tersedia"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
