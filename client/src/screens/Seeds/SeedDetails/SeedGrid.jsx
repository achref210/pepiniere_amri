import React, { useEffect, useState } from "react";
import { Button, Card } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  selectedIdsLookupSelector,
} from "@mui/x-data-grid";
import { createRow, deleteRow, updateCol } from "../../../actions/seeds";
import { createSapling } from "../../../actions/saplings";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { color } from "@mui/system";
import { FcAddRow, FcDeleteRow } from "react-icons/fc";
import logo from '../../../assets/pelle.png'
import { Typography, Stack, TextField, Paper, Menu } from '@mui/material';

import useStyles from "./styles"
import { INITIALISE_STATE } from "../../../constants/actionTypes";

export default function SeedGrid({ seed }) {
  const rows = seed.stock;

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
    dispatch(updateCol(seed._id, id, { key, value }));
    console.log(seed._id, id, { key, value })
  }, []);

  return (
    <div style={{ height: 350, width: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <div>
          <Button
            onClick={() => {
              dispatch(createRow(seed._id));
            }}
          >
            <FcAddRow />
            Add Row
          </Button>

          {selectedRowsId && <Button
            onClick={() => {
              dispatch(deleteRow(seed._id, selectedRowsId[0]));
              setDeleted(true)
            }}
          >
            <FcDeleteRow />
            Delete Selected Row
          </Button>}
        </div>
        <div>

          {selectedRowsId && <Button
            onMouseOver={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          /*onClick={() => {
            setMode(!mode)
            console.log(seed.category==="saplings")
            console.log(seed.category==="trees")
            console.log(seed)
            //dispatch(createSapling({name:seed.name,description:seed.descriptions,selectedFile:seed.selectedFile,type:seed.type},{supplier,age:0,length:0,price:initialPrice}));
            //dispatch(deleteRow(seed._id, selectedRowsId[0]));
            /*if(seed.category==="")
             {createSeed(seedData)}
          }}*/
          >
            Planted
            <img src={logo} alt="Peel" height="25px" />
          </Button>}
          <Menu
            className="mn"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Paper
              className={`${classes.root} ${classes.paper}`}
            >
              <Stack spacing={1}>
              <TextField
                name="initialPrice"
                variant="outlined"
                label="Initial Price"
                fullWidth
                size="small"
                value={initialPrice}
                onChange={(e) =>
                  setInitialPrice(e.target.value)
                }
              />
              <TextField
                name="quantity"
                variant="outlined"
                label="Quantity"
                fullWidth
                size="small"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
              />
              <Button
              variant="contained"
                onClick={() => {
                  seed.stock.forEach((item)=>{
                    if(item.id===selectedRowsId[0])
                    {
                      if((seed.category==="saplings"))
                        dispatch(createSapling({name:seed.name,description:seed.descriptions,selectedFile:seed.selectedFile,type:seed.type},{supplier:item.supplier,age:0,length:0,quantity,price:initialPrice}));
                      else dispatch(createSapling({name:seed.name,description:seed.descriptions,selectedFile:seed.selectedFile,type:seed.type},{age:0,length:0,quantity,price:initialPrice}));
                      if(quantity<item.quantity)
                        dispatch(updateCol(seed._id, item.id, { key:"quantity", value: item.quantity-parseInt(quantity) }));
                      else dispatch(deleteRow(seed._id, selectedRowsId[0]));
                    }
                  })
                  setAnchorEl(null)
                  setDeleted(true)
                }}
              >
                submit
              </Button>
              </Stack>
            </Paper>
          </Menu>
        </div>

      </Stack>
      <DataGrid
        columns={[
          { field: "supplier", headerName: "Supplier", editable: true },
          {
            field: "weight",
            headerName: "weight",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value||0).toLocaleString();
              return `${valueFormatted} g`;
            },
            editable: true,
          },
          {
            field: "germination",
            headerName: "germination",
            valueFormatter: (params) => {
              const valueFormatted = Number(params.value||0).toLocaleString();
              return `${valueFormatted} %`;
            },
            editable: true,
          },
          { field: "purity",
          valueFormatter: (params) => {
            const valueFormatted = Number(params.value||0).toLocaleString();
            return `${valueFormatted} %`;
          }, headerName: "Purity", editable: true },
          { field: "treatment", headerName: "Treatment", editable: true },
          {
            field: "closingDate",
            headerName: "Closing Date",
            editable: true,
            type: "date",
            width: "150",
          },
          {
            field: "expiryDate",
            headerName: "Expiry Date",
            editable: true,
            type: "date",
            width: "150"
          },
          {
            field: "harvestYear",
            headerName: "Harvest Year",
            type:"data",
            width: "150",
            editable: true,
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
