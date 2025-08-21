import { profile } from "../../redux/actions/auth";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, roles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //Mengambil data pengguna jika terdapat token
    dispatch(profile(navigate, null, "/login"));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (user?.role) {
      //Memerikas apakah roles dari pengguna memiliki acces untuk halaman ini
      if (roles?.length > 0) {
        if (!roles?.includes(user?.role)) {
          navigate("/");
        }
      }
    }
  }, [navigate, roles, user]);
  return children;
};

Protected.protoTypes = {
  roles: PropTypes.array,
};

export default Protected;
