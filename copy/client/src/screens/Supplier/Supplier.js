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

import { useDispatch } from "react-redux";
import { getSuppliers } from "../../actions/suppliers";
import Form from "./Components/Form/Form";
import Suppliers from "./Components/Saplings/Suppliers";
import useStyles from "./styles";

const Sapling = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { suppliers, isLoading } = useSelector((state) => state.suppliers);

  useEffect(async () => {
    dispatch(getSuppliers());
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container maxwidth="xl">
        <Grid container justify="space-between" alignItems="stretch">
          <Grid item xs={6}></Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Sapling;
