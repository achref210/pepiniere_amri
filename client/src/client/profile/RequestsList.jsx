import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Button, Stack } from "@mui/material";
import TypeAnimation from 'react-type-animation';
import {
  DataGrid,
} from "@mui/x-data-grid";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
//import { getRefs , updateRequest, createRef, deleteRequest } from "../../actions/seeds";
import { getUserRequests, updateRequest, deleteRequest } from "../../actions/requests";

export default function RequestsList() {
  const dispatch = useDispatch();
  const [rowId, setRowId] = useState(null);
  useEffect(async () => {
    dispatch(getUserRequests());
  }, []);

  let { userrequests, isLoading } = useSelector(
    (state) => state.requests
  );
  let indexedRefs = []

  let id = 1
  userrequests.forEach((ref) => {
    id++
    indexedRefs.push({ _id: ref?._id, status:ref?.status, limitDate: ref?.limitDate, description: ref?.description, createdAt:ref?.createdAt, name: ref?.name, age: ref?.age, quantity: ref?.quantity, type: ref?.type, price: ref?.price, id })
  })

  const rows = indexedRefs;

  const handleRowEditCommit = React.useCallback((params, rows) => {
    console.log(params)
    const id = params.id;
    const key = params.field;
    const value = params.value;
    rows.filter(row => row.id === id)[0].status = "changed"
    dispatch(updateRequest(rows.filter(row => row.id === id)[0]._id, { key, value }));
  }, []);

  if (!userrequests) return null;

  if (isLoading) {
    return (
      <Container maxwidth="lg">
        <br></br>
        <CircularProgress />
      </Container>
    );
  }

  return (<>
    <div style={{ height: 400, width: window.innerWidth - 800 }}>
      <DataGrid
        columns={[
          { field: "name", headerName: "Product", editable: true },
          {
            field: "type",
            headerName: "Type",
            editable: true,
            type: "singleSelect",
            valueOptions: ["saplings", "trees"],
            width:80
          },
          {
            field: "quantity",
            headerName: "Quantity",
            editable: true,
            width:80
          },
          { field: "age", headerName: "Age", valueFormatter: (params) => {
            const valueFormatted = Number(params.value||0).toLocaleString();
            return `${valueFormatted} jours`;
          }, editable: true },
          { field: "price", width:80, headerName: "Price", valueFormatter: (params) => {
            const valueFormatted = Number(params.value||0).toLocaleString();
            return `${valueFormatted} dt`;
          }, editable: true },
          {field: "description", headerName: "Description", editable: true },
          {field: "createdAt", headerName: "Requested At", width:105, type:"date", editable: false },
          {field: "limitDate", headerName: "Limit Date", width:105, type:"date", editable: true  },
          {field: "status", headerName: "Status",width:80, editable: false },
          { field: "delete", width:75, headerName: "", renderCell: (params) => {return <Button onClick={()=>dispatch(deleteRequest(rowId))}><FcDeleteRow /></Button>}}
        ]}
        pageSize={5}
        rows={rows}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              You Have No Requests!
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No Requests with this specifications
            </Stack>
          )
        }}
        onCellKeyDown={(p, e) => { if (e.code === "Delete") dispatch(deleteRequest(rowId)); }}
        onSelectionModelChange={(id) => {
          if (id[0])
            setRowId(rows.filter(row => row.id === id[0])[0]._id)
        }}
        onCellEditCommit={(e) => handleRowEditCommit(e, rows)}
      //autoHeight
      /></div></>
  );
}