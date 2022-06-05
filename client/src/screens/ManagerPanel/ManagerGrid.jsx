import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { color } from "@mui/system";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import { updateUser } from "../../actions/users";

export default function ManagerGrid(props) {
  const rows = props.users;
  const date = new Date();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRowsId, setSelectedRowsId] = useState();

  const handleRowEditCommit = React.useCallback((params) => {
    const id = params.id;
    const key = params.field;
    const value = params.value;
    console.log(id,key,value)
    dispatch(updateUser(rows.filter(row=>row.id===id)[0]._id, { key, value }));
  }, []);
  
    return (
        <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        columns={[   
          { field: "firstName", headerName: "First Name", editable: false },
          { field: "lastName", headerName: "Last Name", editable: false },
          {
            field: "email",
            headerName: "Email",
            editable: false,
            width:'200'
          },
          { field: "adress", headerName: "Adress", editable: false },
          { field: "phoneNumber",           valueFormatter: (params) => {
            const valueFormatted = Number(params.value).toLocaleString();
            return `+216 ${valueFormatted}`;
          },width:"150" ,headerName: "Phone Number", editable: false },
          { field:"credit", headerName: "Credit", type: 'number', editable: true },
          { field: "role", headerName: "Role",type: "singleSelect",
          valueOptions: ["Secretary", "Engineer", "Admin"], editable: true },
        ]}
        rows={rows}
        onSelectionModelChange={(id) => {
          setSelectedRowsId(id);
        }}
        onCellEditCommit={handleRowEditCommit}
        //autoHeight
      /></div>
  );
}
