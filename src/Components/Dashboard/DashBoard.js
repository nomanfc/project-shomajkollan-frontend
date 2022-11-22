import React from "react";
import { Grow } from "@mui/material";

import UserDash from "./DashComponents/UserDash";
import OrgDash from "./DashComponents/OrgDash";

import * as s from "./DashBoard.styled";
import * as ss from "../Common.styled";

const DashBoard = () => {
  return (
    <ss.Container style={{fontFamily: 'Kalpurush'}}>
      <s.container>
        <OrgDash />
        <UserDash />
      </s.container>
    </ss.Container>
  );
};

export default DashBoard;
