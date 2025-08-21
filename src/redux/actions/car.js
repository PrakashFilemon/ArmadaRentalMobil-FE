import axios from "axios";
import { setCar, setCars } from "../reducers/car";
import { toast } from "sonner";

export const getAllCars = () => async (dispatch, getState) => {
  //   // Set loading state
  //   setIsLoading(true);

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}car/`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setCars(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

  //   setIsLoading(false);
};

export const getCar = (navigate, id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}car/${id}`,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setCar(data));
  } catch (error) {
    toast.error(error?.response?.data?.message);
    navigate("/");
  }
};

export const addCar =
  (
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
  ) =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    setIsLoading(true);

    let data = new FormData();
    data.append("brand", brand);
    data.append("model", model);
    data.append("transmission", transmission);
    data.append("carYear", carYear);
    data.append("plate", plate);
    data.append("seat", seat);
    data.append("color", color);
    data.append("rentPerday", rentPerday);
    data.append("information", information);
    data.append("status", status);
    if (image) {
      data.append("image", image);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}car`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      const data = response.data;
      toast.success("Car added successfully!");
      dispatch(getAllCars(data));
      navigate("/management");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsLoading(false);
  };

export const deleteCar = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}car/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    toast.success(`Delete Data Successfully`);
    dispatch(getAllCars());
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const EditCar =
  (
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
  ) =>
  async (dispatch, getState) => {
    const { token } = getState().auth;
    setIsLoading(true);

    let data = new FormData();
    data.append("brand", brand);
    data.append("model", model);
    data.append("transmission", transmission);
    data.append("carYear", carYear);
    data.append("plate", plate);
    data.append("seat", seat);
    data.append("color", color);
    data.append("rentPerday", rentPerday);
    data.append("information", information);
    data.append("status", status);
    if (image) {
      data.append("image", image);
    }

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}car/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      toast.success("Update Car Data Successfully!");
      dispatch(getAllCars());
      navigate("/management");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsLoading(false);
  };
