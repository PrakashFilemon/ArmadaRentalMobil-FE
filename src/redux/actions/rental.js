import axios from "axios";
import { toast } from "sonner";
import {
  setRentals,
  setUnavailableDates,
  setUnavailableDatesError,
  setUnavailableDatesLoading,
} from "../reducers/rental";

export const createRental =
  (
    navigate,
    user_id,
    car_id,
    namaPengemudi,
    phoneNumber,
    image,
    rentalDate,
    returnDate,
    setIsLoading
  ) =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    setIsLoading(true);

    let data = new FormData();
    data.append("user_id", user_id);
    data.append("car_id", car_id);
    data.append("namaPengemudi", namaPengemudi);
    data.append("phoneNumber", phoneNumber);
    if (image) {
      data.append("image", image);
    }
    data.append("rentalDate", rentalDate);
    data.append("returnDate", returnDate);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}rental`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      const responseData = response.data;
      toast.success("Create Rental Success");
      dispatch(setRentals(responseData));

      // Extract the rental detail ID from the response instead of rental ID
      const rentalDetailId = responseData.rentalDetailData?.id;

      // Use the navigate function to redirect to the detail page with the correct ID
      navigate(`/detail-rental/${rentalDetailId}`);

      setIsLoading(false);
      return response;
    } catch (error) {
      console.error("Error creating rental:", error);

      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please check your input."
      );

      setIsLoading(false);
      throw error;
    }
  };

export const getAllRentals = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}rental/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setRentals(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

  // setIsLoading(false);
};

// Di file actions/rental.js
export const fetchUnavailableDates = (carId) => async (dispatch, getState) => {
  const { token } = getState().auth;

  dispatch(setUnavailableDatesLoading());

  const config = {
    method: "get",
    url: `${import.meta.env.VITE_BACKEND_API}rental/unavailable-dates/${carId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    // Format tanggal menjadi objek Date
    const formattedDates = data.map((range) => ({
      start: new Date(range.rentalDate),
      end: new Date(range.returnDate),
    }));

    dispatch(setUnavailableDates(formattedDates));
  } catch (error) {
    console.error("Error fetching unavailable dates:", error);
    dispatch(
      setUnavailableDatesError(
        error?.response?.data?.message || "Failed to fetch unavailable dates"
      )
    );
    toast.error(
      error?.response?.data?.message || "Failed to fetch unavailable dates"
    );
  }
};

export const deleteRental = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}rental/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    dispatch(getAllRentals());
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
