import React from "react";
import { useNavigate } from "react-router-dom";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import * as s from "./Table.styled";
import {
  fileDownload,
  goToFileDownloadLink,
} from "../../../Auth/httprequests.js";
const File = (props) => {
  const fileName = props.file?.fileName;
  // const navigate = useNavigate();
  const handleDownload = (e) => {
    fileDownload(fileName).then((response) => {
      window.open(
        `https://shomajkollanwebapi.brotherhoodinfotech.com/api${response.config.url}`
      );
    });
  };

  return (
    <s.BasicTableContainer style={{fontFamily: 'Kalpurush'}}>
      <s.FileContainer>
        <s.FileDownload>
          <Tooltip title="ডাউনলোড করুন">
            <IconButton onClick={handleDownload}>
              <CloudDownloadIcon style={{ color: "#6F4283", fontSize:'150px' }} />
            </IconButton>
          </Tooltip>
        </s.FileDownload>
        <s.FileName>{fileName}</s.FileName>
      </s.FileContainer>
    </s.BasicTableContainer>
  );
};

export default File;
