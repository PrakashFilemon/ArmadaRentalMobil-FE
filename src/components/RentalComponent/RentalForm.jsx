import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCar } from "@/redux/actions/car";
import { createRental, fetchUnavailableDates } from "@/redux/actions/rental";
import { Separator } from "@/components/ui/separator";
import { RentalDatePicker } from "./RentalDate";
import { addDays, format } from "date-fns";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const formatToRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const RentalForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { carInfo } = useSelector((state) => state.car);
  const { user } = useSelector((state) => state.auth);
  const { unavailableDates, loadingDates } = useSelector(
    (state) => state.rental
  );

  const [namaPengemudi, setNamaPengemudi] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [rentalDate, setRentalDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [dateError, setDateError] = useState("");

  useEffect(() => {
    dispatch(getCar(navigate, id));
    // Fetch unavailable date ranges for this car
    fetchUnavailableDates(id);
  }, [dispatch, id, navigate]);

  // // Fetch unavailable dates from the server
  // const fetchUnavailableDates = async (carId) => {
  //   try {
  //     // This is a placeholder - replace with your actual API call
  //     // Example:
  //     // const response = await fetch(`/api/cars/${carId}/unavailable-dates`);
  //     // const data = await response.json();
  //     // setUnavailableDateRanges(data);

  //     // For demonstration, let's create some sample unavailable dates
  //     // In a real app, this would come from your database
  //     const sampleUnavailableDates = [
  //       {
  //         start: addDays(new Date(), 2),
  //         end: addDays(new Date(), 5),
  //       },
  //       {
  //         start: addDays(new Date(), 10),
  //         end: addDays(new Date(), 12),
  //       },
  //     ];

  //     setUnavailableDateRanges(sampleUnavailableDates);
  //   } catch (error) {
  //     console.error("Error fetching unavailable dates:", error);
  //   }
  // };

  useEffect(() => {
    if (rentalDate && returnDate && carInfo?.rentPerday) {
      // Check for date conflicts with unavailable dates
      const hasConflict = checkDateConflicts(rentalDate, returnDate);

      if (hasConflict) {
        setDateError(
          "Beberapa tanggal yang dipilih sudah dipesan. Pilih rentang tanggal lain."
        );
        setTotalCost(0);
        return;
      } else {
        setDateError("");
      }

      const rentalDays = Math.ceil(
        (new Date(returnDate) - new Date(rentalDate)) / (1000 * 60 * 60 * 24)
      );

      if (rentalDays > 0) {
        const total = rentalDays * carInfo.rentPerday;
        setTotalCost(total);
      } else {
        setTotalCost(0); // Reset if dates are invalid
      }
    }
  }, [rentalDate, returnDate, carInfo, unavailableDates]);

  // Check if selected date range conflicts with unavailable dates
  const checkDateConflicts = (start, end) => {
    return unavailableDates.some((range) => {
      const rangeStart =
        typeof range.start === "string" ? new Date(range.start) : range.start;
      const rangeEnd =
        typeof range.end === "string" ? new Date(range.end) : range.end;

      // Check if any day in the selected range overlaps with an unavailable range
      // This is a simplified check - for a real application, you might need more sophisticated logic
      return (
        start <= rangeEnd && end >= rangeStart // Overlap check
      );
    });
  };

  const handleRentalDateChange = (date) => {
    setRentalDate(date);
    // If return date is before the new rental date, reset it
    if (returnDate && date >= returnDate) {
      setReturnDate(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final check for date conflicts
    if (checkDateConflicts(rentalDate, returnDate)) {
      setDateError(
        "Beberapa tanggal yang dipilih sudah dipesan. Pilih rentang tanggal lain."
      );
      return;
    }

    // Set loading state to true before dispatching
    setIsLoading(true);

    dispatch(
      createRental(
        navigate,
        user?.id,
        carInfo?.id,
        namaPengemudi,
        phoneNumber,
        image,
        rentalDate,
        returnDate,
        setIsLoading
      )
    );
  };

  return (
    <div className="w-full">
      {/* Car Summary for Mobile - Only visible on small screens */}
      <div className="lg:hidden mb-6">
        <Card className="w-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Mobil yang Dipilih</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="relative w-full h-48 mb-4">
              <img
                src={carInfo?.image}
                alt={carInfo?.brand}
                className="w-full h-full object-cover rounded-md shadow"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">
                {carInfo?.brand} {carInfo?.model}
              </h2>
              <p className="text-lg font-semibold text-blue-600">
                {formatToRupiah(carInfo?.rentPerday)} / hari
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2 text-sm pt-2">
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              {carInfo?.seat} Kursi
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              {carInfo?.transmission}
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              {carInfo?.color}
            </span>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="w-full shadow-md">
            <CardHeader>
              <CardTitle>Data Rental</CardTitle>
              <CardDescription>
                Masukkan data dengan lengkap dan benar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="namaPengemudi">Nama Pengemudi</Label>
                    <Input
                      type="text"
                      id="namaPengemudi"
                      placeholder="Nama lengkap pengemudi"
                      value={namaPengemudi}
                      onChange={(e) => setNamaPengemudi(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Nomor Pengemudi</Label>
                    <Input
                      type="tel"
                      id="phoneNumber"
                      placeholder="Contoh: 081234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Pilih Tanggal Rental</Label>

                  {dateError && (
                    <Alert variant="destructive" className="mb-3">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{dateError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="rentalDate"
                        className="text-sm text-gray-500"
                      >
                        Tanggal Pengambilan
                      </Label>
                      <RentalDatePicker
                        label="Pilih tanggal pengambilan"
                        value={rentalDate}
                        onChange={handleRentalDateChange}
                        unavailableDateRanges={unavailableDates}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="returnDate"
                        className="text-sm text-gray-500"
                      >
                        Tanggal Pengembalian
                      </Label>
                      <RentalDatePicker
                        label="Pilih tanggal pengembalian"
                        value={returnDate}
                        onChange={setReturnDate}
                        unavailableDateRanges={unavailableDates}
                        minDate={
                          rentalDate ? addDays(rentalDate, 1) : new Date()
                        }
                        disabled={!rentalDate}
                      />
                    </div>
                  </div>

                  {unavailableDates.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Catatan: Tanggal yang tidak tersedia ditandai dengan warna
                      abu-abu pada kalender
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="picture">Foto KTP/SIM Pengemudi</Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => setImage(e.target.files[0])}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Upload foto KTP atau SIM yang jelas dan tidak buram
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Biaya Sewa Per Hari:</span>
                    <span>{formatToRupiah(carInfo?.rentPerday || 0)}</span>
                  </div>

                  {rentalDate && returnDate && !dateError && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Durasi Sewa:</span>
                      <span>
                        {Math.ceil(
                          (new Date(returnDate) - new Date(rentalDate)) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        hari
                      </span>
                    </div>
                  )}

                  <Separator className="my-2" />

                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Biaya:</span>
                    <span className="text-blue-700">
                      {formatToRupiah(totalCost)}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition-all"
                  disabled={
                    isLoading ||
                    !rentalDate ||
                    !returnDate ||
                    !namaPengemudi ||
                    !phoneNumber ||
                    !image ||
                    dateError !== ""
                  }
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Memproses...
                    </span>
                  ) : (
                    "Konfirmasi Pesanan"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Car Info & User Info Section - Hidden on mobile */}
        <div className="lg:col-span-1 hidden lg:block order-1 lg:order-2">
          <div className="space-y-6">
            {/* Car Details */}
            <Card className="w-full shadow-md overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>Detail Mobil</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="mb-4">
                  <img
                    src={carInfo?.image}
                    alt={carInfo?.brand}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-bold">{carInfo?.brand}</h2>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatToRupiah(carInfo?.rentPerday || 0)}
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 text-sm">
                    <div>
                      <span className="font-semibold">Model:</span>{" "}
                      {carInfo?.model}
                    </div>
                    <div>
                      <span className="font-semibold">Kursi:</span>{" "}
                      {carInfo?.seat}
                    </div>
                    <div>
                      <span className="font-semibold">Warna:</span>{" "}
                      {carInfo?.color}
                    </div>
                    <div>
                      <span className="font-semibold">Transmisi:</span>{" "}
                      {carInfo?.transmission}
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Unavailable Dates Display */}
              {unavailableDates.length > 0 && (
                <div className="px-6 pb-4">
                  <h3 className="text-sm font-semibold mb-2">
                    Tanggal Tidak Tersedia:
                  </h3>
                  <div className="space-y-1 text-xs">
                    {unavailableDates.map((range, index) => (
                      <div key={index} className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-red-100 border border-red-300 rounded-full mr-2"></span>
                        <span>
                          {format(range.start, "dd MMM yyyy")} -{" "}
                          {format(range.end, "dd MMM yyyy")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* User Info */}
            <Card className="w-full shadow-md">
              <CardHeader className="pb-2">
                <CardTitle>Data Pemesan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{user?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{user?.email}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-gray-500 italic">
                  Pastikan data diri Anda sudah benar sebelum melanjutkan
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
