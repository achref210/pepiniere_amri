import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { createRow, deleteRow, updateCol } from "../../../actions/saplings";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiBadgeCheck, BiRefresh } from "react-icons/bi";
import { ImWarning } from "react-icons/im";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { BsFillCartXFill, BsFillCartCheckFill } from "react-icons/bs";

export default function SaplingGrid(props) {
  const rows = props.sapling.stock;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowsId, setSelectedRowsId] = useState();

  const handleRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateCol(props.sapling._id, id, { key, value }));
  }, []);


  const getAge = (value, idProps) => {
    var addedDate
    props.sapling.stock.forEach((item) => {
      if (item.id === idProps)
        addedDate = new Date(item.addedAt)
    })
    var date = new Date();
    const diffTime = Math.abs(date - addedDate);
    var diff = value + Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    return diff
  }

  useEffect(async () => {

    if (selectedRowsId)
      props.setFertilizationPlanIndex(selectedRowsId[0])
  }, [selectedRowsId])

  useEffect(async () => {
    await props.sapling.stock.forEach((item) => {
      if (item.expirationDate)
        if (new Date(item.expirationDate) - new Date < 0)
          dispatch(updateCol(props.sapling._id, item.id, { key: "status", value: "Expired" }));
      if (item.releaseDate)
        if (new Date(item.releaseDate) - new Date < 0)
          dispatch(updateCol(props.sapling._id, item.id, { key: "status", value: "Releasable" }));
    })
  }, [dispatch])

  return (
    <Box
      sx={{
        height: 300,
        width: 1,
        '& .super-app-theme--cell': {
          backgroundColor: 'rgba(224, 183, 60, 0.55)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.negative': {
          backgroundColor: 'rgba(157, 255, 118, 0.49)',
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.positive': {
          backgroundColor: '#d47483',
          color: '#1a3e72',
          fontWeight: '600',
        },
      }}
    >
      <Button
        onClick={() => {
          dispatch(createRow(props.sapling._id));
        }}
      >
        <FcAddRow />
        Add Row
      </Button>
      <Button
        onClick={() => {
          dispatch(deleteRow(props.sapling._id, selectedRowsId[0]));
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
              const valueFormatted = Number(getAge(params.value, params.id)).toLocaleString();
              return `${valueFormatted} jours`;
            },
            editable: true,
          },
          /*{
            field: "length",
            headerName: "Length",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value).toLocaleString();
              return `${valueFormatted} cm`;
            },
            editable: true,
          },*/
          { field: "quantity", headerName: "Quantity", editable: true },
          {
            field: "status",
            headerName: "Status",
            editable: true,
            type: "singleSelect",
            valueOptions: ["onProgress", "Releasable", "Expired"],
            width: 120,
            renderCell: (params) => {
                return params.value==="onProgress" ?<><BiRefresh color="orange" size="20px"/><Typography color="orange" variant="h7">On Progress</Typography></>:
                  params.value==="Releasable" ? <><BiBadgeCheck size="20px" color="green" variant="h7"/><Typography color="green">Releasable</Typography></>:
                  <><ImWarning color="red"/><Typography color="red">Expired</Typography></>
              }
          },
          {
            field: "delivrable",
            headerName: "Marketing Status",
            editable: true,
            type: "boolean",
            width: 120,
            renderCell: (params) => {
                return !params.value ?<><BsFillCartXFill color="orange" size="15px"/><Typography color="orange" variant="h7">Marketable</Typography></>:
                  <><BsFillCartCheckFill size="15px" color="green" variant="h7"/><Typography color="green">Deliverable</Typography></>
              }
          },
          { field: "details", headerName: "Details", editable: true },
          {
            field: "addedAt",
            headerName: "Added At",
            editable: true,
            type: "date",
            width: 105,
          },
          {
            field: "releaseDate",
            headerName: "Release Date",
            editable: true,
            type: "date",
            width: 105,
          },
          {
            field: "expirationDate",
            headerName: "Expiration Date",
            editable: true,
            type: "date",
            width: 105,
          },
        ]}
        rows={rows}
        onSelectionModelChange={(id) => {
          setSelectedRowsId(id);
        }}
        onCellEditCommit={handleRowEditCommit}
      //autoHeight
      />
    </Box>
  );
}
