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

import References from "./References/References"

import useStyles from "./styles";
import { createSeed, updateSeed } from "../../../../actions/seeds.js";
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
    weight: "",
    harvestYear: "",
    germination: "",
    traitement: "",
    closingDate: "",
    expiryDate: "",
    purity: "",
  });
  const [seedData, setSeedData] = useState({
    name: "",
    description: "",
    selectedFile: "",
    type: "",
    category: "",
    stock: stockData,
  });

  const seed = useSelector(
    (state) =>
      currentId ? state.seeds.seeds.find((p) => p._id === currentId) : null
    //  currentId ? state.saplings.saplings.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (seed) {
      setSeedData(seed);
    }
  }, [seed]);

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
      if (currentId) {
        dispatch(updateSeed(currentId, seedData));
        setUpdate(true);
      } else {
        dispatch(createSeed(seedData, stockData));

        setCreate(true);
      }
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setStockData({
      supplier: "",
      weight: "",
      harvestYear: "",
      germination: "",
      traitement: "",
      closingDate: "",
      expiryDate: "",
      purity: "",
    });
    setSeedData({
      name: "",
      description: "",
      selectedFile: "",
      type: "",
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
          <Typography variant="h6">{currentId ? "EDIT" : "Add"} Seeds <IconButton onClick={() => setOpen(true)}><VscQuestion /></IconButton></Typography>
          <TextField
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={seedData.name}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setSeedData({ ...seedData, name: e.target.value })
            }
          />
          <TextField
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            value={seedData.description}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setSeedData({ ...seedData, description: e.target.value })
            }
          />

          <Stack spacing={2} width="300px">
            <div></div>
            <FormControl >
              <InputLabel id="type_id">Type</InputLabel>
              <Select
                labelId="type_id"
                value={seedData.type}
                label="Type"
                onChange={(e) =>
                  // to avoid overriding when we set next data we use ...plantationData
                  setSeedData({ ...seedData, type: e.target.value })
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
                value={seedData.category}
                label="Category"
                onChange={(e) =>
                  // to avoid overriding when we set next data we use ...plantationData
                  setSeedData({ ...seedData, category: e.target.value })
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
            name="weight"
            variant="outlined"
            label="Weight"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography color="primary">g</Typography>
                </InputAdornment>
              ),
            }}
            fullWidth
            value={stockData.weight}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, weight: e.target.value })
            }
          />
          <TextField
            name="purity"
            variant="outlined"
            label="Purity"
            fullWidth
            value={stockData.purete}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography color="primary">%</Typography>
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, purity: e.target.value })
            }
          />
          <TextField
            name="germination"
            variant="outlined"
            label="Germination"
            fullWidth
            value={stockData.germination}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography color="primary">%</Typography>
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, germination: e.target.value })
            }
          />
          <TextField
            name="traitement"
            variant="outlined"
            label="Traitement"
            fullWidth
            value={stockData.traitement}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, traitement: e.target.value })
            }
          />
          <TextField
            name="harvestYear"
            variant="outlined"
            label="Harvest Year"
            fullWidth
            value={stockData.harvestYear}
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setStockData({ ...stockData, harvestYear: e.target.value })
            }
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={1} width={400} className={classes.date}>
              <DesktopDatePicker
                label="Closing Date"
                inputFormat="MM/dd/yyyy"
                value={closingValue}
                onChange={handleClosingDateChange}
                // to avoid overriding when we set next data we use ...plantationData
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Expiry Date"
                inputFormat="MM/dd/yyyy"
                value={expiryValue}
                onChange={handleExpiryDateChange}
                // to avoid overriding when we set next data we use ...plantationData
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setSeedData({ ...seedData, selectedFile: base64 })
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Card sx={{ maxHeight: 400 }}>
          <CardActions>
            <div className={classes.flex_end}>
              <IconButton onClick={() => setOpen(false)}>
                <AiFillCloseCircle color="green" />
              </IconButton>
            </div>
          </CardActions>
          <CardContent>
            <References />
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default Form;
