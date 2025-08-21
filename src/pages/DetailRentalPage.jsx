import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "@/redux/actions/detail";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Calendar,
  Car,
  CreditCard,
  ArrowLeft,
  Phone,
  User,
  Clock,
  FileText,
  MapPin,
  Shield,
  RefreshCcw,
} from "lucide-react";

const RentalDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("rental");

  const { rentalDetail } = useSelector((state) => state.detail);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await dispatch(getDetail(navigate, id));
      } catch (error) {
        console.error("Error fetching rental details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id, navigate]);

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), "PPP");
    } catch (error) {
      return "Invalid date";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      waiting: {
        color: "bg-yellow-500",
        text: "Menunggu Konfirmasi",
        icon: <RefreshCcw className="h-3 w-3 mr-1" />,
      },
      used: {
        color: "bg-blue-500",
        text: "Sedang Digunakan",
        icon: <Car className="h-3 w-3 mr-1" />,
      },
      completed: {
        color: "bg-green-500",
        text: "Selesai",
        icon: <Shield className="h-3 w-3 mr-1" />,
      },
      default: {
        color: "bg-gray-500",
        text: status,
        icon: null,
      },
    };

    const config = statusConfig[status] || statusConfig.default;

    return (
      <Badge
        className={`${config.color} text-white px-3 py-1 text-xs font-medium rounded-full flex items-center`}
      >
        {config.icon}
        {config.text}
      </Badge>
    );
  };

  const renderTabContent = () => {
    if (!rentalDetail) return null;

    switch (activeTab) {
      case "rental":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Informasi Sewa</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Kode Rental</p>
                <p className="font-medium">
                  {rentalDetail.rental?.rentalCode ||
                    rentalDetail.rental_id ||
                    id}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Status</p>
                <StatusBadge status={rentalDetail.status} />
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Tanggal Sewa</p>
                <p className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary/70" />
                  {formatDate(rentalDetail.rental?.rentalDate)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Tanggal Kembali</p>
                <p className="font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-primary/70" />
                  {formatDate(rentalDetail.rental?.returnDate)}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Nama Pengemudi</p>
                <p className="font-medium flex items-center">
                  <User className="h-4 w-4 mr-1 text-primary/70" />
                  {rentalDetail.rental?.namaPengemudi || "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Nomor Telepon</p>
                <p className="font-medium flex items-center">
                  <Phone className="h-4 w-4 mr-1 text-primary/70" />
                  {rentalDetail.rental?.phoneNumber || "-"}
                </p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg col-span-full transform transition-all hover:shadow-md hover:bg-primary/10 duration-300">
                <p className="text-gray-500 mb-1">Total Harga</p>
                <p className="font-bold text-lg text-primary">
                  {formatCurrency(rentalDetail.rental?.total)}
                </p>
              </div>
            </div>
          </div>
        );

      case "terms":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Syarat & Ketentuan</span>
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  {
                    icon: <User className="h-4 w-4 text-primary" />,
                    text: "Usia minimal penyewa adalah 21 tahun.",
                  },
                  {
                    icon: <FileText className="h-4 w-4 text-primary" />,
                    text: "Wajib memiliki SIM A yang masih berlaku.",
                  },
                  {
                    icon: <CreditCard className="h-4 w-4 text-primary" />,
                    text: "Pembayaran harus dilakukan minimal 50% di awal.",
                  },
                  {
                    icon: <Shield className="h-4 w-4 text-primary" />,
                    text: "Penyewa bertanggung jawab atas segala kerusakan selama masa sewa.",
                  },
                  {
                    icon: <Clock className="h-4 w-4 text-primary" />,
                    text: "Keterlambatan pengembalian akan dikenakan denda 10% per hari dari nilai sewa.",
                  },
                  {
                    icon: <CreditCard className="h-4 w-4 text-primary" />,
                    text: "Biaya bahan bakar ditanggung oleh penyewa.",
                  },
                  {
                    icon: <AlertCircle className="h-4 w-4 text-primary" />,
                    text: "Dilarang menggunakan kendaraan untuk kegiatan ilegal.",
                  },
                  {
                    icon: <Calendar className="h-4 w-4 text-primary" />,
                    text: "Pembatalan H-1 akan dikenakan biaya 50% dari total sewa.",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-2 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Metode Pembayaran</span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  abbr: "BCA",
                  name: "Bank BCA",
                  number: "1234567890",
                  owner: "Nama Pemilik",
                  color: "blue",
                },
                {
                  abbr: "MDR",
                  name: "Bank Mandiri",
                  number: "9876543210",
                  owner: "Nama Pemilik",
                  color: "yellow",
                },
                {
                  abbr: "BRI",
                  name: "Bank BRI",
                  number: "1122334455",
                  owner: "Nama Pemilik",
                  color: "blue",
                },
              ].map((bank, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg flex items-center gap-3 transform transition-all hover:shadow-md hover:-translate-y-1 duration-300"
                >
                  <div
                    className={`bg-${bank.color}-100 p-2 rounded-md text-${bank.color}-700 font-bold`}
                  >
                    {bank.abbr}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{bank.name}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <span className="font-mono mr-1">{bank.number}</span> (
                      {bank.owner})
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      navigator.clipboard.writeText(bank.number);
                      alert(
                        `Nomor rekening ${bank.name} telah disalin: ${bank.number}`
                      );
                    }}
                  >
                    Salin
                  </Button>
                </div>
              ))}
            </div>
            <div className="border border-yellow-200 bg-yellow-50 p-4 rounded-lg text-sm text-yellow-800 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-yellow-500" />
              <div>
                <p className="font-medium mb-1">Petunjuk Pembayaran:</p>
                <p>
                  Mohon segera lakukan pembayaran dan kirimkan bukti transfer
                  melalui WhatsApp untuk proses validasi.
                </p>
              </div>
            </div>
          </div>
        );

      case "system":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Informasi Sistem</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Created At</p>
                <p className="font-medium">
                  {rentalDetail.createdAt
                    ? format(new Date(rentalDetail.createdAt), "PPPpp")
                    : "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">Updated At</p>
                <p className="font-medium">
                  {rentalDetail.updatedAt
                    ? format(new Date(rentalDetail.updatedAt), "PPPpp")
                    : "-"}
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg col-span-full transform transition-all hover:shadow-md hover:-translate-y-1 duration-300">
                <p className="text-gray-500 mb-1">ID Sistem</p>
                <p className="font-mono text-xs bg-gray-100 p-1 rounded">
                  {id}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const TabButton = ({ id, icon, label, active }) => (
    <button
      className={`flex flex-col items-center p-2 sm:p-3 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300
                ${
                  active
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
      onClick={() => setActiveTab(id)}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6">
      <Card className="shadow-xl rounded-xl overflow-hidden border-t-4 border-t-primary bg-white">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <Car className="h-6 w-6 text-primary" />
                  Detail Rental
                </h2>

                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : rentalDetail ? (
                  <div className="text-sm text-gray-600">
                    <p className="flex items-center gap-1">
                      <span className="text-gray-500">ID:</span>{" "}
                      <span className="font-medium">
                        {rentalDetail.rental?.rentalCode || id}
                      </span>
                    </p>
                    <p className="mt-1 flex items-center gap-1">
                      <span className="text-gray-500">Status:</span>{" "}
                      <StatusBadge status={rentalDetail.status} />
                    </p>
                  </div>
                ) : (
                  <p className="text-red-500">Data tidak ditemukan</p>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-9 text-xs sm:text-sm flex items-center gap-1 hover:bg-gray-100 hover:text-primary transition-colors self-start sm:self-center"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-3 w-3" />
                Kembali
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          {!isLoading && rentalDetail && (
            <div className="grid grid-cols-4 gap-2 p-2 bg-gray-50 sticky top-0 z-10 shadow-sm">
              <TabButton
                id="rental"
                icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />}
                label="Sewa"
                active={activeTab === "rental"}
              />
              <TabButton
                id="terms"
                icon={<FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
                label="Syarat"
                active={activeTab === "terms"}
              />
              <TabButton
                id="payment"
                icon={<CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />}
                label="Pembayaran"
                active={activeTab === "payment"}
              />
              <TabButton
                id="system"
                icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5" />}
                label="Info"
                active={activeTab === "system"}
              />
            </div>
          )}

          {/* Content Area */}
          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="space-y-4 animate-pulse">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              </div>
            ) : rentalDetail ? (
              <div className="space-y-6">
                {renderTabContent()}

                {/* Action Buttons */}
                <div className="pt-4 border-t border-dashed">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-medium flex items-center justify-center gap-2 h-12 shadow-lg shadow-green-200 transition-all"
                      onClick={() => {
                        const userName = rentalDetail.user?.name || "Pelanggan";
                        const codeRental =
                          rentalDetail.rental?.rentalCode || id;
                        const total = formatCurrency(
                          rentalDetail.rental?.total || 0
                        );

                        const message = encodeURIComponent(
                          `Halo, saya ${userName} dengan kode rental ${codeRental}.\n\nSaya ingin mengonfirmasi penyewaan dengan total ${total}.\n\nMohon petunjuk untuk proses pembayaran selanjutnya. Terima kasih.`
                        );

                        window.open(
                          `https://wa.me/6282117212352?text=${message}`,
                          "_blank"
                        );
                      }}
                    >
                      <Phone className="h-5 w-5" />
                      Hubungi via WhatsApp
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white font-medium flex items-center justify-center gap-2 h-12 transition-colors"
                      onClick={() => navigate(`/daftar-rental`)}
                    >
                      <Clock className="h-5 w-5" />
                      Riwayat Rental
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-red-50 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-10 w-10 text-red-500" />
                </div>
                <p className="text-red-500 font-medium text-lg">
                  Data rental tidak ditemukan
                </p>
                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  Periksa kembali ID rental atau hubungi admin untuk mendapatkan
                  bantuan
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Kembali
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                  >
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Muat Ulang
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RentalDetail;
