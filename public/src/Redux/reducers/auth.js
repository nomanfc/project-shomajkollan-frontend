import { AUTH, LOGOUT, LOADING, ENDLOADING } from "../../Constants/Constants.js";

const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      sessionStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };
      
    case LOGOUT:
      sessionStorage.clear();
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default auth;