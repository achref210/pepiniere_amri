import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getSeed } from "../../../actions/seeds";
import SeedGrid from "./SeedGrid";
import { Card, CircularProgress, Container, Paper } from "@mui/material";

import useStyles from "./styles"

const SeedDetails = () => {
  const { seed, seeds, isLoading } = useSelector(
    (state) => state.seeds
  );
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { state, setState } = useState(false);
  console.log(seed)
    
  useEffect(() => {
    dispatch(getSeed(id));
  }, [id, state]);

  if (!seed) return null;

  if (isLoading) {
    return (
      <Container maxwidth="lg">
        <br></br>
        <CircularProgress />
      </Container>
    );
  }

  return (
    //tableau affiche le stock

    <Container maxwidth="lg">
      <br></br>
      <Card>
        <SeedGrid seed={seed} />
      </Card>
    </Container>
  );
};

export default SeedDetails;
