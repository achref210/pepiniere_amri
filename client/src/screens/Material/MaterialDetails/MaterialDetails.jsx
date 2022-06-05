import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getMaterial } from "../../../actions/materials";
import MaterialGrid from "./MaterialGrid";
import { Card, CircularProgress, Container, Paper } from "@mui/material";

import useStyles from "./styles"

const MaterialDetails = () => {
  const { material, isLoading } = useSelector(
    (state) => state.materials
  );
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { state, setState } = useState(false);
  console.log(material)
    
  useEffect(() => {
    dispatch(getMaterial(id));
  }, [id, state]);

  if (!material) return null;

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
        <MaterialGrid material={material} />
      </Card>
    </Container>
  );
};

export default MaterialDetails;
