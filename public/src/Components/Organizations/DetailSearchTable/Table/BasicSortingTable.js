import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubjectIcon from "@mui/icons-material/Subject";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { FormControlLabel, FormGroup, Switch, Tooltip } from "@mui/material";

import { useTable, useSortBy, usePagination } from "react-table";
import { ColumnData } from "./ColumnData";
import * as s from "./BasicSortingTable.style";
import { deleteOrgs } from "../../../../Auth/httprequests";
import {
  getAllOrgs,
  orgsByRegNo,
  orgUpload,
  upload,
  updateFileName,
  fileDownload,
  fileDownloadLink,
} from "../../../../Auth/httprequests.js";

import { UP_URL } from "../../../../Constants/Constants.js";

const defaultValue = [
  {
    regNo: "No Data",
    orgName: "No Data",
    orgRelatedOfficeName: "No Data",
    workArea: "No Data",
    orgMobileNo: "No Data",
  },

];

const Input = styled("input")({
  display: "none",
});

const styleUploadModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  bgcolor: "background.paper",
  // border: "2px solid purple",
  boxShadow: 20,
  p: 3,
};

const styleDeleteModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid purple",
  boxShadow: 24,
  p: 3,
};

const BasicSortingTable = (props) => {
  const searchDatas = useSelector((state) => state.searchData);
  const counter = useSelector((state) => state?.count);

  const [tableDatas, setTableData] = useState(defaultValue);

  const [testTableData, setTestTableData] = useState(defaultValue);

  const [id, setId] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(10000);
  const [dataS, setDataS] = useState();

  const [tableCell, setTableCell] = useState({
    fileName: "",
    fileLink: "",
  });

  

  const [file, setFile] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // setTableData(props.data)
  }, [props.data]);

  console.log("table", props.data)

  useEffect(() => {
    getAllOrgs()
      .then((response) => {
        // setTableData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload, searchDatas, counter]);

  const handleClick = (data) => () => {};

  const handleOpen = (data) => () => {
    setOpen(true);
    setId(data.row.original.regNo);
  };

  const handleClose = () => {
    setOpen(false);
    setUploadModal(false);
  };

  const deleteHandler = (data) => () => {
    deleteOrgs(data.id).then((res) => {
      if (res.data.success === 1) {
        setReload(reload - 3);
        setOpen(false);
      }
    });
  };

  const editHandler = (data) => () => {
    navigate(`/editorg/${data.row.original.regNo}`);
  };

  const detailsHandler = (data) => () => {
    navigate(`/orgdetail/${data.row.original.regNo}`);
  };

  const handleUploadModal = (data) => (e) => {
    e.preventDefault();
    setUploadModal(true);
    setId(data.row.original.regNo);
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0])
    setFile({ [e.target.name]: e.target.files[0] });
  };

  const uploadHandler = (data) => (e) => {
    const formData = new FormData();
    formData.append("upload_key", file.upload);
    const type = file.upload.type;

    upload(id, formData, type).then((response) => {
      if (response.data.succss === 1) {
        const filePatch = { fileName: response.data.fileName, regNo: id };
        updateFileName(filePatch).then((res) => {
          if (res.data.success === 1) {
            setUploadModal(false);
            setReload(reload - 1);
          }
        });
      }
    });
  };

  const handleDownload = (data) => (e) => {
    e.preventDefault();
    const fileName = data.row.original.fileName;
    fileDownload(fileName).then((response) => {
      // console.log(response);
    });
  };

  // const data = testTableData.length > 1 ? testTableData : tableData;
  // const data = defaultValue;


  const headerColumn = useMemo(() => ColumnData, []);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setPageSize,
  } = useTable(
    {
      columns: headerColumn,
      data: tableDatas,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <s.BasicTableContainer>
      <Modal
        open={uploadModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={styleUploadModal}
          style={{ borderRadius: "10px", padding: "15px" }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#6F4283",
              textShadow: "1px 1px 2px gray",
            }}
          >
            এখানে ফাইল আপলোড করুন
          </p>
          <form onSubmit={uploadHandler({ id })}>
            <TextField
              size="small"
              name="upload"
              id="outlined-secondary"
              type="file"
              variant="outlined"
              style={{
                padding: "5px",
                cursor: "pointer",
                width: "100%",
              }}
              onChange={handleFileChange}
            />
          </form>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "10px",
              margin: "15px auto auto auto",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              type="submit"
              style={{ textShadow: "0px 0px 1px gray" }}
              onClick={uploadHandler({ id })}
            >
              আপলোড করুন
            </Button>

            <Button
              variant="outlined"
              size="small"
              style={{
                color: "red",
                marginLeft: "40px",
                textShadow: "0px 0px 1px gray",
              }}
              onClick={handleClose}
            >
              বাতিল করুন
            </Button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDeleteModal} style={{ borderRadius: "10px" }}>
          <div>
            <div>
              <p
                style={{
                  textAlign: "center",
                  color: "#6F4283",
                  textShadow: "1px 1px 1px gray",
                }}
              >
                আপনি কি প্রতিষ্ঠানটি মুছে ফেলতে চান ?
              </p>{" "}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "70%",
                margin: "auto",
              }}
            >
              <Button
                onClick={handleClose}
                size="small"
                style={{ textShadow: "0px 0px 1px gray" }}
              >
                বাতিল করুন
              </Button>
              <Button
                onClick={deleteHandler({ id })}
                style={{ textShadow: "0px 0px 1px gray" }}
                size="small"
                color="error"
              >
                মুছে ফেলুন
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <br />
      <s.table {...getTableProps()}>
        <s.thead>
          {headerGroups.map((headerGroup, index) => (
            <s.tr key={index} {...headerGroup.getFooterGroupProps()}>
              {headerGroup.headers.map((column, id) => (
                <s.th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={id}
                >
                  <s.span style={{ textAlign: "center" }}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon style={{ fontSize: "12px" }} />
                      ) : (
                        <ArrowUpwardIcon style={{ fontSize: "12px" }} />
                      )
                    ) : (
                      <ImportExportIcon style={{ fontSize: "12px" }} />
                    )}
                  </s.span>
                </s.th>
              ))}
              {/* <s.th style={{ textAlign: "center", width: "fit-content" }}>
                ফাইল
              </s.th> */}
              <s.th style={{ textAlign: "center", width: "fit-content" }}>
                অপশন
              </s.th>
            </s.tr>
          ))}
        </s.thead>

          <s.tbody {...getTableBodyProps()}>
            {page?.map((row, index) => {
              prepareRow(row);
              return (
                <s.tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <s.td
                        key={index}
                        onClick={detailsHandler({ row })}
                        style={{ cursor: "pointer" }}
                      >
                        {cell.render("Cell")}
                      </s.td>
                    );
                  })}

                  <s.td>
                    <s.actionCon
                      // style={{
                      //   display: tableDatas === defaultValue ? "none" : "block",
                      // }}
                    >
                      <Tooltip title="বিস্তারিত তথ্য" aria-label="add">
                        <IconButton onClick={detailsHandler({ row })}>
                          <SubjectIcon
                            style={{ color: "rgba(111, 52, 162, 1)" }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="তথ্য সম্পাদন করুন" aria-label="add">
                        <IconButton onClick={editHandler({ row })}>
                          <EditIcon
                            style={{ color: "rgba(111, 52, 162, 1)" }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="ফাইল আপলোড করুন" aria-label="add">
                        <label htmlFor="icon-button-file">
                          <IconButton
                            aria-label="upload picture"
                            component="span"
                            onClick={handleUploadModal({ row })}
                          >
                            <CloudUploadIcon
                              style={{ color: "rgba(111, 52, 162, 1)" }}
                            />
                          </IconButton>
                        </label>
                      </Tooltip>

                      {/* <Tooltip title="ফাইল ডাউনলোড করুন">
                      <IconButton onClick={handleDownload({row})}>
                        <CloudDownloadIcon style={{ color: "#6F4283" }} />
                      </IconButton>
                    </Tooltip> */}

                      <Tooltip title="তথ্য মুছে ফেলুন" aria-label="add">
                        <IconButton onClick={handleOpen({ row })}>
                          <DeleteForeverIcon
                            style={{ color: "rgba(111, 52, 162, 1)" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </s.actionCon>
                  </s.td>
                </s.tr>
              );
            })}
          </s.tbody>
      </s.table>
    </s.BasicTableContainer>
  );
};

export default BasicSortingTable;
