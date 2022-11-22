import React, { useState, useEffect, useMemo } from "react";
import * as s from "./BasicSortingTable.style";
import {  Tooltip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SubjectIcon from "@mui/icons-material/Subject";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTable, useSortBy, usePagination } from "react-table";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { ColumnData } from "./ColumnData";
import { getAllUsers } from "../../../Auth/httprequests.js";
import { deleteUsers } from "../../../Auth/httprequests.js";

const defaultValue = [
  {
    name: "Loading..",
    email: "Loading..",
    phone: "Loading..",
    type: "Loading..",
  },
];

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


const BasicSortingTable = (props) => {
  const [tableData, setTableData] = useState([defaultValue]);
  const [id, setId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getAllUsers().then((response) => {
      setTableData(response.data.data) 
    });
  }, []);

  const handleOpen = (data) => () => {
    setOpen(true);
    setId(data.row.original.id);
  };

  const deleteHandler = (data) => () => {
    deleteUsers(data.id).then((res) => {
      if (res.data.success === 1) {
        window.location.reload();
      }
    });
  };

  const handleChange = (event) => {
    // setStates({ ...states, [event.target.name]: event.target.checked });
  };

  const handleClick = (data) => () => {
    // const id = data.row.values.id;
    // const status = data.row.values.status;
    // axios
    //   .patch(`/tickets/status/${data.row.values.ticketNumber}`)
    //   .then((res) => {
    //     document.location.reload(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  const editHandler = (data) => () => {
    // props.props.history.push(`/edittickets/${data.row.original.ticketNumber}`);
  };

  const detailsHandler = (data) => () => {
    // props.props.history.push(
    //   `/ticketdetails/${data.row.original.ticketNumber}`
    // );
  };

  const data = tableData;
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
      data: data,
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <s.BasicTableContainer>

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "10px" }}>
          <div>
            <div>
              <p style={{ textAlign: "center" , color: 'purple'}}>
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

      <s.showSize>
        Rows per Page:
        <select
          style={{ width: "50px", border: "1px solid black" }}
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize, index) => (
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
              {/* <s.th></s.th> */}
            </s.tr>
          ))}
        </s.thead>

        <s.tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <s.tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return <s.td key={index}>{cell.render("Cell")}</s.td>;
                })}
                {/* <s.td> */}
                  {/* <s.actionCon>
                    <Tooltip title="Edit" aria-label="add">
                      <s.edit onClick={editHandler({ row })}>
                        <EditIcon style={{ color: "rgba(111, 52, 162, 1)" }} />
                      </s.edit>
                    </Tooltip>
                    <Tooltip title="Details" aria-label="add">
                      <s.del onClick={detailsHandler({ row })}>
                        <SubjectIcon
                          style={{ color: "rgba(111, 52, 162, 1)" }}
                        />
                      </s.del>
                    </Tooltip>

                    <Tooltip title="Upload" aria-label="add">
                      <s.del onClick={deleteHandler({ row })}>
                        <CloudUploadIcon
                          style={{ color: "rgba(111, 52, 162, 1)" }}
                        />
                      </s.del>
                    </Tooltip>

                    <Tooltip title="Delete" aria-label="add">
                      <s.del onClick={handleOpen({ row })}>
                        <DeleteForeverIcon
                          style={{ color: "rgba(111, 52, 162, 1)" }}
                        />
                      </s.del>
                    </Tooltip>
                  </s.actionCon> */}
                {/* </s.td> */}
              </s.tr>
            );
          })}
        </s.tbody>
      </s.table>
      <br />
      <s.buttonCon>
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
      </s.buttonCon>
      <br />
    </s.BasicTableContainer>
  );
};

export default BasicSortingTable;
