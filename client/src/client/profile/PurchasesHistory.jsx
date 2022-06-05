import React, { useState, useEffect } from "react";
import {Container, CircularProgress, Button, Stack } from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { getRefs , updateRef, createRef, deleteRef } from "../../actions/seeds";


export default function PurchasesHistory() {
  const dispatch = useDispatch();
  const [rowId,setRowId] = useState(null);
  useEffect(async() => {
    dispatch(getRefs());
  }, []);
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
          {rowId && <Button
            onClick={() => {
              dispatch(deleteRef(rowId));
            }}
          >
            <FcDeleteRow />
            Delete Selected Row
          </Button>}
          <div style={{ height: 400,width: window.innerWidth>1700?window.innerWidth-800:window.innerWidth-300}}>
      <DataGrid
        columns={[   
          { field: "name", headerName: "Product", editable: true },
          {
            field: "quantity",
            headerName: "Quantity",
            editable: true,
          },
          { field: "weight", headerName: "Weight", editable: true },
        ]}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              You Have No Purchases!
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              No Purchases with this specifications
            </Stack>
          )
        }}
        rows={rows}
        pageSize={5}
        checkboxSelection={true}
        onCellKeyDown={(p,e)=>{if(e.code==="Delete") dispatch(deleteRef(rowId));}}
        onSelectionModelChange={(id) => {
          if(id[0])
          setRowId(rows.filter(row=>row.id===id[0])[0]._id)
        }}
        //autoHeight
      /></div></>
  );
}