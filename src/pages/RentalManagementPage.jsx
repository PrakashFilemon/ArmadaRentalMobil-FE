import { deleteRental, getAllRentals } from "@/redux/actions/rental";
import { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiHome,
  FiMenu,
  FiX,
  FiPlus,
  FiList,
  FiTruck,
  FiSearch,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RentalManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { rentals } = useSelector((state) => state.rental);
  const [filteredRentals, setFilteredRentals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(getAllRentals());
      } catch (error) {
        console.error("Error fetching rentals:", error);
        toast.error("Gagal mengambil data rental");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (rentals && rentals.length > 0) {
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const filtered = rentals.filter(
          (rental) =>
            rental.rentalCode.toLowerCase().includes(searchLower) ||
            rental.namaPengemudi.toLowerCase().includes(searchLower) ||
            rental.phoneNumber.includes(searchTerm) ||
            rental.car.brand.toLowerCase().includes(searchLower) ||
            rental.car.plate.toLowerCase().includes(searchLower)
        );
        setFilteredRentals(filtered);
      } else {
        setFilteredRentals(rentals);
      }
    } else {
      setFilteredRentals([]);
    }
  }, [rentals, searchTerm]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus rental dengan kode ${id}?`
      )
    ) {
      // Implement actual delete functionality here
      dispatch(deleteRental(id));
      toast.success(`Rental dengan kode ${id} berhasil dihapus`);
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
            <span className="hidden sm:inline">Beranda</span>
          </button>

          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
            Data Rental Mobil
          </h1>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded bg-gray-100"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => navigate("/management")}
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiTruck size={16} /> <span>Data Mobil</span>
            </button>
            <button
              onClick={() => navigate("/management/add-rental")}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiPlus size={16} /> <span>Tambah Rental</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 space-y-2 sm:hidden">
            <button
              onClick={() => {
                navigate("/management");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-purple-600 text-white p-2 rounded"
            >
              <FiTruck /> Data Mobil
            </button>
            <button
              onClick={() => {
                navigate("/management/add-rental");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-green-600 text-white p-2 rounded"
            >
              <FiPlus /> Tambah Rental
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Cari kode, pengemudi, telepon, merek, atau plat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          </div>
        ) : !filteredRentals || filteredRentals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-500 my-8">
              <FiTruck className="mx-auto mb-4" size={48} />
              <p className="text-lg font-medium">
                Tidak ada data rental tersedia
              </p>
              <p className="text-sm mb-4">
                {searchTerm
                  ? "Coba ubah kriteria pencarian Anda"
                  : "Silakan tambahkan rental baru"}
              </p>
              <button
                onClick={() => navigate("/management/add-rental")}
                className="mt-2 inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                <FiPlus size={16} /> Tambah Rental Baru
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-3 border-b flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Data Rental</h2>
              <p className="text-sm text-gray-500">
                {filteredRentals.length} data ditemukan
              </p>
            </div>

            {/* Table for larger screens */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Kode</th>
                    <th className="p-3 text-left">Pengemudi</th>
                    <th className="p-3 text-left">Telepon</th>
                    <th className="p-3 text-left">Merek</th>
                    <th className="p-3 text-left">Plat</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRentals.map((rental, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="p-3 font-medium text-blue-600">
                        {rental.rentalCode}
                      </td>
                      <td className="p-3">{rental.namaPengemudi}</td>
                      <td className="p-3">{rental.phoneNumber}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span>{rental.car.brand}</span>
                          {rental.car.model && (
                            <span className="text-gray-500 text-xs">
                              ({rental.car.model})
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">{rental.car.plate}</td>
                      <td className="p-3 font-medium">
                        {formatToRupiah(rental.total)}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1 justify-center">
                          <button
                            className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors duration-150"
                            onClick={() =>
                              navigate(`/management/edit-rental/${rental.id}`)
                            }
                            title="Edit Rental"
                          >
                            <FiEdit size={16} />
                          </button>
                          <button
                            className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-150"
                            onClick={() => handleDelete(rental.id)}
                            title="Hapus Rental"
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

            {/* Cards for mobile */}
            <div className="sm:hidden">
              <div className="divide-y">
                {filteredRentals.map((rental, index) => (
                  <div
                    key={index}
                    className="p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-base font-medium text-blue-600">
                          {rental.rentalCode}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          onClick={() =>
                            navigate(`/management/edit-rental/${rental.id}`)
                          }
                        >
                          <FiEdit size={14} />
                        </button>
                        <button
                          className="p-1.5 bg-red-500 hover:bg-red-600 text-white rounded"
                          onClick={() => handleDelete(rental.id)}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mt-2">
                      <div className="flex items-center mb-2">
                        <FiTruck className="text-gray-500 mr-2" size={16} />
                        <div>
                          <p className="font-medium">
                            {rental.car.brand} {rental.car.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            {rental.car.plate}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Pengemudi</p>
                          <p className="font-medium">{rental.namaPengemudi}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Telepon</p>
                          <p>{rental.phoneNumber}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {formatToRupiah(rental.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Floating action button for mobile */}
        <div className="sm:hidden fixed bottom-4 right-4">
          <button
            onClick={() => navigate("/management/add-rental")}
            className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center text-white shadow-lg"
            aria-label="Tambah Rental Baru"
          >
            <FiPlus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalManagement;
