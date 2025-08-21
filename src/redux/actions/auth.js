import axios from "axios";
import { setToken, setUser } from "../reducers/auth";
import { toast } from "sonner";

export const register =
  (navigate, name, email, password, image, phoneNumber, setIsLoading) =>
  async (dispatch) => {
    setIsLoading(true);

    let data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    if (image) {
      data.append("image", image);
    }
    data.append("phoneNumber", phoneNumber);

    let config = {
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_API}auth/register`,
      data: data,
    };

    try {
      const response = await axios.request(config);
      //Get and Save Token To Local Storage
      const { data } = response.data;
      const { token } = data;
      localStorage.setItem("token", token);

      // Cek role user dan redirect sesuai role
      // if (user.role === "admin") {
      //   navigate("/management"); // Redirect ke halaman management jika role admin
      // } else {
      navigate("/"); // Redirect ke halaman lain jika bukan admin
      // }

      toast.success("Registrasi Anda Berhasil");
    } catch (error) {
      console.log(error.message);
      if (error.response?.data?.message === "Email already exists") {
        toast.error("Email telah terdaftar", {
          position: "top-right",
        });
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.", {
          position: "top-right",
        });
      }
    }

    setIsLoading(false);
  };

export const login = (navigate, email, password) => async (dispatch) => {
  let data = JSON.stringify({
    email,
    password,
  });

  let config = {
    method: "post",
    url: `${import.meta.env.VITE_BACKEND_API}auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    const { data } = response.data;
    const { token, user } = data;

    dispatch(setToken(token));
    dispatch(setUser(user));

    toast.success("Anda Berhasil Login");

    // Cek role user dan redirect sesuai role
    if (user.role === "admin") {
      navigate("/management"); // Redirect ke halaman management jika role admin
    } else {
      navigate("/"); // Redirect ke halaman lain jika bukan admin
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch(logout());
  }
};

export const logout = () => (dispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export const profile =
  (navigate, successRedirect, errorRedirect) => async (dispatch, getState) => {
    const { token } = getState().auth;

    // Jika token yang ada tidak valid maka akan di hapus dari local storage
    if (!token) {
      dispatch(logout());

      // Jika ada kesalahan maka akan di arahkan
      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
      return;
    }

    let config = {
      method: "get",
      url: `${import.meta.env.VITE_BACKEND_API}auth/profile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.request(config);
      const { data } = response.data;

      dispatch(setUser(data));

      // if there are any success redirection we will redirect it
      if (navigate) {
        if (successRedirect) {
          navigate(successRedirect);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);

      // because token is not valid, we will delete it from local storage
      dispatch(logout());

      if (navigate) {
        if (errorRedirect) {
          navigate(errorRedirect);
        }
      }
    }
  };
