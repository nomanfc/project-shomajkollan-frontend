import React, {useState, useEffect} from "react";
import * as s from "../Common.styled";


const NoData = () => {

  return (
    <s.Container>
      <p
        style={{
          marginTop: "150px",
          textAlign: "center",
          color: "gray",
          textShadow: "1px 1px 1px gray",
          fontSize: "20px",
        }}
      >
        সংস্থার কোনো ডাটা পাওয়া যায় নি । আবার চেষ্টা করুন ।
      </p>
    </s.Container>
  );
};

export default NoData;
