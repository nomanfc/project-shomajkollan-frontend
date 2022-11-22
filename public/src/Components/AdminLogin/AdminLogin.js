import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import LinearProgress from "@mui/material/LinearProgress";
import PersonIcon from "@mui/icons-material/Person";
import Alert from "@mui/material/Alert";
import LockIcon from "@mui/icons-material/Lock";

import { useDispatch } from "react-redux";
import { signin } from "../../Redux/action/Signin.js";

import * as s from "./AdminLogin.styled";   

const initialData = [
  {
    name: "",
    password: "",
  },
];

var loadingAlerts = JSON.parse(localStorage.getItem("loadingAlert"));
var authentication = JSON.parse(localStorage.getItem("profile"));

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [loadingAlert, setLoadingAlert] = useState(false);

  useEffect(() => {
    if (loadingAlerts) {
      setLoadingAlert(true);
      setTimeout(() => {
        setLoadingAlert(false);
      },3000)
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingAlert(false);
    setLoading(true);
    dispatch(signin(formData, navigate));
  };



  return (
    <s.Container style={{ fontFamily: "Kalpurush" }}>
      <s.topCon>
        <s.topConSec1>
          <img style={{height: '150px'}} src={'./rebofbd.png'} />
        </s.topConSec1>
        <s.topConSec2>
          <div
            style={{ textAlign: "center", marginTop: "5px", color: "white", fontSize: "30px"}}
          >
            সমাজকল্যাণ মন্ত্রণালয়
          </div>
          <div style={{ textAlign: "center", color: "white" ,fontSize: "25px"}}>
            সমাজসেবা অধিদফতর
          </div>
          <div style={{ textAlign: "center", color: "white" , fontSize: "20px"}}>
            জেলা সমাজসেবা কার্যালয়, ঢাকা
          </div>
          <div
            style={{ textAlign: "center", margin: "20px auto", color: "white",fontSize: "18px" }}
          >
            স্বেচ্ছাসেবী সমাজকল্যাণ সংস্থাসমূহ নিবন্ধন ও তত্ত্বাবধায়ন
          </div>
        </s.topConSec2>
        <s.topConSec3>
        <img style={{height: '150px', borderRadius: '10px'}} src={'./shomaj.jpeg'} />
        </s.topConSec3>
      </s.topCon>
      <s.LoginContainer>
        <s.LoginArea>
          <h2 style={{ textAlign: "center", color: "white" }}>
            এখানে লগইন করুন
          </h2>

          <TextField
            id="outlined-basic"
            placeholder="ব্যবহারকারী"
            size="small"
            name="email"
            required
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <PersonIcon
                  style={{
                    color: "gray",
                    paddingRight: "15px",
                    fontSize: "18px",
                  }}
                />
              ),
            }}
            style={{
              width: "100%",
              margin: "auto auto auto auto",
              borderRadius: "5px",
              background: "white",
            }}
          />

          <TextField
            placeholder="পাসওয়ার্ড"
            type="password"
            size="small"
            name="password"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <LockIcon
                  style={{
                    color: "gray",
                    paddingRight: "15px",
                    fontSize: "18px",
                  }}
                />
              ),
            }}
            required
            style={{
              width: "100%",
              background: "white",
              borderRadius: "5px",
              margin: "20px auto auto auto",
            }}
          />


          <Button
            variant="contained"
            size="small"
            startIcon={<LoginIcon />}
            style={{
             
              width: "35%",
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "65%",
              background: "#7477F2",
            }}
            onClick={handleSubmit}
          >
            প্রবেশ করুন
          </Button>
          <Alert
            style={{
              margin: "auto auto 20px auto",
              display: loadingAlert ? "flex" : "none",
              fontSize: "12px",
            }}
            severity="error"
          >
            Invalid Email or Password ! Try again
          </Alert>
          <LinearProgress
            style={{
              margin: "10px auto",
              background: "purple",
              display: loading ? "block" : "none",
            }}
          />
        </s.LoginArea>
      </s.LoginContainer>
    </s.Container>
  );
};

export default AdminLogin;
