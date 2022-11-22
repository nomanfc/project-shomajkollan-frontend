import React from 'react'
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRouteLogin = () => {
    const auth = true;

    return auth? <Navigate to="/"/> : <Outlet/>
}

export default PrivateRouteLogin
