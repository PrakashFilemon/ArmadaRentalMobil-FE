import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserRentals } from "@/redux/actions/detail";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";

const DaftarRentalPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRentals, loading } = useSelector((state) => state.detail);
  const { user, token } = useSelector((state) => state.auth);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Redirect if not logged in
    if (!user || !token) {
      navigate("/login");
      return;
    }

    // Fetch user rentals
    dispatch(getUserRentals());
  }, [dispatch, user, token, navigate]);

  // Format date for rental display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Get status color class based on rental status
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "used":
        return "bg-green-100 text-green-800";
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "finished":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter rentals based on active filter
  const getFilteredRentals = () => {
    if (!userRentals) return [];
    if (activeFilter === "all") return userRentals;

    return userRentals.filter(
      (rental) => rental.status?.toLowerCase() === activeFilter.toLowerCase()
    );
  };

  // Calculate duration in days between start and end dates
  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return `${diffDays} hari`;
  };

  // Navigate to rental detail page with specific ID
  const navigateToRental = (id) => {
    navigate(`/detail-rental/${id}`);
  };

  const filteredRentals = getFilteredRentals();

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Daftar Rental Saya
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Lihat riwayat dan status rental mobil Anda
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 overflow-x-auto">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-150`}
            >
              Semua
            </button>
            <button
              onClick={() => setActiveFilter("waiting")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === "waiting"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-150`}
            >
              Menunggu
            </button>
            <button
              onClick={() => setActiveFilter("used")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === "used"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-150`}
            >
              Aktif
            </button>
            <button
              onClick={() => setActiveFilter("finished")}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeFilter === "finished"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } transition-colors duration-150`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat data rental...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && (!filteredRentals || filteredRentals.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaCarSide className="text-5xl text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Belum ada riwayat rental
            </h3>
            <p className="text-gray-600 mb-6">
              {activeFilter !== "all"
                ? `Anda belum memiliki rental dengan status "${activeFilter}"`
                : "Anda belum memiliki riwayat rental mobil"}
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              Mulai Rental Sekarang
            </button>
          </div>
        )}

        {/* Rental List */}
        {!loading && filteredRentals && filteredRentals.length > 0 && (
          <div className="space-y-4">
            {filteredRentals.map((rental) => (
              <div
                key={rental.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-150"
                onClick={() => navigateToRental(rental.id)}
              >
                <div className="p-4 flex flex-col sm:flex-row">
                  {/* Car Info */}
                  <div className="sm:w-2/3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {rental.car?.brand || "Mobil"} {rental.car?.model || ""}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          rental.status
                        )}`}
                      >
                        {rental.status || "N/A"}
                      </span>
                    </div>

                    {/* Car Details */}
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>
                          {formatDate(rental.rental?.rentalDate)} -{" "}
                          {formatDate(rental.rental?.returnDate)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaClock className="mr-2 text-gray-400" />
                        <span>
                          Durasi:{" "}
                          {calculateDuration(
                            rental.rental?.rentalDate,
                            rental.rental?.returnDate
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>Plat Nomor: {rental.car?.plate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="sm:w-1/3 mt-4 sm:mt-0 sm:border-l sm:border-gray-100 sm:pl-4 flex flex-col justify-between">
                    <div>
                      <p className="text-gray-500 text-xs">Total Harga</p>
                      <p className="text-lg font-bold text-gray-900">
                        {rental.rental?.total
                          ? `Rp ${rental.rental.total
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex justify-end items-center mt-2 text-blue-600">
                      <span className="text-sm">Lihat Detail</span>
                      <BiChevronRight />
                    </div>
                  </div>
                </div>

                {/* Rental ID Footer */}
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 flex justify-between items-center">
                  <span>
                    ID: #
                    {typeof rental.id === "string"
                      ? rental.id.slice(-8)
                      : String(rental.id).slice(-8)}
                  </span>
                  <span>Dibuat pada: {formatDate(rental.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DaftarRentalPage;
