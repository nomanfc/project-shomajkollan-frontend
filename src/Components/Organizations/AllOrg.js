import React, {useState, useEffect} from "react";
import BasicSortingTable from "./Table/BasicSortingTable";

import * as s from "../Common.styled";

const snackbar = localStorage.getItem("open");

const AllOrg = () => {

  return (
    <s.Container style={{fontFamily: 'Kalpurush' }} >
      <p
        style={{
          marginTop: "75px",
          textAlign: "center",
          color: "#099F19",
          textShadow: "1px 1px 1px gray",
          fontSize: "30px",
          fontFamily: 'Kalpurush'
        }}
      >
        নিবন্ধনকৃত সংস্থা সমূহ
      </p>
      <s.TableCon>
        <BasicSortingTable />
      </s.TableCon>
    </s.Container>
  );
};

export default AllOrg;
