import { EditCar, getCar } from "@/redux/actions/car";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const EditCarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { carInfo } = useSelector((state) => state.car);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [image, setImage] = useState(null);
  const [carYear, setCarYear] = useState("");
  const [plate, setPlate] = useState("");
  const [seat, setSeat] = useState("");
  const [color, setColor] = useState("");
  const [rentPerday, setRentPerDay] = useState("");
  const [information, setInformation] = useState("");
  const [status, setStatus] = useState("available"); // Default set to available
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle cancel and navigate back to /management
  const handleCancel = () => {
    navigate("/management");
  };

  useEffect(() => {
    dispatch(getCar(navigate, id));
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (carInfo) {
      setBrand(carInfo.brand);
      setModel(carInfo.model);
      setTransmission(carInfo.transmission);
      setCarYear(carInfo.carYear);
      setPlate(carInfo.plate);
      setSeat(carInfo.seat);
      setColor(carInfo.color);
      setRentPerDay(carInfo.rentPerday);
      setInformation(carInfo.information);
      setStatus(carInfo.status);
    }
  }, [carInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      EditCar(
        id,
        navigate,
        brand,
        model,
        transmission,
        image,
        carYear,
        plate,
        seat,
        color,
        rentPerday,
        information,
        status,
        setIsLoading
      )
    );
  };
  return (
    <div className=" bg-black bg-opacity-20 p-4 flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Car</h2>
        <div className="space-y-4">
          {/* Brand Input */}
          <div>
            <label className="block font-medium mb-1">Brand</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter car brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>

          {/* Model Input */}
          <div>
            <label className="block font-medium mb-1">Model</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter car model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          {/* Transmission Input */}
          <div>
            <label className="block font-medium mb-1">Transmission</label>
            <input
              type="text"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter car transmission"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
              required
            />
          </div>

          {/* Car Image Input */}

          {/* Car Year Input */}
          <div>
            <label className="block font-medium mb-1">Car Year</label>
            <input
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Enter car year"
              value={carYear}
              onChange={(e) => setCarYear(e.target.value)}
              required
            />
          </div>

          {/* Plate Input */}
          <div>
            <label className="block font-medium mb-1">Plate</label>
            <input
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Enter car plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              required
            />
          </div>

          {/* Seat Input */}
          <div>
            <label className="block font-medium mb-1">Seat</label>
            <input
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Enter seat capacity"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
              required
            />
          </div>

          {/* Color Input */}
          <div>
            <label className="block font-medium mb-1">Color</label>
            <input
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Enter car color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>

          {/* Rent Per Day Input */}
          <div>
            <label className="block font-medium mb-1">Rent Per Day</label>
            <input
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              placeholder="Enter rent price per day"
              value={rentPerday}
              onChange={(e) => setRentPerDay(e.target.value)}
              required
            />
          </div>

          {/* Information Input */}
          <div>
            <label className="block font-medium mb-1">Information</label>
            <textarea
              className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Additional car information"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
              required
            />
          </div>
          {/* Status Input */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <div className="relative">
              <select
                className="border p-2 w-full rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 hover:bg-gray-100 transition ease-in-out duration-150"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option
                  value="available"
                  className="bg-green-100 text-green-800 font-semibold"
                >
                  ✅ Available
                </option>
                <option
                  value="repair"
                  className="bg-yellow-100 text-yellow-800 font-semibold"
                >
                  🛠️ Repair
                </option>
                <option
                  value="rented"
                  className="bg-red-100 text-red-800 font-semibold"
                >
                  🚗 Rented
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Update Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarComponent;
