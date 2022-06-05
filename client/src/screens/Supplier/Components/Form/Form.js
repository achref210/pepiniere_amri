import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import useStyles from "./styles";
import { createSupplier, updateSupplier } from "../../../../actions/suppliers.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";

//G
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const [supplierData, setSupplierData] = useState({
    name: "",
    adress: "",
    phoneNumber: "",
    selectedFile: "",
    saplings:[],
    seeds:[],
    materials:[]
  });

  const supplier = useSelector(
    (state) =>
      currentId
        ? state.suppliers.suppliers.find((p) => p._id === currentId)
        : null
    //  currentId ? state.saplings.saplings.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (supplier) {
      setSupplierData(supplier);
    }
  }, [supplier]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
      if (currentId) {
        dispatch(updateSupplier(currentId, supplierData));
        setUpdate(true);
      } else {
          console.log(supplierData)
        dispatch(createSupplier(supplierData));
        setCreate(true);
      }
      clear();
    
  };
  const clear = () => {
    setCurrentId(null);
    setSupplierData({
        name: "",
        adress: "",
        phoneNumber: "",
        saplings:[],
        seeds:[],
        materials:[]
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "EDIT" : "Add"} Supplier
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="name"
          fullWidth
          value={supplierData.name}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setSupplierData({ ...supplierData, name: e.target.value })
          }
        />
        <TextField
          name="adress"
          variant="outlined"
          label="adress"
          fullWidth
          value={supplierData.adress}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setSupplierData({ ...supplierData, adress: e.target.value })
          }
        />
        <TextField
          name="phoneNumber"
          variant="outlined"
          label="phoneNumber"
          fullWidth
          value={supplierData.phoneNumber}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setSupplierData({ ...supplierData, phoneNumber: e.target.value })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setSupplierData({ ...supplierData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          submit
        </Button>
        <Divider variant="middle" />
        <Button
          variant="contained"
          className={classes.buttonSubmit}
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
        {create && (
          <Snackbar
            open={create}
            autoHideDuration={2000}
            onClose={() => setCreate(false)}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              The supplier was added — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
        {update && (
          <Snackbar
            open={update}
            autoHideDuration={5000}
            onClose={() => setUpdate(false)}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              The supplier was updated — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </form>
    </Paper>
  );
};

export default Form;