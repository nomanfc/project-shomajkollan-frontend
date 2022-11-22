import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useDispatch } from "react-redux";
import {
  subDistList,
  relatedOfficeList,
} from "./DetailSearchTable/Table/ColumnData";

import {
  checkRegNo,
  createFounder,
  createBank,
  createOfficer,
  getFounderByRegNo,
  getBankByRegNo,
  getOfficerByRegNo,
  orgsByRegNo,
  orgsUpdate,
  updateFounderData,
  updateBankData,
  updateOfficerData,
  deleteFounder,
  deleteBank,
  deleteOfficer,
  verifiedBy,
  isVerified,
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

const profile = JSON.parse(localStorage.getItem("profile"));

const VerifiedBy = () => {
  const data = useParams();
  const [duplicate, setDuplicate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [reload, setReload] = useState(100000);

  const [orgsData, setOrgsData] = useState([]);
  const [countOfficer, setCountOfficer] = useState([]);
  const [countBank, setCountBank] = useState([]);
  const [countFounder, setCountFounder] = useState([
    {
      name: "",
      designation: "",
      address: "",
      permanentAdds: "",
      mobile: "",
      email: "",
      nid: "",
      orgRegNo: "",
    },
  ]);

  console.log(orgsData)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getFounderByRegNo(data.id).then((res) => {
      setCountFounder(res.data.data);
    });

    getBankByRegNo(data.id).then((res) => {
      setCountBank(res.data.data);
    });

    getOfficerByRegNo(data.id).then((res) => {
      setCountOfficer(res.data.data);
    });

    orgsByRegNo(data.id).then((res) => {
      setOrgsData(res.data.data[0]);
    });
  }, [reload]);

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
    setCountO(0);
    setCountOfficer([
      ...countOfficer,
      {
        name: "",
        designation: "",
        address: "",
        orgRegNo: "",
        nid: "",
        mobile: "",
        permanentAdds: "",
      },
    ]);
  };

  const handleOfficerChange = (i, e) => {
    let countOfficers = [...countOfficer];
    countOfficers[i][e.target.name] = e.target.value;
    setCountOfficer(countOfficers);
  };

  const handleAddOfficer = () => {
    setCountO(0);
    if (countOfficer[countOfficer.length - 1].name) {
      createOfficer(countOfficer[countOfficer.length - 1]).then((found) => {
        if (found.data.success === 1) {
          setCountO(1);
          setReload(reload - 2);
        }
      });
    }
  };

  let handleRemoveOfficer = (i) => {
    setCountO(1);
    let countOfficers = [...countOfficer];
    countOfficers.splice(i, 1);
    setCountOfficer(countOfficers);

    if (countOfficer[countOfficer.length - 1].name) {
      deleteOfficer(countOfficer[countOfficer.length - 1].id).then((res) => {
        if (res.data.success === 1) {
          setReload(reload - 1);
        }
      });
    }
  };

  ///Bank data
  const handleBank = (e) => {
    setCountB(0);
    setCountBank([
      ...countBank,
      {
        name: "",
        accountNo: "",
        branch: "",
        routingNo: "",
        type: "",
        orgRegNo: "",
      },
    ]);
  };

  const handleAddBank = () => {
    setCountB(0);
    if (countBank[countBank.length - 1].name) {
      createBank(countBank[countBank.length - 1]).then((found) => {
        if (found.data.success === 1) {
          setCountB(1);
          setReload(reload - 2);
        }
      });
    }
  };

  const handleBankChange = (i, e) => {
    let countBanks = [...countBank];
    countBanks[i][e.target.name] = e.target.value;
    setCountBank(countBanks);
  };

  let handleRemoveBank = (i) => {
    setCountB(1);
    let countBanks = [...countBank];
    countBanks.splice(i, 1);
    setCountBank(countBanks);

    if (countBank[countBank.length - 1].name) {
      deleteBank(countBank[countBank.length - 1].id).then((res) => {
        if (res.data.success === 1) {
          setReload(reload - 1);
        }
      });
    }
  };

  ///Founder data
  const handleFounder = (e) => {
    setCountF(0);
    setCountFounder([
      ...countFounder,
      {
        name: "",
        designation: "",
        address: "",
        permanentAdds: "",
        mobile: "",
        email: "",
        nid: "",
        orgRegNo: "",
      },
    ]);
  };

  const handleAddFounder = () => {
    if (countFounder[countFounder.length - 1].name) {
      createFounder(countFounder[countFounder.length - 1]).then((found) => {
        if (found.data.success === 1) {
          setCountF(1);
          setReload(reload - 2);
        }
      });
    }
  };

  const handleFounderChange = (i, e) => {
    let countFounders = [...countFounder];
    countFounders[i][e.target.name] = e.target.value;
    setCountFounder(countFounders);
  };

  let handleRemoveFounder = (i) => {
    setCountF(1);
    let countFounders = [...countFounder];
    countFounders.splice(i, 1);
    setCountFounder(countFounders);

    if (countFounder[countFounder.length - 1].name) {
      deleteFounder(countFounder[countFounder.length - 1].id).then((res) => {
        if (res.data.success === 1) {
          setReload(reload - 1);
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    orgsUpdate(orgsData).then((response) => {
      navigate("/allorg");
      // console.log(response);
    });

    verifiedBy(orgsData.regNo, profile.data.name).then((response) => {
      navigate("/allorg");
        // console.log(response);
    })

    isVerified(orgsData.regNo, true).then((response) => {
      navigate("/allorg");
        // console.log(response);
    })


    for (var i = 0; i < countFounder.length; i++) {
      updateFounderData(countFounder[i]).then((found) => {
        navigate("/allorg");
        // console.log(found);
      });
    }

    for (var i = 0; i < countBank.length; i++) {
      updateBankData(countBank[i]).then((found) => {
        navigate("/allorg");  
        // console.log(found);
      });
    }

    for (var i = 0; i < countOfficer.length; i++) {
      updateOfficerData(countOfficer[i]).then((found) => {
        if (found.data.success === 1) {
          navigate("/allorg");
        }
      });
    }
  };

  const [countF, setCountF] = useState(1);
  const [countB, setCountB] = useState(1);
  const [countO, setCountO] = useState(1);

  const handleCancel = (e) => {
    e.preventDefault();
    return navigate("/allorg");
  };

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
        সংস্থা নিবন্ধন ফরম যাচাই করুন
      </p>
      <s.RegisterArea>
        <s.RegisterSubArea>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#099f19",
              textShadow: "1px 1px 1px gray",
              fontSize: "15px",
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
                value={orgsData.orgName}
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
                disabled={true}
                value={orgsData.regNo}
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
              <Alert
                style={{
                  height: "fit-content",
                  width: "30%",
                  padding: 0,
                  margin: "20px auto auto 25px",
                  display: alert === true ? "flex" : "none",
                  fontSize: "12px",
                }}
                severity="error"
              >
                not available!
              </Alert>

              <TextField
                id="outlined-basic"
                label="রেজিস্ট্রিকরণের তারিখ"
                size="small"
                type="date"
                name="regDate"
                value={orgsData.regDate}
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
                value={orgsData.placementDate}
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
                value={orgsData.orgMobileNo}
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
                value={orgsData.orgEmail}
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
                value={orgsData.orgWebsite}
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
                value={orgsData.orgMission}
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
                value={orgsData.workArea}
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
                value={orgsData.lastActiveCommiteApproveDate}
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
                value={orgsData.lastActiveCommiteExpireDate}
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
              fontSize: "15px",
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
                value={orgsData.orgVillage}
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
                value={orgsData.orgPost}
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
                  value={orgsData.orgSubdist}
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
                value={orgsData.orgDist}
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
                  value={orgsData.orgRelatedOfficeName}
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
                fontSize: "15px",
              }}
            >
              প্রতিষ্ঠাতা সদস্যের বিবরণ ( কেবল নতুন সংস্থার ক্ষেত্রে প্রযোজ্য )
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countFounder?.map((element, index) => (
              <div style={{ transitionDuration: "4s" }}>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = data.id)}
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
                  value={element.name}
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
                  label="পদের নাম"
                  size="small"
                  name="designation"
                  value={element.designation}
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
                  label="জাতীয় পরিচয়পত্রের নম্বর"
                  size="small"
                  name="nid"
                  value={element.nid}
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
                  label="মোবাইল"
                  size="small"
                  value={element.mobile}
                  name="mobile"
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
                  label="বর্তমান ঠিকানা"
                  size="small"
                  name="address"
                  value={element.address}
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
                  label="স্থায়ী ঠিকানা"
                  size="small"
                  name="permanentAdds"
                  value={element.permanentAdds}
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
                  value={element.email}
                  onChange={(e) => handleFounderChange(index, e)}
                  style={{
                    width: "30%",
                    margin: "20px auto 25px 25px",
                    background: "white",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

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
                    <div
                      style={{
                        width: "50%",
                        display: "flex",
                        transitionDuration: "4s",
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={handleAddFounder}
                        // disabled={countF === 1 ? false:true }
                        style={{
                          display: countF === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#008b02",
                        }}
                      >
                        সর্বশেষ তথ্যটি সেইভ করুন
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={handleFounder}
                        // disabled={countF === 1 ? true : false}
                        style={{
                          display: countF === 1 ? "block" : "none",
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
                fontSize: "15px",
              }}
            >
              আর্থিক বিবরণী
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countBank?.map((element, index) => (
              <div>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = data.id)}
                  onChange={(e) => handleBankChange(index, e)}
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
                  label="ব্যাংকের নাম"
                  size="small"
                  name="name"
                  value={element.name}
                  onChange={(e) => handleBankChange(index, e)}
                  // onChange={handleOrgsChange}
                  style={{
                    width: "30%",
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
                  name="accountNo"
                  value={element.accountNo}
                  onChange={(e) => handleBankChange(index, e)}
                  // onChange={handleOrgsChange}
                  style={{
                    width: "30%",

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
                  name="routingNo"
                  value={element.routingNo}
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
                  name="branch"
                  value={element.branch}
                  onChange={(e) => handleBankChange(index, e)}
                  style={{
                    width: "30%",

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
                >
                  <InputLabel id="demo-simple-select-label">
                    ব্যাংক হিসাবের ধরন
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={element.type}
                    name="type"
                    label="ব্যাংক হিসাবের ধরন"
                    onChange={(e) => handleBankChange(index, e)}
                  >
                    <MenuItem value="চলতি">চলতি</MenuItem>
                    <MenuItem value="সঞ্চয়ী">সঞ্চয়ী</MenuItem>
                  </Select>
                </FormControl>

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
                      variant="outlined"
                      onClick={handleBank}
                      style={{
                        display: countBank.length >= 2 ? "none" : "block",
                        cursor: "pointer",
                        width: "200px",
                        fontSize: "14px",
                        padding: "5px",
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
                        onClick={handleAddBank}
                        style={{
                          display: countB === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          fontSize: "14px",
                          padding: "5px",
                          margin: "auto",
                          color: "#008b02",
                        }}
                      >
                        সর্বশেষ তথ্যটি সেইভ করুন
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={handleBank}
                        style={{
                          display: countB === 1 ? "block" : "none",
                          cursor: "pointer",
                          width: "200px",
                          fontSize: "14px",
                          padding: "5px",
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
                          fontSize: "14px",
                          padding: "5px",
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
                fontSize: "15px",
              }}
            >
              সর্বশেষ কার্যকরী কমিটির সদস্যদের বিবরণ
            </p>
          </span>

          <form onSubmit={handleSubmit}>
            {countOfficer?.map((element, index) => (
              <div>
                <TextField
                  id="outlined-basic"
                  size="small"
                  name="orgRegNo"
                  value={(element.orgRegNo = data.id)}
                  onChange={(e) => handleOfficerChange(index, e)}
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
                  key={index}
                  id="outlined-basic"
                  label="সদস্যের নাম"
                  size="small"
                  name="name"
                  value={element.name}
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
                  // value={(element.designation = defaultData?.designation)}
                  name="designation"
                  value={element.designation}
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
                  name="nid"
                  value={element.nid}
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
                  name="mobile"
                  value={element.mobile}
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
                  name="address"
                  value={element.address}
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
                  name="permanentAdds"
                  value={element.permanentAdds}
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
                  {index && index === countOfficer.length - 1 ? null : (
                    <Button
                      variant="outlined"
                      onClick={handleOfficer}
                      style={{
                        display: countOfficer.length >= 2 ? "none" : "block",
                        cursor: "pointer",
                        width: "200px",
                        fontSize: "14px",
                        padding: "5px",
                        margin: "auto",
                        color: "#6a1b9a",
                      }}
                    >
                      নতুন সদস্য সংযুক্ত করুন
                    </Button>
                    // <Tooltip title="সদস্য যোগ করুন" aria-label="add">
                    //   <IconButton
                    //     style={{
                    //       display: countOfficer.length >= 2 ? "none" : "block",
                    //     }}
                    //   >
                    //     <AiOutlinePlusCircle
                    //       onClick={handleOfficer}
                    //       style={{
                    //         display:
                    //           countOfficer.length >= 2 ? "none" : "block",
                    //         cursor: "pointer",
                    //         width: "fit-content",
                    //         fontSize: "30px",
                    //         margin: "auto",
                    //         color: "#5300eb",
                    //       }}
                    //     />
                    //   </IconButton>
                    // </Tooltip>
                  )}
                  {index && index === countOfficer.length - 1 ? (
                    <div style={{ width: "50%", display: "flex" }}>
                      <Button
                        variant="outlined"
                        onClick={handleAddOfficer}
                        style={{
                          display: countO === 1 ? "none" : "block",
                          cursor: "pointer",
                          width: "200px",
                          padding: "5px",
                          fontSize: "14px",
                          margin: "auto",
                          color: "#008b02",
                        }}
                      >
                        সর্বশেষ তথ্যটি সেইভ করুন
                      </Button>

                      <Button
                        variant="outlined"
                        onClick={handleOfficer}
                        style={{
                          display: countO === 1 ? "block" : "none",
                          cursor: "pointer",
                          width: "200px",
                          fontSize: "14px",
                          padding: "5px",
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
                          fontSize: "14px",
                          padding: "5px",
                          margin: "auto",
                          color: "#ff002f",
                        }}
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
        </s.RegisterSubArea>

        <s.RegisterSubArea>
          <p
            style={{
              width: "100%",
              textAlign: "center",
              color: "#099f19",
              textShadow: "1px 1px 1px gray",
              fontSize: "15px",
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
            value={orgsData.comment}
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
              যাচাই করুন
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

export default VerifiedBy;

// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// import { orgsByRegNo, orgsUpdate } from "../../Auth/httprequests";

// import * as s from "./Org.styled";

// const EditOrg = () => {
//   const [formData, setFormData] = useState({});

//   const navigate = useNavigate();

//   const data = useParams();

//   useEffect(() => {
//     orgsByRegNo(data.id).then((res) => {
//       setFormData(res.data.data[0]);
//     });
//   }, []);

//   const handleChange = (e) => {
//     e.preventDefault();
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     orgsUpdate(formData).then((res) => {
//       if (res.data.success === 1) {
//         navigate("/allorg");
//       }
//     });
//   };

//   return (
//     <s.Container>
//       <p
//         style={{
//           width: "100%",
//           textAlign: "center",
//           color: "#6f4283",
//           textShadow: "1px 1px 1px gray",
//           fontSize: "25px",
//         }}
//       >
//         সংস্থার বিবরণ সম্পাদন করুন
//       </p>

//       <s.RegisterArea>
//         <s.RegisterSubArea>
//           <p
//             style={{
//               width: "100%",
//               textAlign: "center",
//               color: "#099f19",
//               textShadow: "1px 1px 1px gray",
//               fontSize: "15px",
//             }}
//           >
//             সংস্থার বিবরণ
//           </p>
//           <TextField
//             id="outlined-basic"
//             label="১. লিপিবদ্ধ করিবার তারিখ"
//             size="small"
//
//             type="date"
//             name="listingDate"
//             value={formData?.listingDate}
//             onChange={handleChange}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//           />

//           <TextField
//             id="outlined-basic"
//             label="২. সংস্থার নাম"
//             size="small"
//
//             name="orgName"
//             value={formData?.orgName}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="৩. সংস্থার ঠিকানা"
//             size="small"
//             value={formData?.orgAddress}
//
//             name="orgAddress"
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />

//           <TextField
//             id="outlined-basic"
//             label="৪.রেজিস্ট্রি নম্বর"
//             size="small"
//
//             name="regNo"
//             value={formData?.regNo}
//             disabled={true}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="৫.রেজিস্ট্রিকরণের তারিখ"
//             size="small"
//
//             type="date"
//             name="regDate"
//             value={formData?.regDate}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="৬. স্থাপনের তারিখ"
//             size="small"
//             type="date"
//
//             name="placementDate"
//             value={formData?.placementDate}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="৭. সর্বশেষ কার্যকারী কমিটি অনুমদনের তারিখ"
//             size="small"
//             type="date"
//
//             name="lastActiveCommiteApproveDate"
//             value={formData?.lastActiveCommiteApproveDate}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </s.RegisterSubArea>

//         <s.RegisterSubArea>
//           <p
//             style={{
//               width: "100%",
//               textAlign: "center",
//               color: "#099f19",
//               textShadow: "1px 1px 1px gray",
//               fontSize: "15px",
//             }}
//           >
//              প্রতিষ্ঠাতা সদস্যের বিবরণ
//           </p>
//           <TextField
//             id="outlined-basic"
//             label="৮. সংস্থার মোবাইল নম্বর"
//             size="small"
//
//             name="orgMobileNo"
//             value={formData?.orgMobileNo}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />

//           <TextField
//             id="outlined-basic"
//             label="৯. সংস্থার ইমেইল"
//             size="small"
//
//             name="orgEmail"
//             value={formData?.orgEmail}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১০. সংস্থার ওয়েবসাইট"
//             size="small"
//
//             name="orgWebsite"
//             value={formData?.orgWebsite}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১১. সংস্থার লক্ষ্য ও উদ্দেশ্যসমূহ"
//             size="small"
//
//             name="orgMission"
//             value={formData?.orgMission}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১২. কার্য এলাকা"
//             size="small"
//
//             name="workArea"
//             value={formData?.workArea}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১৩. নাম"
//             size="small"
//
//             name="name"
//             value={formData?.name}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১৪. পেশা"
//             size="small"
//
//             name="ocupation"
//             value={formData?.ocupation}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১৫. ঠিকানা"
//             size="small"
//
//             name="address"
//             value={formData?.address}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </s.RegisterSubArea>

//         <s.RegisterSubArea>
//           <p
//             style={{
//               width: "100%",
//               textAlign: "center",
//               color: "#099f19",
//               textShadow: "1px 1px 1px gray",
//               fontSize: "15px",
//             }}
//           >
//             অন্যান্য বিবরণ
//           </p>
//           <TextField
//             id="outlined-basic"
//             label="১৯. যে ব্যাংক/ব্যাংকসমূহে তহবিল জমা রাখা হয়েছে"
//             size="small"
//
//             name="bankAccount"
//             value={formData?.bankAccount}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="২০. মন্তব্য"
//             size="small"
//             multiline
//             maxRows={4}
//
//             name="coment"
//             value={formData?.coment}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </s.RegisterSubArea>

//         <s.RegisterSubArea>
//           <p
//             style={{
//               width: "100%",
//               textAlign: "center",
//               color: "#099f19",
//               textShadow: "1px 1px 1px gray",
//               fontSize: "15px",
//             }}
//           >
//              কর্মকর্তাগণের বিবরণ
//           </p>
//           <TextField
//             id="outlined-basic"
//             label="১৬. কর্মকর্তার নাম"
//             size="small"
//
//             name="officerName"
//             value={formData?.officerName}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১৭. কর্মকর্তার পদের নাম"
//             size="small"
//
//             name="officerRankName"
//             value={formData?.officerRankName}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             id="outlined-basic"
//             label="১৮. কর্মকর্তার ঠিকানা"
//             size="small"
//
//             name="officerAddress"
//             value={formData?.officerAddress}
//             onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />

//           {/* <TextField
//             id="outlined-basic"
//             label="নাম"
//             size="small"
//
//                 name=""
//                 onChange={handleChange}
//             style={{
//               width: "30%",
//               margin: "20px auto auto 25px",
//               background: "white",
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           /> */}
//         </s.RegisterSubArea>
//         <s.RegisterSubArea style={{ marginBottom: "20px" }}>
//           <Button
//             variant="contained"
//             size="large"
//             style={{
//               marginLeft: "25%",
//               marginTop: "20px",
//               width: "50%",
//               background: "#6f4283",
//             }}
//             onClick={handleSubmit}
//           >
//             দাখিল করুন
//           </Button>
//         </s.RegisterSubArea>
//       </s.RegisterArea>
//     </s.Container>
//   );
// };

// export default EditOrg;

