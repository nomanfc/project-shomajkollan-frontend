import { AUTH, LOGOUT, LOADING } from "../../Constants/Constants.js";
import * as api from "../../Auth/httprequests.js";
import { Navigate } from "react-router-dom";

var authentication = JSON.parse(localStorage.getItem("profile"));

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    setTimeout(function () {
      window.location.reload();
      if (authentication?.success === 1) {
        navigate("/");
      }
      if (authentication?.success !== 1) {
        localStorage.setItem("loadingAlert", true);
      }
    }, 2000);
  } catch (err) {
    console.error(err);
  }
};

export const signout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT });
    navigate("/landingpage");
  } catch (err) {
    console.error(err);
  }
};
