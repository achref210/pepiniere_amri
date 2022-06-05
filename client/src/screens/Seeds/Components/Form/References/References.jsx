import React, { useState, useEffect } from "react";
import {Container, CircularProgress, Button } from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getRefs , updateRef, createRef, deleteRef } from "../../../../../actions/seeds";


export default function References() {
  const dispatch = useDispatch();
  const [rowId,setRowId] = useState(null);
  useEffect(async() => {
    dispatch(getRefs());
  }, [dispatch]);

  let { refs, isLoading } = useSelector(
    (state) => state.seeds
  );
  let indexedRefs=[]

  let id=1
  refs.forEach((ref)=>{
      id++
      indexedRefs.push({_id:ref?._id,name:ref?.name,quantity:ref?.quantity,weight:ref?.weight,id})
  })

  const rows = indexedRefs;

  const handleRowEditCommit = React.useCallback((params,rows) => {
    console.log(params)
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateRef(rows.filter(row=>row.id===id)[0]._id, { key, value }));
  }, []);

  if (!refs) return null;
  
  if (isLoading) {
    return (
      <Container maxwidth="lg">
        <br></br>
        <CircularProgress />
      </Container>
    );
  }

    return (<>
      <Button
            onClick={() => {
              dispatch(createRef())
            }}
          >
            <FcAddRow />
            Add Row
          </Button>

          {rowId && <Button
            onClick={() => {
              dispatch(deleteRef(rowId));
            }}
          >
            <FcDeleteRow />
            Delete Selected Row
          </Button>}
        <div style={{ height: 400,width: 350}}>
      <DataGrid
        columns={[   
          { field: "name", headerName: "Name", editable: true },
          {
            field: "quantity",
            headerName: "Quantity",
            editable: true,
          },
          { field: "weight", headerName: "Weight", editable: true },
        ]}
        rows={rows}
        onCellKeyDown={(p,e)=>{if(e.code==="Delete") dispatch(deleteRef(rowId));}}
        onSelectionModelChange={(id) => {
          if(id[0])
          setRowId(rows.filter(row=>row.id===id[0])[0]._id)
        }}
        onCellEditCommit={(e)=>handleRowEditCommit(e,rows)}
        //autoHeight
      /></div></>
  );
}