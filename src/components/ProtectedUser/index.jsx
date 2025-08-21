import { profile } from "../../redux/actions/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profile(navigate, "/", null));
  }, [dispatch, navigate]);

  return children;
};

export default ProtectedUser;
