import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDetail,
  EditStatusDetail,
  deleteDetail,
} from "@/redux/actions/detail";
import {
  FiHome,
  FiArrowLeft,
  FiEdit,
  FiCalendar,
  FiClock,
  FiTruck,
  FiUser,
  FiPhone,
  FiTag,
  FiCheckCircle,
  FiAlertCircle,
  FiClock as FiClockCircle,
  FiMenu,
  FiX,
  FiList,
  FiSearch,
  FiRefreshCw,
  FiFilter,
  FiFileText,
  FiEye,
} from "react-icons/fi";
import { toast } from "sonner";
// import axios from "axios";
// import { AlertDialog } from "@/components/ui/alert-dialog";

const ManagementDetailRental = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all', 'waiting', 'used', 'finished'
  const [updatingStatusId, setUpdatingStatusId] = useState(null); // Track which rental is being updated
  const [isLoading, setIsLoading] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null); // To track which document is being viewed in modal

  // Get details and loading state from Redux
  const {
    rentalDetails = [],
    loading,
    // statusUpdateLoading,
  } = useSelector((state) => state.detail);
  const [filteredDetails, setFilteredDetails] = useState([]);

  // Fetch rental details when component mounts
  useEffect(() => {
    dispatch(getAllDetail()).catch((error) => {
      console.error("Error fetching rental details:", error);
      toast.error("Gagal mengambil data detail rental");
    });
  }, [dispatch]);

  // Filter details when details array, searchTerm, or statusFilter changes
  useEffect(() => {
    if (rentalDetails && rentalDetails.length > 0) {
      let filtered = [...rentalDetails];

      // Apply status filter
      if (statusFilter !== "all") {
        filtered = filtered.filter((detail) => detail.status === statusFilter);
      }

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filtered = filtered.filter(
          (detail) =>
            (detail.rental?.rentalCode &&
              detail.rental?.rentalCode.toLowerCase().includes(searchLower)) ||
            (detail.user?.name &&
              detail.user?.name.toLowerCase().includes(searchLower)) ||
            (detail.user?.phoneNumber &&
              detail.user?.phoneNumber.includes(searchTerm)) ||
            (detail.car?.brand &&
              detail.car?.brand.toLowerCase().includes(searchLower)) ||
            (detail.car?.plate &&
              detail.car?.plate.toLowerCase().includes(searchLower))
        );
      }

      setFilteredDetails(filtered);
    } else {
      setFilteredDetails([]);
    }
  }, [rentalDetails, searchTerm, statusFilter]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Calculate duration between two dates in days
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.abs(end - start);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Format currency helper
  const formatToRupiah = (number) => {
    if (!number && number !== 0) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case "waiting":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          btnBg: "bg-yellow-500",
          btnHover: "hover:bg-yellow-600",
          icon: <FiClockCircle className="mr-1" />,
          label: "Menunggu",
        };
      case "used":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          btnBg: "bg-blue-500",
          btnHover: "hover:bg-blue-600",
          icon: <FiAlertCircle className="mr-1" />,
          label: "Sedang Digunakan",
        };
      case "finished":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          btnBg: "bg-green-500",
          btnHover: "hover:bg-green-600",
          icon: <FiCheckCircle className="mr-1" />,
          label: "Selesai",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          btnBg: "bg-gray-500",
          btnHover: "hover:bg-gray-600",
          icon: null,
          label: status || "Tidak Diketahui",
        };
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(getAllDetail())
      .then(() => {
        toast.success("Data berhasil diperbarui");
      })
      .catch((error) => {
        console.error("Error refreshing rental details:", error);
        toast.error("Gagal memperbarui data");
      });
  };

  // Handle status change
  const handleStatusChange = (id, status) => {
    setUpdatingStatusId(id); // Show loading state for this specific card

    dispatch(EditStatusDetail(id, status))
      .then(() => {
        // Success already handled in action with toast
      })
      .catch((error) => {})
      .finally(() => {
        setUpdatingStatusId(null); // Remove loading state
      });
  };

  // Handle Delete Detail
  const handleDeleteDetail = (id) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus Data ini?"
    );
    if (isConfirmed) {
      dispatch(deleteDetail(id));
    }
  };

  // Function to open document modal
  const openDocumentViewer = (document) => {
    setViewingDocument(document);
  };

  // Function to close document modal
  const closeDocumentViewer = () => {
    setViewingDocument(null);
  };

  // Document Viewer Modal Component
  const DocumentViewerModal = () => {
    if (!viewingDocument) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-xl w-full max-h-90vh overflow-hidden flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold text-lg">
              {viewingDocument.type === "ktp" ? "KTP Penyewa" : "SIM Penyewa"} -{" "}
              {viewingDocument.userName}
            </h3>
            <button
              onClick={closeDocumentViewer}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-4 flex-1 overflow-auto flex items-center justify-center bg-gray-100">
            {viewingDocument.imageUrl ? (
              <img
                src={viewingDocument.imageUrl}
                alt={`${viewingDocument.type === "ktp" ? "KTP" : "SIM"} ${
                  viewingDocument.userName
                }`}
                className="max-w-full max-h-96 object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <div className="text-red-500 mb-2">
                  <FiFileText size={48} className="mx-auto" />
                </div>
                <p className="text-gray-600">Dokumen tidak tersedia</p>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-end">
              <button
                onClick={closeDocumentViewer}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md p-3 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center w-8 h-8 rounded bg-gray-100 hover:bg-gray-200"
              onClick={() => navigate("/management")}
              title="Kembali"
            >
              <FiArrowLeft size={18} />
            </button>
            <button
              className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-white"
              onClick={() => navigate("/")}
            >
              <FiHome size={16} />
              <span className="hidden sm:inline">Beranda</span>
            </button>
          </div>

          <h1 className="text-lg font-bold text-gray-800 hidden sm:block">
            Detail Rental Mobil
          </h1>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded bg-gray-100"
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm"
            >
              <FiList size={16} /> <span>Tambah Rental</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
              ) : (
                <FiRefreshCw size={16} />
              )}
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 space-y-2 sm:hidden">
            <button
              onClick={() => {
                navigate("/management/add-rental");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full bg-green-600 text-white p-2 rounded"
            >
              <FiList /> Tambah Rental
            </button>
            <button
              onClick={() => {
                handleRefresh();
                setIsMobileMenuOpen(false);
              }}
              disabled={loading}
              className="flex items-center gap-2 w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-1"></div>
              ) : (
                <FiRefreshCw />
              )}
              Refresh
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-3 mb-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
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

            <div className="sm:w-48 flex items-center">
              <div className="relative w-full">
                <select
                  className="w-full appearance-none pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Semua Status</option>
                  <option value="waiting">Menunggu</option>
                  <option value="used">Sedang Digunakan</option>
                  <option value="finished">Selesai</option>
                </select>
                <FiFilter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          </div>
        ) : !filteredDetails || filteredDetails.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-gray-500 my-8">
              <FiTruck className="mx-auto mb-4" size={48} />
              <p className="text-lg font-medium">
                Tidak ada data rental tersedia
              </p>
              <p className="text-sm mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Coba ubah kriteria pencarian Anda"
                  : "Silakan tambahkan rental baru"}
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-2 inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                <FiList size={16} /> Tidak Ada Penyewaan
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDetails.map((detail, index) => {
              const detailId = detail.id;
              const isUpdating = updatingStatusId === detailId;
              const statusInfo = getStatusBadge(detail.status);

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div
                    className={`p-3 border-b flex justify-between items-center ${statusInfo.bg}`}
                  >
                    <div className="font-bold text-gray-800 flex items-center gap-2">
                      <FiTag size={16} className="text-blue-600" />
                      <span>
                        {detail.rental?.rentalCode || `Rental #${index + 1}`}
                      </span>
                    </div>

                    <div
                      className={`px-3 py-1.5 rounded-full flex items-center text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}
                    >
                      {statusInfo.icon}
                      {statusInfo.label}
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Customer Info */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <FiUser size={16} className="text-gray-400" />
                        <span className="font-medium">
                          {detail.user?.name || "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <FiPhone size={16} className="text-gray-400" />
                        <span>{detail.user?.phoneNumber || "-"}</span>
                      </div>
                    </div>

                    {/* Document Buttons - NEW SECTION */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          openDocumentViewer({
                            type: "ktp",
                            userName: detail.user?.name || "Penyewa",
                            imageUrl: detail.rental?.image || null,
                          })
                        }
                        className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 px-2 py-1.5 rounded-md text-sm"
                      >
                        <FiFileText size={16} />
                        <span>Lihat KTP/SIM</span>
                      </button>
                    </div>
                    {/* Vehicle Info */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <FiTruck size={16} className="text-blue-600" />
                        <span className="font-medium">
                          {detail.car?.brand || "-"} {detail.car?.model || ""}
                        </span>
                      </div>
                      <div className="ml-6 text-sm font-mono bg-white inline-block px-2 py-0.5 rounded border">
                        {detail.car?.plate || "-"}
                      </div>
                    </div>

                    {/* Rental Dates */}
                    <div className="mb-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-xs text-gray-500">Mulai</div>
                          <div className="font-medium">
                            {formatDate(detail.rental?.rentalDate)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Kembali</div>
                          <div className="font-medium">
                            {formatDate(detail.rental?.returnDate)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration and Total */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <div>
                        <div className="text-xs text-gray-500">Durasi</div>
                        <div className="font-medium">
                          {calculateDuration(
                            detail.rental?.rentalDate,
                            detail.rental?.returnDate
                          )}{" "}
                          hari
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Total</div>
                        <div className="font-bold text-lg text-blue-700">
                          {formatToRupiah(detail.rental?.total || 0)}
                        </div>
                      </div>
                    </div>

                    {/* Status Management Section */}
                    <div className="border-t pt-3 mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Ubah Status:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          disabled={
                            isUpdating ||
                            isLoading ||
                            detail.status === "waiting"
                          }
                          onClick={() =>
                            handleStatusChange(detailId, "waiting")
                          }
                          className={`px-3 py-1.5 rounded-md flex items-center justify-center ${
                            detail.status === "waiting"
                              ? "bg-yellow-500 text-white"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          } ${
                            isUpdating || isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isUpdating && updatingStatusId === detailId ? (
                            <div className="animate-spin h-4 w-4 border-2 border-yellow-800 border-t-transparent rounded-full mr-1"></div>
                          ) : (
                            <FiClockCircle className="mr-1" />
                          )}
                          Menunggu
                        </button>

                        <button
                          disabled={
                            isUpdating || isLoading || detail.status === "used"
                          }
                          onClick={() => handleStatusChange(detailId, "used")}
                          className={`px-3 py-1.5 rounded-md flex items-center justify-center ${
                            detail.status === "used"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          } ${
                            isUpdating || isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isUpdating && updatingStatusId === detailId ? (
                            <div className="animate-spin h-4 w-4 border-2 border-blue-800 border-t-transparent rounded-full mr-1"></div>
                          ) : (
                            <FiAlertCircle className="mr-1" />
                          )}
                          Digunakan
                        </button>

                        <button
                          disabled={
                            isUpdating ||
                            isLoading ||
                            detail.status === "finished"
                          }
                          onClick={() =>
                            handleStatusChange(detailId, "finished")
                          }
                          className={`px-3 py-1.5 rounded-md flex items-center justify-center ${
                            detail.status === "finished"
                              ? "bg-green-500 text-white"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          } ${
                            isUpdating || isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {isUpdating && updatingStatusId === detailId ? (
                            <div className="animate-spin h-4 w-4 border-2 border-green-800 border-t-transparent rounded-full mr-1"></div>
                          ) : (
                            <FiCheckCircle className="mr-1" />
                          )}
                          Selesai
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-3 border-t bg-gray-50 flex justify-between">
                    <button
                      onClick={() => navigate(`/detail-rental/${detail.id}`)}
                      className="flex items-center gap-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      Lihat Detail
                    </button>
                    <button
                      onClick={() => handleDeleteDetail(detail.id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      {viewingDocument && <DocumentViewerModal />}
    </div>
  );
};

export default ManagementDetailRental;
