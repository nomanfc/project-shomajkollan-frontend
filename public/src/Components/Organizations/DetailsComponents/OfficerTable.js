import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubjectIcon from "@mui/icons-material/Subject";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import { FormControlLabel, FormGroup, Switch, Tooltip } from "@mui/material";

import { useTable, useSortBy, usePagination } from "react-table";
import { ColumnDataOfficer } from "./ColumnData";
import * as s from "./Table.styled";
import { deleteOrgs, deleteOfficer } from "../../../Auth/httprequests.js";
import {
  getAllOrgs,
  getOfficerByRegNo,
  orgsByRegNo,
  orgUpload,
} from "../../../Auth/httprequests.js";

const defaultValue = [
  {
    name: "loading..",
    designation: "loading..",
    nid: "loading..",
    mobile: "loading..",
    address: "loading..",
    permanentAdds: "loading..",

  },
];

const Input = styled("input")({
  display: "none",
});

const style = {
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

const OfficerTable = (props) => {
  const dataId = useParams();
  const [tableData, setTableData] = useState(defaultValue);
  const [id, setId] = useState(null);
  const [fileName, setFileName] = useState([]);
  const navigate = useNavigate();
  const[reload, setReload] = useState(10000);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);


  const load = localStorage.getItem("reload");
  useEffect(() => {
    getOfficerByRegNo(dataId.id)
      .then((response) => {
        setTableData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load]);

  const handleChange = (event) => {};

  const handleClick = (data) => () => {};

  const handleOpen = (data) => () => {
    setOpen(true);
    setId(data.row.original.id);
  };

  const deleteHandler = (data) => () => {
    deleteOfficer(data.id).then((res) => {
      if (res.data.success === 1) {
        setReload(reload-2);
        setOpen(false);
      }
    });
  };
  const editHandler = (data) => () => {
    navigate(`/editorg/${dataId.id}`);
  };

  const detailsHandler = (data) => () => {
    navigate(`/orgdetail/${data.row.original.regNo}`);
  };

  const handleUpload = (data) => (e) => {
    e.preventDefault();

    // const _id = data.row.original.regNo;
    // orgsByRegNo(_id).then((res)=>{
    //   console.log(res)
    // })
    // setTimeout(()=>{
    //   orgUpload(e.target.value).then((res)=>{
    //     console.log(res)
    //   })
    // }, 5000)
  };

  const data = tableData;
  const headerColumn = useMemo(() => ColumnDataOfficer, []);

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
      data: data,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <s.BasicTableContainer style={{fontFamily: 'Kalpurush'}}> 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "10px" }}>
          <div>
            <div>
              <p style={{ textAlign: "center", color: "purple" }}>
                আপনি কি এই তথ্য মুছে ফেলতে চান ?
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
              <Button onClick={handleClose} size="small">
                বাতিল করুন
              </Button>
              <Button
                onClick={deleteHandler({ id })}
                size="small"
                color="error"
              >
                মুছে ফেলুন
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <s.showSize style={{ display: "none" }}>
        Rows per Page:
        <select
          style={{ width: "50px", border: "1px solid black" }}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[1000].map((pageSize, index) => (
            <option key={index} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </s.showSize>
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
                  <s.span>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownwardIcon style={{ fontSize: "15px" }} />
                      ) : (
                        <ArrowUpwardIcon style={{ fontSize: "15px" }} />
                      )
                    ) : (
                      <ImportExportIcon style={{ fontSize: "15px" }} />
                    )}
                  </s.span>
                </s.th>
              ))}
            </s.tr>
          ))}
        </s.thead>

        <s.tbody {...getTableBodyProps()}>
          {page?.map((row, index) => {
            prepareRow(row);
            return (
              <s.tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return <s.td key={index}>{cell.render("Cell")}</s.td>;
                })}
                {/* <s.td>
                  <s.actionCon>
                    <Tooltip title="তথ্য সম্পাদন করুন" aria-label="add">
                      <IconButton onClick={editHandler({ row })}>
                        <EditIcon style={{ color: "rgba(111, 52, 162, 1)" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="বিস্তারিত তথ্য" aria-label="add">
                      <IconButton onClick={detailsHandler({ row })}>
                        <SubjectIcon
                          style={{ color: "rgba(111, 52, 162, 1)" }}
                        />
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Upload" aria-label="add">
                      <label htmlFor="icon-button-file">
                        <Input
                          // accept="image/*"
                          id="icon-button-file"
                          name="filename"
                          onChange = {handleUpload({row})}
                          type="file"
                        />
                        <IconButton
                          aria-label="upload picture"
                          component="span"
                        >
                          <CloudUploadIcon style={{ color: 'rgba(111, 52, 162, 1)' }} />
                        </IconButton>
                      </label>
                    </Tooltip>

                    <Tooltip title="তথ্য মুছে ফেলুন" aria-label="add">
                      <IconButton
                        disabled={tableData.length > 1 ? false : true}
                        onClick={handleOpen({ row })}
                      >
                        <DeleteForeverIcon
                          style={{
                            color:
                              tableData.length > 1
                                ? "rgba(111, 52, 162, 1)"
                                : "gray",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </s.actionCon>
                </s.td> */}
              </s.tr>
            );
          })}
        </s.tbody>
      </s.table>
      <br />
      {/* <s.buttonCon>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>
        <s.navButton
          style={{
            background: !canPreviousPage
              ? "rgba(0,0,0,0.5)"
              : "rgba(111, 52, 162,1)",
          }}
          onClick={() => gotoPage(0)}
        >
          {"<<"}
        </s.navButton>
        <s.navButton
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          style={{
            background: !canPreviousPage
              ? "rgba(0,0,0,0.5)"
              : "rgba(111, 52, 162,1)",
          }}
        >
          Previous
        </s.navButton>
        <s.navButton
          onClick={() => nextPage()}
          disabled={!canNextPage}
          style={{
            background: !canNextPage
              ? "rgba(0,0,0,0.5)"
              : "rgba(111, 52, 162,1)",
          }}
        >
          Next
        </s.navButton>
        <s.navButton
          style={{
            background: !canNextPage
              ? "rgba(0,0,0,0.5)"
              : "rgba(111, 52, 162,1)",
          }}
          onClick={() => gotoPage(pageCount - 1)}
        >
          {">>"}
        </s.navButton>
      </s.buttonCon> */}
      <br />
    </s.BasicTableContainer>
  );
};

export default OfficerTable;
