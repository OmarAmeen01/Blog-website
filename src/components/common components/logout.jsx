import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite services/auth";
import { logout } from "../../store/authSlice";
import { Button } from "../bridge";

function Logout() {
  const dispatch = useDispatch();
  function logoutHandler() {
    authService.logoutUser().then(() => {
      dispatch(logout());
    });
  }

  return (
    <div>
      <button
        type="button"
        className="p-1 text-[20px]   hover:border-b-2  border-black active:border-b-2"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
