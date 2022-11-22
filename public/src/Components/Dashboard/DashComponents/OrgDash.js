import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrgs } from "../../../Auth/httprequests.js";
import * as s from "../DashBoard.styled";
import CorporateFareSharpIcon from "@mui/icons-material/CorporateFareSharp";


const OrgDash = () => {
  const [tableData, setTableData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getAllOrgs()
      .then((response) => {
        setTableData(response.data.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleClick = () => {
    history("allorg");
  };

  return (
    <s.dashCards onClick={handleClick} style={{ cursor: "pointer" }}>
      <s.dashCardPic style={{}}>
        <CorporateFareSharpIcon
          style={{ height: "70px", width: "70px", color: "green" }}
        />
      </s.dashCardPic>
      <s.dashCardLine
        style={{
          justifyContent: "center",
          color: "#6f4283",
          textShadow: "1px 1px 1px gray",
          fontSize: "20px",
        }}
      >
        <p>নিবন্ধনকৃত সংস্থা সংখ্যা</p>
      </s.dashCardLine>
      <s.dashCardLine style={{ paddingLeft: "15px" }}>
        <h1>
            <b style={{ color: "#00BFFF" }}> {tableData}</b>
        </h1>
      </s.dashCardLine>
      <s.dashCardLine
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
        }}
      ></s.dashCardLine>
    </s.dashCards>
  );
};

export default OrgDash;
