import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { createRow, deleteRow, updateCol } from "../../../actions/materials";
import { createSapling } from "../../../actions/saplings";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { color } from "@mui/system";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import logo from '../../../assets/pelle.png'
import { Typography, Stack, TextField, Paper, Menu } from '@mui/material';

import useStyles from "./styles"
import { INITIALISE_STATE } from "../../../constants/actionTypes";

export default function MaterialGrid({ material }) {
  const rows = material.stock;

  const classes = useStyles();
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialPrice, setInitialPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [deleted, setDeleted] = useState();

  const [selectedRowsId, setSelectedRowsId] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateCol(material._id, id, { key, value }));
    console.log(material._id, id, { key, value })
  }, []);

  return (
    <div style={{ height: 350, width: "100%" }}>
                <Button
            onClick={() => {
              dispatch(createRow(material._id));
            }}
          >
            <FcAddRow />
            Add Row
          </Button>

          {selectedRowsId && <Button
            onClick={() => {
              dispatch(deleteRow(material._id, selectedRowsId[0]));
              setDeleted(true)
            }}
          >
            <FcDeleteRow />
            Delete Selected Row
          </Button>}
      <DataGrid
        columns={[
          { field: "supplier", headerName: "Supplier", editable: true, width:150 },
          {
            field: "quantity",
            headerName: "Quantity",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value||0).toLocaleString();
              return `${valueFormatted}`;
            },
            editable: true,
          },
          {
            field: "dimentionX",
            headerName: "Dimention X",
            type: "number",
            editable: true,
          },
          {
            field: "dimentionY",
            headerName: "Dimention Y",
            type: "number",
            editable: true,
          },
          
          { field: "quantityXY",type: "number", headerName: "Quantity XY", editable: true },
          {
            field: "cost",
            headerName: "Cost",
            editable: true,
            type: "number"
          },
          {
            field: "createdAt",
            headerName: "Added At",
            editable: true,
            type: "date",
            width: "150"
          },
        ]}
        rows={rows}
        onSelectionModelChange={(id) => {
          if (deleted) {
            setSelectedRowsId(null);
            setDeleted(false);
          }
          else
            setSelectedRowsId(id)
        }}
        onCellEditCommit={handleRowEditCommit}
      //autoHeight
      />
    </div>
  );
}
