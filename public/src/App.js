import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import * as s from "./App.styled";

import AdminLogin from "./Components/AdminLogin/AdminLogin";
import PrivateRoute from "./Routes/PrivateRoute";
import PrivateRouteLogin from "./Routes/PrivateRouteLogin";
import LandingPage from "./Components/LandingPage/LandingPage";
import AdminPanel from "./Components/AdminPanel/AdminPanel";


var authentication = JSON.parse(localStorage.getItem("profile"));

var auth;

if(authentication?.success === 1){
  if(authentication?.token){
    auth = true;
  }
}else{
  auth = false;
}


const App = (props) => {



  return (
    <s.Container>
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />

        <Route
          path="/*"
          element={auth ? <AdminPanel /> : <Navigate to="/landingpage" />}
        />

        <Route
          path="/login"
          element={auth ? <Navigate to="/" /> : <AdminLogin />}
        />
      </Routes>
    </s.Container>
  );
};

export default App;
