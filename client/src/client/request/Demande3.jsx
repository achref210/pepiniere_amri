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
  Container
} from "@mui/material";
import useStyles from "./styles";
//import { createSapling, updateSapling } from "../../../../actions/saplings.js";
import FileBase from "react-file-base64";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Divider } from "@material-ui/core";
import { Navigate, useNavigate } from "react-router-dom";

//G
const Form = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [create, setCreate] = useState(false);
  const navigate = useNavigate();

  const [demandeData, setDemandeData] = useState({
    name:"",
    type:"",
    length: "",
    price: "",
    quantity: "",
    description: "",
    delais: "",
    status:"",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    /*if (
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
      if (currentId) {
        dispatch(updateSapling(currentId, saplingData,stockData), navigate);
        setUpdate(true);
      } else {
        dispatch(createSapling(saplingData,stockData));
        setCreate(true);
      }
      clear();
    }*/
  };

  const clear = () => {
    setDemandeData({
        name:"",
        type:"",
        length: "",
        price: "",
        quantity: "",
        description: "",
        delais: "",
        status:"",
    });
  };

  return (
  <div className={classes.title1}>
  <Container component="main" maxWidth="md">
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          Demande Planting
        </Typography>
        <TextField
          name="name"
          variant="outlined"
          label="name"
          fullWidth
          value={demandeData.name}
          onChange={(e) =>
            // to avoid overriding when we set next data we use ...SaplingData
            setDemandeData({ ...demandeData, name: e.target.value })
          }
        />
        <TextField
          name="quantity"
          variant="outlined"
          label="Quantity"
          fullWidth
          value={demandeData.quantity}
          onChange={(e) =>
            setDemandeData({ ...demandeData, quantity: e.target.value })
          }
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
          value={demandeData.length}
          onChange={(e) =>
            setDemandeData({ ...demandeData, length: e.target.value })
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
          value={demandeData.price}
          onChange={(e) =>
            setDemandeData({ ...demandeData, price: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id="type_id">Type</InputLabel>
          <Select
            fullWidth
            labelId="type_id"
            value={demandeData.type}
            label="Type"
            onChange={(e) =>
              // to avoid overriding when we set next data we use ...plantationData
              setDemandeData({ ...demandeData, type: e.target.value })
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
        <div className={classes.divider}/>
        <Button
          variant="contained"
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
                Your demande was sended <strong> Thanks for sending us</strong>
            </Alert>
          </Snackbar>
        )}
      </form>
    </Paper>
    </Container>
    </div>
  );
};

export default Form;