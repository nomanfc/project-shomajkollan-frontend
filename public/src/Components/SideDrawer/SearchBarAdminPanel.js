import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { searchByName, orgsByRegNo } from "../../Auth/httprequests.js";

import { getSearchData } from "../../Redux/action/search.js";
import { startCount } from "../../Redux/action/count.js";

export default function SearchBar() {
  const searchDatas = useSelector((state) => state.searchData);

  const checkInput = /[০-৯]|[0-9]/;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [regId, setRegId] = useState();

  let load = localStorage.getItem("reload");
  useEffect(() => {
    const s = searchKeyword?.search;
    if (checkInput.test(s)) {
      orgsByRegNo(s).then((response) => {
        setRegId(response.data.data[0]?.regNo);
      });
    }
    if (checkInput.test(s) === false) {
      searchByName(s).then((response) => {
        if (response.data.data.length > 1) {
          dispatch(getSearchData(searchKeyword));
          dispatch(startCount);
        }
        if (response.data.data.length < 2) {
          setRegId(response.data.data[0]?.regNo);
          dispatch(startCount);
        }
      });
    }
  }, [searchKeyword, load]);

  const handleSearchChange = (e) => {
    setSearchKeyword({ ...searchKeyword, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    localStorage.setItem("reload", Math.random() * 10);

    if (searchDatas.length > 1) {
      navigate("allorg");
    }
    if (searchDatas.length < 2) {
      orgsByRegNo(regId).then((response) => {
        response.data.data?.length > 0
          ? navigate(`orgdetail/${regId}`)
          : navigate("nodata");
      });
    }
  };

  const handleLoad = (e) => {
    e.preventDefault();
    dispatch(getSearchData(searchKeyword));
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearchKeyword("");

    localStorage.setItem("reload", Math.random() * 10);
      window.location.reload();
  };

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      style={{ height: "30px", width: "100%" }}
    >
      <form onSubmit={handleSearch}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="খুঁজুন"
          inputProps={{ "aria-label": "search google maps" }}
          size="small"
          value={searchKeyword?.search}
          name="search"
          onKeyUp={handleLoad}
          onChange={handleSearchChange}
          autoComplete="off"
        />
      </form>

      {searchKeyword ? (
        <IconButton onClick={handleClear}>
          <ClearIcon style={{ fontSize: "15px" }} />
        </IconButton>
      ) : null}

      <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

// style={{ display: regId ?'flex':'none'}}
