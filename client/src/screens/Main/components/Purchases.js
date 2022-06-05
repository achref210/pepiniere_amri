import React, { useState, useEffect } from "react";
import {Container, CircularProgress, Button, Typography } from "@mui/material";
import {
  DataGrid,
} from "@mui/x-data-grid";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { getIngineerRequests } from '../../../actions/ingineerRequest';
import { color } from "@mui/system";

function format(temp){
    const date = new Date(temp);
  
    let day = String(date.getDate());
    let month = String(date.getMonth()+1);
    let year = String(date.getFullYear());
  
    if(day<10)
      day="0"+day;
    if(month<10)
      month="0"+month;
    return(String(day+"-"+month+"-"+year))
  }

export default function Purchases() {
  const dispatch = useDispatch();
  const [rowId,setRowId] = useState([]);
  useEffect(async() => {
    dispatch(getIngineerRequests());
}, [dispatch]);


  let { ingineerrequests, isLoading } = useSelector(
    (state) => state.ingineerRequests
  );
  let Purchases=[]

  let id=1
  ingineerrequests?.forEach((req)=>{
      id++
      if(req.receivedAt)
      Purchases.push({_id:req?._id,receivedAt:req?.receivedAt,name:req?.name,ingineerName:req?.ingineerName,supplier:req?.supplier,netPrice:req?.netPrice,id})
  })
  
  const rows = Purchases;
  console.log(ingineerrequests)
  console.log(rows)
  /*const handleRowEditCommit = React.useCallback((params,rows) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    dispatch(updateIngineerRequest(rows.filter(row=>row.id===id)[0]._id, { key, value }));
  }, []);*/

  if (!ingineerrequests) return <>No Purchases</>;
  
  if (isLoading) {
    return (
      <Container maxwidth="lg">
        <br></br>
        <CircularProgress />
      </Container>
    );
  }

    return (<>
      {/*<Button
            onClick={() => {
              dispatch(createRef())
            }}
          >
            <FcAddRow />
            Add Row
        </Button>*/}

          {rowId.length!==0 && <Button
            onClick={() => {
              console.log("ok")
            }}
          >
              <MdDeleteForever fill="#f8a5c2"/>
            <Typography variant="h7" color="secondary">Delete From History</Typography>
        </Button>}
      <div style={{ height: 370}}>
      <DataGrid
        columns={[  
            { field: "receivedAt",
             headerName: "receivedAt",
             valueFormatter: (params) => {
                const valueFormatted = format(params.value||0).toLocaleString();
                return `${valueFormatted}`;
              },},
          { field: "ingineerName", headerName: "Ingineer Name", width:110 },
          {
            field: "name",
            headerName: "Product",
          },
          { field: "supplier", headerName: "supplier" },
          { field: "netPrice",
             headerName: "Net Price",
             valueFormatter: (params) => {
                const valueFormatted = (params.value||0).toLocaleString();
                return `${valueFormatted} dt`;
              },},
        ]}
        initialState={{
            sorting: {
              sortModel: [{ field: 'receivedAt', sort: 'desc' }],
            },
          }}
        checkboxSelection={true}
        rows={rows}
        pageSize={5}
        //onCellKeyDown={(p,e)=>{if(e.code==="Delete") dispatch(deleteRef(rowId));}}
        onSelectionModelChange={async(id) => {
          let dRows =[]
            for(let i in id)
                dRows.push(await rows.filter(row=>row.id===id[i])[0]._id)
          setRowId(dRows)
        }}
        //onCellEditCommit={(e)=>handleRowEditCommit(e,rows)}
        //autoHeight
      /></div></>
  );
}