import { deleteCar, getAllCars } from "@/redux/actions/car";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiList,
  FiInfo,
  FiHome,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManagementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { cars } = useSelector((state) => state.car);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(getAllCars());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleDeleteCar = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mobil ini?")) {
      dispatch(deleteCar(id));
    }
  };

  // Format currency helper
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md p-3 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <button
            className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-white"
            onClick={() => navigate("/")}
          >
            <FiHome size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
            Data Mobil
          </h1>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded bg-gray-100"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => navigate("/management/rentals")}
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiList size={16} /> <span>Data Rental</span>
            </button>
            <button
              onClick={() => navigate("/management/detail-rental")}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiInfo size={16} /> <span>Detail Rental</span>
            </button>
            <button
              onClick={() => navigate("/management/add")}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiPlus size={16} /> <span>Tambah Mobil</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 space-y-2 sm:hidden">
            <button
              onClick={() => {
                navigate("/management/rentals");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-purple-600 text-white p-2 rounded"
            >
              <FiList /> Data Rental
            </button>
            <button
              onClick={() => {
                navigate("/management/detail-rental");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-indigo-600 text-white p-2 rounded"
            >
              <FiInfo /> Detail Rental
            </button>
            <button
              onClick={() => {
                navigate("/management/add");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-green-600 text-white p-2 rounded"
            >
              <FiPlus /> Tambah Mobil
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : cars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">Belum ada data mobil tersedia.</p>
            <button
              onClick={() => navigate("/management/add")}
              className="mt-3 flex items-center gap-1 mx-auto bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
            >
              <FiPlus size={16} /> Tambah Mobil Baru
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 text-left">ID</th>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2 text-left">Model</th>
                    <th className="p-2 text-left">Brand</th>
                    <th className="p-2 text-left">Harga/Hari</th>
                    <th className="p-2 text-left">Plat</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cars.map((car) => (
                    <tr key={car.id} className="border-t hover:bg-gray-50">
                      <td className="p-2">{car.id}</td>
                      <td className="p-2">
                        <img
                          src={car.image}
                          alt={car.model}
                          className="w-12 h-8 object-cover rounded"
                        />
                      </td>
                      <td className="p-2 font-medium">{car.model}</td>
                      <td className="p-2">{car.brand}</td>
                      <td className="p-2">{formatToRupiah(car.rentPerday)}</td>
                      <td className="p-2">{car.plate}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            car.status === "available"
                              ? "bg-green-100 text-green-600"
                              : car.status === "rented"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {car.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-1 justify-center">
                          <button
                            className="p-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                            onClick={() =>
                              navigate(`/management/edit/${car.id}`)
                            }
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            className="p-1 bg-red-500 hover:bg-red-600 text-white rounded"
                            onClick={() => handleDeleteCar(car.id)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card view for mobile */}
            <div className="sm:hidden divide-y">
              {cars.map((car) => (
                <div key={car.id} className="p-3">
                  <div className="flex gap-3">
                    <img
                      src={car.image}
                      alt={car.model}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{car.model}</p>
                          <p className="text-xs text-gray-600">
                            {car.brand} • {car.plate}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            car.status === "available"
                              ? "bg-green-100 text-green-600"
                              : car.status === "rented"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {car.status}
                        </span>
                      </div>

                      <p className="text-sm mt-1">
                        {formatToRupiah(car.rentPerday)}{" "}
                        <span className="text-xs text-gray-500">/hari</span>
                      </p>

                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs flex items-center justify-center"
                          onClick={() => navigate(`/management/edit/${car.id}`)}
                        >
                          <FiEdit size={12} className="mr-1" /> Edit
                        </button>
                        <button
                          className="flex-1 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs flex items-center justify-center"
                          onClick={() => handleDeleteCar(car.id)}
                        >
                          <FiTrash2 size={12} className="mr-1" /> Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floating action button for mobile */}
        <div className="sm:hidden fixed bottom-4 right-4">
          <button
            onClick={() => navigate("/management/add")}
            className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white shadow-lg"
            aria-label="Tambah Mobil Baru"
          >
            <FiPlus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
