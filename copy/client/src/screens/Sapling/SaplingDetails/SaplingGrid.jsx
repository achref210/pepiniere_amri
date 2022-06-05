import * as React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { createRow, deleteRow, updateCol } from "../../../actions/saplings";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { color } from "@mui/system";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";

export default function SaplingGrid(props) {
  const rows = props.sapling.stock;
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowsId, setSelectedRowsId] = useState();

  const handleRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateCol(props.sapling._id, id, { key, value }));
  }, []);

  return (
    <div style={{ height: 250, width: "100%" }}>
      <Button
        onClick={() => {
          dispatch(createRow(props.sapling._id));
          setTimeout(navigate(`/Products/${props.sapling._id}`), 1000);
        }}
      >
        <FcAddRow />
        Add Row
      </Button>
      <Button
        onClick={() => {
          dispatch(deleteRow(props.sapling._id, selectedRowsId[0]));
          setTimeout(navigate(`/Products/${props.sapling._id}`), 1000);
        }}
      >
        <FcDeleteRow />
        Delete Selected Row
      </Button>
      <DataGrid
        columns={[
          { field: "supplier", headerName: "Supplier", editable: true },
          {
            field: "age",
            headerName: "Age",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} jours`;
            },
            editable: true,
          },
          {
            field: "length",
            headerName: "Length",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} cm`;
            },
            editable: true,
          },
          {
            field: "price",
            headerName: "Price",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} dt`;
            },
            editable: true,
          },
          { field: "quantity", headerName: "Quantity", editable: true },
          {
            field: "addedAt",
            headerName: "Added At",
            editable: true,
            type: "date",
          },
          { field: "details", headerName: "Details", editable: true },
        ]}
        rows={rows}
        onSelectionModelChange={(id) => {
          setSelectedRowsId(id);
        }}
        onCellEditCommit={handleRowEditCommit}
      />
    </div>
  );
}
