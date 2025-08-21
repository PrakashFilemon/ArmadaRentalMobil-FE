import { addCar } from "@/redux/actions/car";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !brand ||
      !model ||
      !transmission ||
      !image ||
      !carYear ||
      !plate ||
      !seat ||
      !color ||
      !rentPerday ||
      !information ||
      !status
    ) {
      alert("Please fill all the fields");
      return;
    }

    setIsLoading(true);

    // Dispatch action to add car
    dispatch(
      addCar(
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
          <div>
            <label className="block font-medium mb-1">Car Image</label>
            <div className="relative border-dashed border-2 border-gray-300 rounded-md p-4 hover:border-green-500 transition duration-150 ease-in-out">
              <input
                type="file"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={handleImageChange}
                required
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7l6 6m0 0l6-6m-6 6V3m-9 7h18a2 2 0 012 2v8a2 2 0 01-2 2H3a2 2 0 01-2-2v-8a2 2 0 012-2z"
                  />
                </svg>
                <p className="text-gray-500">Click to upload image</p>
              </div>
            </div>
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-md shadow-lg border border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-105"
                />
              </div>
            )}
          </div>

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
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
