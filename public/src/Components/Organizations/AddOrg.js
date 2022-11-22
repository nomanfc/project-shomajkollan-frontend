import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Tooltip } from "@mui/material";

import { useDispatch } from "react-redux";
import { addOrgs } from "../../Redux/action/Orgs.js";

import {
  subDistList,
  relatedOfficeList,
} from "./DetailSearchTable/Table/ColumnData";

import {
  checkRegNo,
  createFounder,
  createBank,
  createOfficer,
} from "../../Auth/httprequests";

import * as s from "./Org.styled";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MenuPropsSubDist = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const AddOrg = () => {
  const [duplicate, setDuplicate] = useState(false);
  const [alert, setAlert] = useState(false);

  const [errorF, setErrorF] = useState(false);
  const [errorB, setErrorB] = useState(false);
  const [errorO, setErrorO] = useState(false);

  const [orgsData, setOrgsData] = useState([
    {
      regNo: null,
    },
  ]);
  const [countOfficer, setCountOfficer] = useState([
    {
      name: null,
      designation: "",
      address: "",
      mobile: "",
      nid: "",
      permanentAdds: "",
      orgRegNo: null,
    },
  ]);

  const [countBank, setCountBank] = useState([
    {
      name: null,
      accountNo: "",
      branch: "",
      type: "",
      routingNo: "",
      orgRegNo: null,
    },
  ]);

  const [countFounder, setCountFounder] = useState([
    {
      name: null,
      designation: "",
      address: "",
      mobile: "",
      email: "",
      permanentAdds: "",
      nid: "",
      orgRegNo: null,
    },
  ]);

  const [countF, setCountF] = useState(1);
  const [countB, setCountB] = useState(1);
  const [countO, setCountO] = useState(1);

  const handleCancel = (e) => {
    e.preventDefault();
    return navigate("/allorg");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDuplicateReg = (e) => {
    checkRegNo(e.target.value).then((response) => {
      response.data.success === 1 ? setDuplicate(false) : setDuplicate(true);
      response.data.success === 1 ? setAlert(false) : setAlert(true);
    });
  };

  const handleOrgsChange = (e) => {
    e.preventDefault();
    setOrgsData({ ...orgsData, [e.target.name]: e.target.value });
  };

  ///Officer data
  const handleOfficer = (e) => {
    if (countOfficer[countOfficer.length - 1].name) {
      setErrorO(false);
      setCountO(0);
      setCountOfficer([
        ...countOfficer,
        {
          name: null,
          designation: "",
          address: "",
          mobile: "",
          nid: "",
          permanentAdds: "",
          orgRegNo: null,
        },
      ]);
    } else {
      setErrorO(true);
    }

    setTimeout(() => {
      setErrorO(false);
    }, 5000);
  };

  const handleOfficerChange = (i, e) => {
    let countOfficers = [...countOfficer];
    countOfficers[i][e.target.name] = e.target.value;
    setCountOfficer(countOfficers);
  };

  let handleRemoveOfficer = (i) => {
    let countOfficers = [...countOfficer];
    countOfficers.splice(i, 1);
    setCountOfficer(countOfficers);
  };

  ///Bank data
  const handleBank = (e) => {
    if (countBank[countBank.length - 1].name) {
      setErrorB(false);
      setCountB(0);
      setCountBank([
        ...countBank,
        {
          name: null,
          accountNo: "",
          branch: "",
          type: "",
          routingNo: "",
          orgRegNo: null,
        },
      ]);
    } else {
      setErrorB(true);
    }

    setTimeout(() => {
      setErrorB(false);
    }, 5000);
  };

  const handleBankChange = (i, e) => {
    let countBanks = [...countBank];
    countBanks[i][e.target.name] = e.target.value;
    setCountBank(countBanks);
  };

  let handleRemoveBank = (i) => {
    let countBanks = [...countBank];
    countBanks.splice(i, 1);
    setCountBank(countBanks);
  };

  ///Founder data
  const handleFounder = (e) => {
    if (countFounder[countFounder.length - 1].name) {
      setErrorF(false);
      setCountF(0);
      setCountFounder([
        ...countFounder,
        {
          name: null,
          designation: "",
          address: "",
          mobile: "",
          email: "",
          nid: "",
          permanentAdds: "",
          orgRegNo: null,
        },
      ]);
    } else {
      setErrorF(true);
    }

    setTimeout(() => {
      setErrorF(false);
    }, 5000);
  };

  const handleFounderChange = (i, e) => {
    let countFounders = [...countFounder];
    countFounders[i][e.target.name] = e.target.value;
    setCountFounder(countFounders);
  };

  let handleRemoveFounder = (i) => {
    let countFounders = [...countFounder];
    countFounders.splice(i, 1);
    setCountFounder(countFounders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orgsData.regNo && duplicate === false) {
      if (countFounder.name !== null) {
        for (var i = 0; i < countFounder.length; i++) {
          createFounder(countFounder[i]).then((found) => {
            // console.log(found);
          });
        }
      }

      if (countBank.name !== null) {
        for (var i = 0; i < countBank.length; i++) {
          createBank(countBank[i]).then((found) => {
            // console.log(found);
          });
        }
      }

      if (countOfficer.name !== null) {
        for (var i = 0; i < countOfficer.length; i++) {
          createOfficer(countOfficer[i]).then((found) => {
            // console.log(found);
          });
        }
      }

      dispatch(addOrgs(orgsData, navigate));
    }
  };

  // console.log(countBank)

  return (
    <s.Container>
      <p
        style={{
          width: "100%",
          textAlign: "center",
          color: "#6f4283",
          textShadow: "1px 1px 1px gray",
          fontSize: "25px",
        }}
      >
        সংস্থা নিবন্ধন ফরম
      </p>
      <s.RegisterArea>
        <s.RegisterSubArea>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#099f19",
              textShadow: "1px 1px 1px gray",
              fontSize: "17px",
            }}
          >
            সংস্থার বিবরণ
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="outlined-basic"
                label="সংস্থার নাম"
                size="small"
                name="orgName"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="রেজিস্ট্রি নম্বর"
                size="small"
                onKeyUp={handleDuplicateReg}
                name="regNo"
                onChange={handleOrgsChange}
                error={alert ? true : false}
                helperText={alert ? "**রেজিস্ট্রি নম্বরটি উপলব্ধ নয়" : ""}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="রেজিস্ট্রিকরণের তারিখ"
                size="small"
                type="date"
                name="regDate"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="স্থাপনের তারিখ"
                size="small"
                type="date"
                name="placementDate"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="সংস্থার মোবাইল নম্বর"
                size="small"
                name="orgMobileNo"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="সংস্থার ইমেইল"
                size="small"
                name="orgEmail"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="সংস্থার ওয়েবসাইট"
                size="small"
                name="orgWebsite"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="সংস্থার লক্ষ্য ও উদ্দেশ্যসমূহ"
                size="small"
                name="orgMission"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",

                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="outlined-basic"
                label="কার্য এলাকা"
                size="small"
                name="workArea"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",

                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="সর্বশেষ কার্যকারী কমিটি অনুমোদনের তারিখ"
                size="small"
                type="date"
                name="lastActiveCommiteApproveDate"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",

                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="outlined-basic"
                label="সর্বশেষ কার্যকারী কমিটির মেয়াদ উত্তীর্ণের তারিখ"
                size="small"
                type="date"
                name="lastActiveCommiteExpireDate"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </form>
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#099f19",
              textShadow: "1px 1px 1px gray",
              fontSize: "17px",
            }}
          >
            সংস্থার ঠিকানা
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="outlined-basic"
                label="গ্রাম/মহল্লা"
                size="small"
                name="orgVillage"
                onChange={handleOrgsChange}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
              />

              <TextField
                id="outlined-basic"
                label="ডাকঘর"
                size="small"
                name="orgPost"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl
                style={{
                  width: "30%",
                  transition: "all 100s ease",
                  margin: "20px auto auto 20px",
                  background: "white",
                }}
                size="small"
                // error={errorB ? true : false}
              >
                <InputLabel id="demo-simple-select-label">থানা</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={type}
                  name="orgSubdist"
                  label="থানা"
                  onChange={handleOrgsChange}
                  MenuProps={MenuPropsSubDist}
                >
                  {subDistList.map((data, index) => (
                    <MenuItem value={data.value} key={index}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="জেলা"
                size="small"
                name="orgDist"
                onChange={handleOrgsChange}
                style={{
                  width: "30%",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl
                style={{
                  width: "30%",
                  transition: "all 100s ease",
                  margin: "20px auto auto 25px",
                  background: "white",
                }}
                size="small"
                // error={errorB ? true : false}
              >
                <InputLabel id="demo-simple-select-label">
                  সংশ্লিষ্ট কার্যালয়ের নাম
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={type}
                  name="orgRelatedOfficeName"
                  label="সংশ্লিষ্ট কার্যালয়ের নাম"
                  onChange={handleOrgsChange}
                  MenuProps={MenuProps}
                >
                  {relatedOfficeList.map((data, index) => (
                    <MenuItem value={data.value} key={index}>
                      {data.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </form>
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#099f19",
                textShadow: "1px 1px 1px gray",
                fontSize: "17px",
              }}
            >
              প্রতিষ্ঠাতা সদস্যের বিবরণ ( কেবল নতুন সংস্থার ক্ষেত্রে প্রযোজ্য )
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countFounder.map((element, index) => (
              <div>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = orgsData?.regNo)}
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    display: "none",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="নাম"
                  size="small"
                  name="name"
                  onChange={(e) => handleFounderChange(index, e)}
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="পদের নাম"
                  size="small"
                  name="designation"
                  onChange={(e) => handleFounderChange(index, e)}
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  style={{
                    width: "30%",

                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="জাতীয় পরিচয়পত্রের নম্বর"
                  size="small"
                  name="nid"
                  onChange={(e) => handleFounderChange(index, e)}
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="মোবাইল"
                  size="small"
                  name="mobile"
                  onChange={(e) => handleFounderChange(index, e)}
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  style={{
                    width: "30%",

                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="বর্তমান ঠিকানা"
                  size="small"
                  name="address"
                  onChange={(e) => handleFounderChange(index, e)}
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="স্থায়ী ঠিকানা"
                  size="small"
                  name="permanentAdds"
                  // error={errorF ? true : false}
                  // helperText={errorF ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="ইমেইল"
                  size="small"
                  name="email"
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto 30px 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {index && index === countFounder.length - 1 ? null : (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorF === true && !(countFounder.length >= 2)
                          ? "flex"
                          : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                )}

                {index && index === countFounder.length - 1 ? (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorF === true && !(countF === 1) ? "flex" : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                ) : null}

                <div
                  style={{
                    left: 0,
                    transition: "all 0.2s ease-in-out",
                    width: "100%",
                    display: "flex",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  {index && index === countFounder.length - 1 ? null : (
                    <Button
                      onClick={handleFounder}
                      variant="outlined"
                      style={{
                        display: countFounder.length >= 2 ? "none" : "block",
                        cursor: "pointer",
                        width: "200px",
                        padding: "5px",
                        fontSize: "14px",
                        margin: "auto",
                        color: "#6a1b9a",
                      }}
                    >
                      নতুন সদস্য সংযুক্ত করুন
                    </Button>
                  )}
                  {index && index === countFounder.length - 1 ? (
                    <div style={{ width: "50%", display: "flex" }}>
                      <Button
                        variant="outlined"
                        onClick={handleFounder}
                        style={{
                          display: countF === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#6a1b9a",
                        }}
                      >
                        নতুন সদস্য সংযুক্ত করুন
                      </Button>

                      <Button
                        variant="outlined"
                        style={{
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#ff002f",
                        }}
                        onClick={() => handleRemoveFounder(index)}
                      >
                        সর্বশেষ তথ্যটি মুছুন
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </form>
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#099f19",
                textShadow: "1px 1px 1px gray",
                fontSize: "17px",
              }}
            >
              আর্থিক বিবরণী
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countBank.map((element, index) => (
              <div>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = orgsData?.regNo)}
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    display: "none",
                    margin: "20px auto auto 25px",
                    background: "white",
                    transition: "all 100s ease",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="ব্যাংকের নাম"
                  size="small"
                  // error={errorB ? true : false}
                  // helperText={errorB ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="name"
                  onChange={(e) => handleBankChange(index, e)}
                  // onChange={handleOrgsChange}
                  style={{
                    width: "30%",
                    transition: "all 100s ease",
                    margin: "20px auto auto 30px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="হিসাব নম্বর"
                  size="small"
                  // error={errorB ? true : false}
                  // helperText={errorB ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="accountNo"
                  onChange={(e) => handleBankChange(index, e)}
                  // onChange={handleOrgsChange}
                  style={{
                    width: "30%",
                    transition: "all 100s ease",
                    margin: "20px auto auto 20px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="রাউটিং নম্বর"
                  size="small"
                  // error={errorB ? true : false}
                  // helperText={errorB ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="routingNo"
                  onChange={(e) => handleBankChange(index, e)}
                  // onChange={handleOrgsChange}
                  style={{
                    width: "30%",
                    transition: "all 100s ease",
                    margin: "20px auto auto 20px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="ব্যাংকের শাখা"
                  size="small"
                  // error={errorB ? true : false}
                  // helperText={errorB ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="branch"
                  onChange={(e) => handleBankChange(index, e)}
                  style={{
                    width: "30%",
                    transition: "all 100s ease",
                    margin: "20px auto auto 30px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <FormControl
                  style={{
                    width: "30%",
                    transition: "all 100s ease",
                    margin: "20px auto 30px 20px",
                    background: "white",
                  }}
                  size="small"
                  // error={errorB ? true : false}
                >
                  <InputLabel id="demo-simple-select-label">
                    ব্যাংক হিসাবের ধরন
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={type}
                    name="type"
                    label="ব্যাংক হিসাবের ধরন"
                    onChange={(e) => handleBankChange(index, e)}
                  >
                    <MenuItem value="চলতি">চলতি</MenuItem>
                    <MenuItem value="সঞ্চয়ী">সঞ্চয়ী</MenuItem>
                  </Select>
                </FormControl>

                {index && index === countBank.length - 1 ? null : (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorB === true && !(countBank.length >= 2)
                          ? "flex"
                          : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                )}

                {index && index === countBank.length - 1 ? (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorB === true && !(countB === 1) ? "flex" : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                ) : null}

                <div
                  style={{
                    left: 0,
                    transition: "all 0.2s ease-in-out",
                    width: "100%",
                    display: "flex",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  {index && index === countBank.length - 1 ? null : (
                    <Button
                      onClick={handleBank}
                      variant="outlined"
                      style={{
                        display: countBank.length >= 2 ? "none" : "block",
                        cursor: "pointer",
                        width: "200px",
                        padding: "5px",
                        fontSize: "14px",
                        margin: "auto",
                        color: "#6a1b9a",
                      }}
                    >
                      নতুন ব্যাংক সংযুক্ত করুন
                    </Button>
                  )}
                  {index && index === countBank.length - 1 ? (
                    <div style={{ width: "50%", display: "flex" }}>
                      <Button
                        variant="outlined"
                        onClick={handleBank}
                        style={{
                          display: countB === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#6a1b9a",
                        }}
                      >
                        নতুন ব্যাংক সংযুক্ত করুন
                      </Button>

                      <Button
                        variant="outlined"
                        style={{
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#ff002f",
                        }}
                        onClick={() => handleRemoveBank(index)}
                      >
                        সর্বশেষ তথ্যটি মুছুন
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </form>
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
                color: "#099f19",
                textShadow: "1px 1px 1px gray",
                fontSize: "17px",
              }}
            >
              সর্বশেষ কার্যকরী কমিটির সদস্যদের বিস্তারিত বিবরণ
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countOfficer.map((element, index) => (
              <div>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = orgsData?.regNo)}
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    display: "none",
                    margin: "20px auto auto 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="সদস্যের নাম"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="name"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 35px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="পদের নাম"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="designation"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 15px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="জাতীয় পরিচয়পত্রের নম্বর"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="nid"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 15px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="মোবাইল নম্বর"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="mobile"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto auto 35px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="বর্তমান ঠিকানা"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="address"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto 30px 15px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id="outlined-basic"
                  label="স্থায়ী ঠিকানা"
                  size="small"
                  // error={errorO ? true : false}
                  // helperText={errorO ? "**অনুগ্রহ করে পূরণ করুন" : ""}
                  name="permanentAdds"
                  onChange={(e) => handleOfficerChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto 30px 15px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                {index && index === countOfficer.length - 1 ? null : (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorO === true && !(countOfficer.length >= 2)
                          ? "flex"
                          : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                )}

                {index && index === countOfficer.length - 1 ? (
                  <Alert
                    style={{
                      height: "fit-content",
                      width: "40%",
                      margin: "20px auto",
                      display:
                        errorO === true && !(countO === 1) ? "flex" : "none",
                      fontSize: "13px",
                    }}
                    severity="warning"
                  >
                    অনুগ্রহ করে উপরের তথ্যগুলো পূরণ করুণ
                  </Alert>
                ) : null}

                <div
                  style={{
                    left: 0,
                    transition: "all 0.2s ease-in-out",
                    width: "100%",
                    display: "flex",
                    margin: "auto",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {index && index === countOfficer.length - 1 ? null : (
                    <Button
                      onClick={handleOfficer}
                      style={{
                        display: countOfficer.length >= 2 ? "none" : "block",
                        cursor: "pointer",
                        width: "200px",
                        padding: "5px",
                        fontSize: "14px",
                        margin: "auto",
                        color: "#6a1b9a",
                      }}
                      variant="outlined"
                    >
                      নতুন সদস্য সংযুক্ত করুন
                    </Button>
                  )}
                  {index && index === countOfficer.length - 1 ? (
                    <div style={{ width: "50%", display: "flex" }}>
                      <Button
                        onClick={handleOfficer}
                        style={{
                          display: countO === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#6a1b9a",
                        }}
                        variant="outlined"
                      >
                        নতুন সদস্য সংযুক্ত করুন
                      </Button>

                      <Button
                        style={{
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#ff002f",
                        }}
                        variant="outlined"
                        onClick={() => handleRemoveOfficer(index)}
                      >
                        সর্বশেষ তথ্যটি মুছুন
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </form>

          {/* <TextField
            id="outlined-basic"
            label="নাম"
            size="small"
            
                name=""
                onChange={handleOrgsChange}
            style={{
              width: "30%",
              
              margin: "20px auto auto 25px",
              background: "white",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#099f19",
              textShadow: "1px 1px 1px gray",
              fontSize: "17px",
            }}
          >
            অন্যান্য
          </p>
          <TextField
            id="outlined-basic"
            label="মন্তব্য"
            size="large"
            multiline
            maxRows={4}
            name="comment"
            onChange={handleOrgsChange}
            style={{
              width: "80%",
              margin: "10px auto auto 10%",
              background: "white",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </s.RegisterSubArea>
        <s.RegisterSubArea style={{ marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              justifyContent: "space-around",
              margin: "auto",
            }}
          >
            <Button
              variant="contained"
              size="large"
              style={{
                marginTop: "20px",
                width: "40%",
                background: "#6f4283",
              }}
              type="submit"
              onClick={handleSubmit}
            >
              দাখিল করুন
            </Button>

            <Button
              variant="contained"
              size="large"
              style={{
                marginTop: "20px",
                width: "40%",
                background: "#6f4283",
              }}
              onClick={handleCancel}
            >
              বাতিল করুন
            </Button>
          </div>
        </s.RegisterSubArea>
      </s.RegisterArea>
    </s.Container>
  );
};

export default AddOrg;
