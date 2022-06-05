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
} from "@mui/material";

import Stack from "@mui/material/Stack";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import useStyles from "./styles";
import { createSeed, updateSeed } from "../../../../actions/seeds.js";
import FileBase from "react-file-base64";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const [stockData, setStockData] = useState({
    supplier: "",
    poidsNet: "",
    anneeReccolte: "",
    germination: "",
    traitement: "",
    dateFermeture: "",
    datePeremption: "",
    purete: "",
  });
  const [seedData, setSeedData] = useState({
    name: "",
    description: "",
    selectedFile: "",
    type: "",
    stock: [stockData],
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
    setStockData({ ...stockData, fermeture: fermetureValue });
    setStockData({ ...stockData, peremption: peremptionValue });
    e.preventDefault();
    if (
      (!Number.isInteger(parseInt(stockData.poidsNet)) &&
        stockData.poidsNet !== "") ||
      (!Number.isInteger(parseInt(stockData.germination)) &&
        parseInt(stockData.germination) > 100 &&
        parseInt(stockData.germination) < 0 &&
        stockData.germination !== "") ||
      //si purete n'est pas un entier ou n'est pas entre 0 et 100
      ((!Number.isInteger(parseInt(stockData.purete)) ||
        parseInt(stockData.purete) > 100 ||
        parseInt(stockData.purete) < 0) &&
        stockData.purete !== "")
    ) {
      alert("verify your informations");
    } else {
      if (currentId) {
        dispatch(updateSeed(currentId, seedData), navigate);
        setUpdate(true);
      } else {
        dispatch(createSeed(seedData));

        setCreate(true);
      }
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setStockData({
      supplier: "",
      createdAt: "",
      poidsNet: "",
      anneeReccolte: "",
      germination: "",
      traitement: "",
      dateFermeture: "",
      datePeremption: "",
      purete: "",
    });
    setSeedData({
      name: "",
      description: "",
      selectedFile: "",
      type: "",
      stock: stockData,
    });
  };

  const [fermetureValue, setFermetureValue] = React.useState(new Date());

  const handleFermetureChange = (newValue) => {
    setFermetureValue(newValue);
  };

  const [peremptionValue, setPeremptionValue] = React.useState(
    new Date("2022-04-18T21:11:54")
  );

  const handlePeremptionChange = (newValue) => {
    setPeremptionValue(newValue);
  };

  return (
    <Paper className={classes.paper}>
      <form
        fullWidth
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? "EDIT" : "Add"} Seeds</Typography>
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
          name="germination"
          variant="outlined"
          label="Germination"
          fullWidth
          value={stockData.germination}
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
          name="poidsNet"
          variant="outlined"
          label="Poids Net"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="primary">g</Typography>
              </InputAdornment>
            ),
          }}
          fullWidth
          value={stockData.poidsNet}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...plantationData
            setStockData({ ...stockData, poidsNet: e.target.value })
          }
        />
        <TextField
          name="purete"
          variant="outlined"
          label="Purete"
          fullWidth
          value={stockData.purete}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography color="primary">%</Typography>
              </InputAdornment>
            ),
          }}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...plantationData
            setStockData({ ...stockData, purete: e.target.value })
          }
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Stack spacing={1} className={classes.date}>
            <DesktopDatePicker
              label="Date Fermeture"
              inputFormat="MM/dd/yyyy"
              value={fermetureValue}
              onChange={handleFermetureChange}
              // to avoid overriding when we set next data we use ...plantationData
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              label="Date Peremption"
              inputFormat="MM/dd/yyyy"
              value={peremptionValue}
              onChange={handlePeremptionChange}
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
        <FormControl fullWidth>
          <InputLabel id="type_id">Type</InputLabel>
          <Select
            fullWidth
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
            <MenuItem value="decoration">decoration</MenuItem>
            <MenuItem value="vegetables">vegetables</MenuItem>
            <MenuItem value="fruits">fruits</MenuItem>
          </Select>
        </FormControl>
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
  );
};

export default Form;
