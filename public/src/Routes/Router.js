import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import DashBoard from '../Components/Dashboard/DashBoard.js'
import AllOrg from '../Components/Organizations/AllOrg'

const MainRoutes = ({match}) => {


  return (
    <Routes>
      <Route path="/" element={<DashBoard/>}>
        <Route path="allorg" element={<AllOrg/>}/>
      </Route>
    </Routes>
  );
};

export default MainRoutes;