import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

import { createUser } from "../../Auth/httprequests.js";

import * as s from "./User.styled.js";

const AddUser = () => {
  const [formData, setFormData] = useState();

  const [passValidate, setPassValidate] = useState(false);
  const[alert, setAlert] = useState(false);

  const navigate = useNavigate();

  //select
  const [value, setValue] = useState(0);
  const handleSelectChange = (e) => {
    setValue(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const checkPass = (e) => {
    formData?.password === e.target.value
      ? setPassValidate(true)
      : setPassValidate(false);

      formData?.password === e.target.value
      ? setAlert(false)
      : setAlert(true);
  };

  const handleSubmit = (e) => {
    if (passValidate) {
      createUser(formData).then((res) => {
         if(res.data.success === 1){
           navigate('/allusers')
         }
      });
    }
  };

  return (
    <s.Container style={{}}>
      <s.RegisterArea>
        <p
          style={{
            textAlign: "center",
            color: "#6f4283",
            textShadow: "1px 1px 1px gray",
            fontSize: "25px",
          }}
        >
          ব্যবহারকারীর নিবন্ধন ফরম
        </p>
        <TextField
          name="name"
          onChange={handleChange}
          id="outlined-basic"
          label="নাম"
          size="small"
          required
          variant="outlined"
          style={{
            width: "90%",
            margin: "10px auto auto auto",
            background: "white",
          }}
        />

        <TextField
          name="email"
          onChange={handleChange}
          id="outlined-basic"
          label="ইমেইল"
          size="small"
          required
          variant="outlined"
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "white",
          }}
        />
        <TextField
          name="phone"
          onChange={handleChange}
          id="outlined-basic"
          label="মোবাইল"
          size="small"
          variant="outlined"
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "white",
          }}
        />

        <FormControl
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "white",
          }}
        >
          <Select
            value={value}
            name="type"
            onChange={handleSelectChange}
            variant="outlined"
            size="small"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled={true} value={0}>
              <div style={{ color: "grey" }}>ব্যবহারকারীর ধরন</div>
            </MenuItem>

            <MenuItem value="">
              <em>none</em>
            </MenuItem>
            <MenuItem value="Admin">এডমিন</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="password"
          onChange={handleChange}
          id="outlined-basic"
          label="পাসওয়ার্ড"
          required
          size="small"
          variant="outlined"
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "white",
          }}
        />

        <TextField
          id="outlined-basic"
          label="কনফার্ম পাসওয়ার্ড"
          size="small"
          onKeyUp={checkPass}
          required
          variant="outlined"
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "white",
          }}
        />
          <Alert
            size="small"
            style={{
              width: "90%",
              margin: "1px auto auto auto",
              display: (alert === true) ? "flex" : "none",
              fontSize: "12px",
            }}
            severity="error"
          >
            password does not match!
          </Alert>


        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          style={{
            width: "90%",
            margin: "1px auto auto auto",
            background: "#6f4283",
          }}
        >
          দাখিল করুন
        </Button>
      </s.RegisterArea>
    </s.Container>
  );
};

export default AddUser;
