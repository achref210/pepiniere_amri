import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Select,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  InputAdornment,
  IconButton,
  Backdrop,
  CardActions,
  CardContent,
  Card
} from "@mui/material";

import { AiFillCloseCircle } from "react-icons/ai";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { VscQuestion } from "react-icons/vsc";

import useStyles from "./styles";
import { createMaterial, updateMaterial } from "../../../../actions/materials.js";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedRowsId, setSelectedRowsId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [stockData, setStockData] = useState({
    supplier: "",
    quantity: "",
    dimentionX: "",
    dimentionY: "",
    quantityXY: "",
    cost: "",
  });
  const [materialData, setMaterialData] = useState({
    name: "",
    selectedFile: "",
    family: "",
    category: "",
    stock: stockData,
  });

  const material = useSelector(
    (state) =>
      currentId ? state.materials.materials.find((p) => p._id === currentId) : null
    //  currentId ? state.saplings.saplings.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (material) {
      setMaterialData(material);
    }
  }, [material]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (false
      /*(!Number.isInteger(parseInt(stockData.poidsNet)) &&
        stockData.poidsNet !== "") ||
      (!Number.isInteger(parseInt(stockData.germination)) &&
        parseInt(stockData.germination) > 100 &&
        parseInt(stockData.germination) < 0 &&
        stockData.germination !== "") ||
      //si purete n'est pas un entier ou n'est pas entre 0 et 100
      ((!Number.isInteger(parseInt(stockData.purete)) ||
        parseInt(stockData.purete) > 100 ||
        parseInt(stockData.purete) < 0) &&
        stockData.purete !== "")*/
    ) {
      alert("verify your informations");
    } else {
      
      console.log("sd",closingValue,stockData)
      if (currentId) {
        dispatch(updateMaterial(currentId, materialData, stockData), navigate);
        setUpdate(true);
      } else {
        dispatch(createMaterial(materialData, stockData));

        setCreate(true);
      }
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setStockData({
      supplier: "",
      quantity: "",
      dimentionX: "",
      dimentionY: "",
      cost: "",
    });
    setMaterialData({
      name: "",
      selectedFile: "",
      family: "",
      category: "",
      stock: stockData,
    });
  };

  const [closingValue, setClosingValue] = React.useState(new Date());

  const handleClosingDateChange = (newValue) => {
    setClosingValue(newValue);
    setStockData({ ...stockData, closingDate: newValue });  };

  const [expiryValue, setExpiryValue] = React.useState(
    new Date()
  );

  const handleExpiryDateChange = (newValue) => {
    setExpiryValue(newValue);
    setStockData({ ...stockData, expiryDate: newValue });
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <form
          fullWidth
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6">{currentId ? "EDIT" : "Add"} Materials </Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={materialData.name}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setMaterialData({ ...materialData, name: e.target.value })
            }
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            value={materialData.description}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setMaterialData({ ...materialData, description: e.target.value })
            }
          />

          <Stack spacing={2} width="300px">
            <div></div>
            <FormControl >
              <InputLabel id="type_id">Family</InputLabel>
              <Select
                labelId="type_id"
                value={materialData.family}
                label="Family"
                onChange={(e) =>
                  // to avoid overriding when we set next data we use ...plantationData
                  setMaterialData({ ...materialData, family: e.target.value })
                }
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="saplings">saplings</MenuItem>
                <MenuItem value="trees">trees</MenuItem>
              </Select>
            </FormControl>
            <FormControl >
              <InputLabel id="category_id">Category</InputLabel>
              <Select
                labelId="category_id"
                value={materialData.category}
                label="Category"
                onChange={(e) =>
                  // to avoid overriding when we set next data we use ...plantationData
                  setMaterialData({ ...materialData, category: e.target.value })
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
            <div></div>
          </Stack>

          <TextField
            name="supplier"
            variant="outlined"
            label="Supplier"
            fullWidth
            value={stockData.supplier}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
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
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, quantity: e.target.value })
            }
          />
          <TextField
            name="dimentionX"
            variant="outlined"
            label="Dimention X"
            fullWidth
            value={stockData.dimentionX}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, dimentionX: e.target.value })
            }
          />
          <TextField
            name="dimentionY"
            variant="outlined"
            label="Dimention Y"
            fullWidth
            value={stockData.dimentionY}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, dimentionY: e.target.value })
            }
          />

          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setMaterialData({ ...materialData, selectedFile: base64 })
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
          <Button
            variant="contained"
            className={classes.buttonSubmit}
            color="primary"
            size="small"
            onClick={clear}
            fullWidth
          >
            clear
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Form;
