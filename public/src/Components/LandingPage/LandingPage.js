import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Link } from "react-router-dom";

import * as s from "./LandingPage.styled";
// import SearchBar from "./Searchbar";
import { getOrgPublic } from "../../Auth/httprequests";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

const authentication = JSON.parse(localStorage.getItem("profile"));
var auth;

const LandingPage = () => {
  const [data, setData] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  if (authentication?.success === 1) {
    auth = true;
  }

  useEffect(() => {
    getOrgPublic()
      .then((response) => {
        console.log(response);
        setData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
    if (searchKeyword !== "") {
      const filteredData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchKeyword.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  };

  return (
    <s.Container style={{ fontFamily: "Kalpurush" }}>
      <s.subcontainer>
        <s.div_one>
          <s.div_one_sec_one
            style={{
              width: "200px",
              textAlign: "center",
            }}
          >
            <img style={{ height: "150px" }} src={"./rebofbd.png"} />
          </s.div_one_sec_one>
          <s.div_one_sec_two
            style={{
              width: "500px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                textAlign: "center",
                marginTop: "5px",
                color: "white",
                fontSize: "30px",
              }}
            >
              সমাজকল্যাণ মন্ত্রণালয়
            </div>
            <div
              style={{ textAlign: "center", color: "white", fontSize: "25px" }}
            >
              সমাজসেবা অধিদফতর
            </div>
            <div
              style={{ textAlign: "center", color: "white", fontSize: "20px" }}
            >
              জেলা সমাজসেবা কার্যালয়, ঢাকা
            </div>
            <div
              style={{
                textAlign: "center",
                margin: "20px auto",
                color: "white",
                fontSize: "18px",
              }}
            >
              স্বেচ্ছাসেবী সমাজকল্যাণ সংস্থাসমূহ নিবন্ধন ও তত্ত্বাবধায়ন
            </div>
          </s.div_one_sec_two>
          <s.div_one_sec_three
            style={{
              width: "200px",
              textAlign: "center",
            }}
          >
            <img
              style={{ height: "150px", borderRadius: "10px" }}
              src={"./shomaj.jpeg"}
            />
          </s.div_one_sec_three>
        </s.div_one>

        <s.div_two>
          <s.div_two_sec_one>
            {" "}
            <div
              style={{ textAlign: "center", color: "white", fontSize: "23px" }}
            >
              নিবন্ধনকৃত সংস্থা সমূহ
            </div>
          </s.div_two_sec_one>
          <s.div_two_sec_two style={{ color: "white" }}>
            <TextField
              size="small"
              name="search"
              onChange={handleChange}
              autoComplete="off"
              style={{
                background: "#B19BCA",
                borderRadius: "5px",
                color: "white",
                marginBottom: "15px",
              }}
              //   InputLabelProps={{
              //     style : {color: '#fff'}
              //  }}
              InputProps={{
                startAdornment: (
                  <SearchIcon
                    style={{
                      color: "white",
                      paddingRight: "15px",
                      fontSize: "20px",
                    }}
                  />
                ),
              }}
            />
          </s.div_two_sec_two>
        </s.div_two>

        <s.div_three>
          <s.ContentBodyContainer>
            <div style={{ fontSize: "25px", color: "white", margin: "auto" }}>
              সবজে ঢাকা
            </div>
            <div style={{ fontSize: "15px", color: "black", margin: "auto" }}>
              গ্রীনরোড, নিউমার্কেট
            </div>
            <div style={{ fontSize: "15px", color: "black", margin: "auto" }}>
              থানা ১, কার্যালয় ২ , ঢাকা{" "}
            </div>
            <div style={{ fontSize: "15px", color: "black", margin: "auto" }}>
              ০১৭১৮৬৯৭৫২১
            </div>
            <div style={{ fontSize: "15px", color: "black", margin: "auto" }}>
              email@gmail.com
            </div>
            <div style={{ fontSize: "15px", color: "black", margin: "auto" }}>
              www.text.com
            </div>
          </s.ContentBodyContainer>
          <div style={{ width: "100%", height: "60px" }}></div>
        </s.div_three>
      </s.subcontainer>
      <s.footer>
        <Link to="/login">
          <s.Login isLoggedin={auth}>অফিস লগইন</s.Login>
        </Link>
      </s.footer>
    </s.Container>
  );
};

export default LandingPage;

{
  /* <s.TitleContainer>
        <s.ContentHolder>
          <s.TitleText>নিবন্ধনকৃত সংস্থা সমূহ</s.TitleText>
          <s.Searchbar>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              style={{ height: "30px", width: "100%" }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="খুঁজুন"
                inputProps={{ "aria-label": "search google maps" }}
                size="small"
                name="search"
                onChange={handleChange}
                autoComplete="off"
              />
              {/* <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton> 
            </Paper>
          </s.Searchbar>
          <Link to="/login">
            <s.Login isLoggedin={auth}>অফিস লগইন</s.Login>
          </Link>
        </s.ContentHolder>
      </s.TitleContainer>

      <s.ContentBodyContainer>
        {searchKeyword.length > 0
          ? filteredResults?.map((d, index) => (
              <s.Content key={index}>
                <s.ConTitle>{d.orgName}</s.ConTitle>
                <s.ContentBody>
                  <s.ContentBodyAddress>{d.orgAddress}</s.ContentBodyAddress>
                  <s.ContentBodyPhone>
                    মোবাইলঃ {d.orgMobileNo}
                  </s.ContentBodyPhone>
                  <s.ContentBodyEmail>ইমেইলঃ {d.orgEmail}</s.ContentBodyEmail>
                  <s.ContentBodyWebsite>
                    ওয়েবসাইটঃ <a href="##"> {d.orgWebsite}</a>
                  </s.ContentBodyWebsite>
                </s.ContentBody>
              </s.Content>
            ))
          : data?.map((d, index) => (
              <s.Content key={index}>
                <s.ConTitle>{d.orgName}</s.ConTitle>
                <s.ContentBody>
                  <s.ContentBodyAddress>{d.orgAddress}</s.ContentBodyAddress>
                  <s.ContentBodyPhone>
                    মোবাইলঃ {d.orgMobileNo}
                  </s.ContentBodyPhone>
                  <s.ContentBodyEmail>ইমেইলঃ {d.orgEmail}</s.ContentBodyEmail>
                  <s.ContentBodyWebsite>
                    ওয়েবসাইটঃ <a href="##"> {d.orgWebsite}</a>
                  </s.ContentBodyWebsite>
                </s.ContentBody>
              </s.Content>
            ))}
      </s.ContentBodyContainer> */
}
