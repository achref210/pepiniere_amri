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
import { createSapling, updateSapling } from "../../../../actions/saplings.js";
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

  const [stockData, setStockData] = useState({
    supplier: "",
    age: "",
    length: "",
    price: "",
    details: "",
    quantity: "",
  });
  const [saplingData, setSaplingData] = useState({
    name: "",
    description: "",
    selectedFile: "",
    stock: [],
  });

  const sapling = useSelector(
    (state) =>
      currentId
        ? state.saplings.saplings.find((p) => p._id === currentId)
        : null
    //  currentId ? state.saplings.saplings.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (sapling) {
      setSaplingData(sapling);
    }
  }, [sapling]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (!Number.isInteger(parseInt(stockData.age)) && stockData.age !== "") ||
      (!Number.isInteger(parseInt(stockData.quantity)) &&
        stockData.quantity !== "") ||
      (!Number.isInteger(parseInt(stockData.length)) &&
        stockData.length !== "") ||
      (!Number.isInteger(parseInt(stockData.price)) &&
        stockData.price !== "") ||
      saplingData.name === ""
    ) {
      alert("verify your informations");
    } else {
      setSaplingData({
        ...saplingData,
        stock: [{ stockData }],
      });
      if (currentId) {
        dispatch(updateSapling(currentId, saplingData), navigate);
        setUpdate(true);
      } else {
        dispatch(createSapling(saplingData));

        setCreate(true);
      }
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setStockData({
      supplier: "",
      age: "",
      length: "",
      price: "",
      details: "",
      quantity: "",
    });
    setSaplingData({
      name: "",
      description: "",
      selectedFile: "",
      stock: stockData,
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
          {currentId ? "EDIT" : "Add"} Spaling
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="name"
          fullWidth
          value={saplingData.name}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setSaplingData({ ...saplingData, name: e.target.value })
          }
        />
        <TextField
          name="description"
          variant="outlined"
          label="description"
          fullWidth
          value={saplingData.description}
          onChange={(e) =>
            setSaplingData({ ...saplingData, description: e.target.value })
          }
        />
        <TextField
          name="supplier"
          variant="outlined"
          label="supplier"
          fullWidth
          value={stockData.supplier}
          onChange={(e) =>
            setStockData({ ...stockData, supplier: e.target.value })
          }
        />
        <TextField
          name="quantity"
          variant="outlined"
          label="Quantity"
          fullWidth
          value={stockData.quantity}
          onChange={(e) =>
            setStockData({ ...stockData, quantity: e.target.value })
          }
        />
        <TextField
          name="age"
          variant="outlined"
          label="Age"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="primary">j</Typography>
              </InputAdornment>
            ),
          }}
          value={stockData.age}
          onChange={(e) => setStockData({ ...stockData, age: e.target.value })}
        />
        <TextField
          name="length"
          variant="outlined"
          label="Length"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="primary">cm</Typography>
              </InputAdornment>
            ),
          }}
          value={stockData.length}
          onChange={(e) =>
            setStockData({ ...stockData, length: e.target.value })
          }
        />
        <TextField
          name="price"
          variant="outlined"
          label="Price"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="primary">dt</Typography>
              </InputAdornment>
            ),
          }}
          value={stockData.price}
          onChange={(e) =>
            setStockData({ ...stockData, price: e.target.value })
          }
        />

        <TextField
          name="details"
          variant="outlined"
          label="details"
          fullWidth
          value={saplingData.details}
          onChange={(e) =>
            setSaplingData({ ...saplingData, details: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setSaplingData({ ...saplingData, selectedFile: base64 })
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
              The sapling was added — <strong>check it out!</strong>
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
              The sapling was updated — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        )}
      </form>
    </Paper>
  );
};

export default Form;
