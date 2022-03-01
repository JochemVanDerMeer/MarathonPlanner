import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useUserAuth } from "../contexts/UserAuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { logOut } = useUserAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.log(err.message)
    }
  };

  return <LogoutIcon variant="contained" onClick={handleLogout} />;
};

export default Logout;
