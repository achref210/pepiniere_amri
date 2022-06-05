import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  AlertTitle,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  MenuItem,
  FormControlLabel,
  Tooltip,
  IconButton,
  Checkbox
} from "@mui/material";
import useStyles from "./styles";
import refresh from '../../../../assets/icons/refresh.png'
import { createSapling, updateSapling } from "../../../../actions/saplings.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";

import { refreshProducts } from "../../../../actions/products";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

//G
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const [stockData, setStockData] = useState({
    supplier: "",
    age: "",
    releaseDate:"",
    expirationDate:"",
    details: "",
    quantity: "",
  });
  const [saplingData, setSaplingData] = useState({
    name: "",
    description: "",
    category: "",
    sub_category: "",
    price: "",
    selectedFile: ""
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
    if (false
      /*(!Number.isInteger(parseInt(stockData.age)) && stockData.age !== "") ||
      (!Number.isInteger(parseInt(stockData.quantity)) &&
        stockData.quantity !== "") ||
      (!Number.isInteger(parseInt(stockData.length)) &&
        stockData.length !== "") ||
      (!Number.isInteger(parseInt(stockData.price)) &&
        stockData.price !== "") ||
      saplingData.name === ""*/
    ) {
      alert("verify your informations");
    } else {
      if (currentId) {
        dispatch(updateSapling(currentId, saplingData,stockData), navigate);
        setUpdate(true);
      } else {
        dispatch(createSapling(saplingData,stockData));
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
      details: "",
      quantity: "",
    });
    setSaplingData({
      name: "",
      price: "",
      description: "",
      selectedFile: "",
      category: "",
      sub_category: "",
    });
  };

  const [expirationValue, setExpirationValue] = React.useState(new Date());

  const handleExpirationChange = (newValue) => {
    setExpirationValue(newValue);
    setStockData({ ...stockData, expirationDate: newValue });
  };

  const [releaseValue, setReleaseValue] = React.useState(
    new Date()
  );

  const handleReleaseChange = async (newValue) => {
    setReleaseValue(newValue);
    setStockData({ ...stockData, releaseDate: newValue });
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
          {currentId ? "EDIT" : "Add"} Spaling <Tooltip title="Refresh Stock"><IconButton onClick={()=>dispatch(refreshProducts())} children={<img src={refresh} alt="refresh"/>}/></Tooltip>
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
          value={saplingData.price}
          onChange={(e) =>
            setSaplingData({ ...saplingData, price: e.target.value })
          }
        />
        {!currentId && <TextField
          name="supplier"
          variant="outlined"
          label="supplier"
          fullWidth
          value={stockData.supplier}
          onChange={(e) =>
            setStockData({ ...stockData, supplier: e.target.value })
          }
        />}
        {!currentId && <TextField
          name="quantity"
          variant="outlined"
          label="Quantity"
          fullWidth
          value={stockData.quantity}
          onChange={(e) =>
            setStockData({ ...stockData, quantity: e.target.value })
          }
        />}
        {!currentId && <TextField
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
        />}

        {!currentId && <TextField
          name="details"
          variant="outlined"
          label="details"
          fullWidth
          value={saplingData.details}
          onChange={(e) =>
            setSaplingData({ ...saplingData, details: e.target.value })
          }
        />}
          {!currentId && <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1} width={320} className={classes.date}>
              <DesktopDatePicker

                label="Release Date"
                inputFormat="MM/dd/yyyy"
                value={releaseValue}
                onChange={handleReleaseChange}
                // to avoid overriding when we set next data we use ...plantationData
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Expiration Date"
                inputFormat="MM/dd/yyyy"
                value={expirationValue}
                onChange={handleExpirationChange}
                // to avoid overriding when we set next data we use ...plantationData
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>}
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setSaplingData({ ...saplingData, selectedFile: base64 })
            }
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="category_id">Category</InputLabel>
          <Select
            fullWidth
            labelId="category_id"
            value={saplingData.category}
            label="category"
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setSaplingData({ ...saplingData, category: e.target.value })
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="decoration">decoration</MenuItem>
            <MenuItem value="vegetables">vegetables</MenuItem>
            <MenuItem value="fruits">fruits</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel control={<Checkbox onChange={(e)=>{e.target.checked? setStockData({...stockData,delivrable:"true"}):setStockData({...stockData,delivrable:"false"})}} />} label="Delivrable" />
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
