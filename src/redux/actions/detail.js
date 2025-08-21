import axios from "axios";
import { setDetail, setDetails, setUserRentals } from "../reducers/detail";
import { toast } from "sonner";

export const getAllDetail = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}detail/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setDetails(data));
  } catch (error) {
    console.error("Error fetching details:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch details");
  }
};

export const getDetail = (navigate, id) => async (dispatch, getState) => {
  // Check if id is valid
  if (!id) {
    console.error("Cannot fetch detail: ID is undefined");
    toast.error("ID is required to fetch detail");
    return; // Exit early if no ID is provided
  }

  const { token } = getState().auth;

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}detail/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;
    dispatch(setDetail(data));
  } catch (error) {
    console.error("Error fetching detail:", error);
    toast.error(error?.response?.data?.message || "Failed to fetch detail");
  }
};

export const getUserRentals = () => async (dispatch, getState) => {
  const { token, user } = getState().auth;

  if (!token || !user) {
    console.log("User not logged in, cannot fetch rentals");
    return;
  }

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}detail/user/${user}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    const { data } = response.data;

    dispatch(setUserRentals(data));
  } catch (error) {
    console.error("Error fetching user rentals:", error);
    toast.error(
      error?.response?.data?.message || "Failed to fetch your rentals"
    );
  }
};

// New action to update rental status
export const EditStatusDetail = (id, status) => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;

    let data = new FormData();
    data.append("status", status);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_API}detail/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    toast.success("Update Detail Status Data Successfully!");
    dispatch(getAllDetail());
    return response; // Return response for potential chaining
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update status");
    throw error; // Re-throw error for error handling in component
  }
};

export const deleteDetail = (id) => async (dispatch, getState) => {
  const { token } = getState().auth;

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_BACKEND_API}detail/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    toast.success("Delete Data Successfully");
    dispatch(getAllDetail());
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
