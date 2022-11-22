import React, { useState, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import * as styled from "./Org.styled";
import BasicSortingTable from "./DetailSearchTable/Table/BasicSortingTable";
import {
  subDistList,
  relatedOfficeList,
} from "./DetailSearchTable/Table/ColumnData";

import {
  getOrgBySubDist,
  getOrgByRON,
  getOrgByRegDate,
  getAllOrgBySubDistANDTwoRegDate,
  getAllOrgByOrgRelatedOfficeNameANDTwoRegDate,
  getAllOrgBySubDistANDOrgRelatedOfficeName,
} from "../../Auth/httprequests";

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

const DetailSearch = () => {
  const theme = useTheme();
  const [tableData, setTableData] = useState({
    orgSubdist: null,
    orgRelatedOfficeName: null,
    date1: null,
    date2: null,
  });
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (
      formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (!formData?.date1 &&
      !formData?.date2)
    ) {
      getOrgBySubDist(formData?.orgSubdist).then((response) => {
        setTableData(response.data.data);
      }); 

      console.log('Hello')
    }

    if (
      !formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      (!formData?.date1 &&
      !formData?.date2)
    ) {
      getOrgByRON(formData?.orgRelatedOfficeName).then((response) => {
        setTableData(response.data.data);
      });
      console.log('Hello2')
    }

    if (
      !formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getOrgByRegDate(formData?.date1, formData?.date2).then((response) => {
        setTableData(response.data.data);
      });
      console.log('Hello3')
    }

    if (
      formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getAllOrgBySubDistANDTwoRegDate(
        formData?.orgSubdist,
        formData?.date1,
        formData?.date2
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello4')
    }

    if (
      !formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getAllOrgByOrgRelatedOfficeNameANDTwoRegDate(
        formData?.orgRelatedOfficeName,
        formData?.date1,
        formData?.date2
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello5')
    }

    if (
      formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      !formData?.date1 &&
      !formData?.date2
    ) {
      getAllOrgBySubDistANDOrgRelatedOfficeName(
        formData?.orgSubdist,
        formData?.orgRelatedOfficeName
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello6')
    }
  },[formData])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (!formData?.date1 &&
      !formData?.date2)
    ) {
      getOrgBySubDist(formData?.orgSubdist).then((response) => {
        setTableData(response.data.data);
      }); 

      console.log('Hello')
    }

    if (
      !formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      (!formData?.date1 &&
      !formData?.date2)
    ) {
      getOrgByRON(formData?.orgRelatedOfficeName).then((response) => {
        setTableData(response.data.data);
      });
      console.log('Hello2')
    }

    if (
      !formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getOrgByRegDate(formData?.date1, formData?.date2).then((response) => {
        setTableData(response.data.data);
      });
      console.log('Hello3')
    }

    if (
      formData?.orgSubdist &&
      !formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getAllOrgBySubDistANDTwoRegDate(
        formData?.orgSubdist,
        formData?.date1,
        formData?.date2
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello4')
    }

    if (
      !formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      (formData?.date1 ||
      formData?.date2)
    ) {
      getAllOrgByOrgRelatedOfficeNameANDTwoRegDate(
        formData?.orgRelatedOfficeName,
        formData?.date1,
        formData?.date2
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello5')
    }

    if (
      formData?.orgSubdist &&
      formData?.orgRelatedOfficeName &&
      !formData?.date1 &&
      !formData?.date2
    ) {
      getAllOrgBySubDistANDOrgRelatedOfficeName(
        formData?.orgSubdist,
        formData?.orgRelatedOfficeName
      ).then((res) => {
        setTableData(res.data.data);
      });
      console.log('Hello6')
    }

    console.log(tableData);
  };

  return (
    <styled.Container>
      <div
        style={{
          margin: "auto",
          width: "100%",
          textAlign: "center",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Kalpurush",
          marginBottom: "70px",
        }}
      >
        <span
          style={{
            textAlign: "center",
            color: "#6f4283",
            marginLeft: "43%",
            textShadow: "1px 1px 1px gray",
            fontSize: "25px",
            fontFamily: "Kalpurush",
          }}
        >
          এডভান্সড সার্চ
        </span>
      </div>

      <styled.DetailsAreaSearchContainer>
        <FormControl
          style={{
            marginRight: "15px",
            width: "20%",
            transition: "all 100s ease",
            background: "white",
          }}
          size="small"
          // error={errorB ? true : false}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontFamily: "Kalpurush" }}
          >
            থানা
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="orgSubdist"
            label="থানা"
            onChange={handleChange}
            MenuProps={MenuPropsSubDist}
          >

            {subDistList.map((data, index) => (
              <MenuItem value={data.value} key={index}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          style={{
            width: "30%",
            transition: "all 100s ease",
            background: "white",
          }}
          size="small"
          // error={errorB ? true : false}
        >
          <InputLabel
            id="demo-simple-select-label"
            style={{ fontFamily: "Kalpurush" }}
          >
            সংশ্লিষ্ট কার্যালয়
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="orgRelatedOfficeName"
            label="সংশ্লিষ্ট কার্যালয়"
            onChange={handleChange}
            MenuProps={MenuProps}
          >

            {relatedOfficeList.map((data, index) => (
              <MenuItem value={data.value} key={index}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="রেজিস্ট্রিকরণের তারিখ"
            size="small"
            type="date"
            name="date1"
            onChange={handleChange}
            style={{
              width: "170px",
              marginRight: "10px",
              background: "white",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span style={{ color: "#099f19" }}> হতে </span>
          <TextField
            id="outlined-basic"
            label="রেজিস্ট্রিকরণের তারিখ"
            size="small"
            type="date"
            disabled={formData?.date1 ? false : true}
            name="date2"
            onChange={handleChange}
            style={{
              width: "170px",
              marginLeft: "10px",
              background: "white",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </styled.DetailsAreaSearchContainer>

      <styled.DetailsAreaSearchContainer>
        <Button
          variant="outlined"
          //   secondary
          size="small"
          onClick={handleSubmit}
          style={{
            marginTop: "50px",
            marginBottom: "100px",
            padding: "5px",
            width: "20%",
            color: "#6f4283",
            fontFamily: "Kalpurush",
          }}
        >
          অনুসন্ধান করুন
        </Button>
      </styled.DetailsAreaSearchContainer>

      <styled.DetailsAreaSearchContainer>
        <BasicSortingTable data={tableData}/>
      </styled.DetailsAreaSearchContainer>
    </styled.Container>
  );
};

export default DetailSearch;
