import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
  TextField,
  Paper,
} from "@mui/material";
// import a hook
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getSuppliers } from "../../actions/suppliers";
//import Form from "./Components/Form/Form";
//import Suppliers from "./Components/Suppliers/Suppliers";
import useStyles from "./styles";
import Suppliers from "./Components/Suppliers/Suppliers";
import Form from "./Components/Form/Form";

const Supplier = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suppliers, isLoading } = useSelector((state) => state.suppliers);

  useEffect(async () => {
    dispatch(getSuppliers());
  }, [currentId]);

  return (
    <div className="s">
    <Grow in>
      <Container maxwidth="xl">
      <Grid container justify="space-between" alignItems="stretch">
      <Grid item xs={12} sm={8}>
            <Suppliers currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
    </div>
  );
};

export default Supplier;
