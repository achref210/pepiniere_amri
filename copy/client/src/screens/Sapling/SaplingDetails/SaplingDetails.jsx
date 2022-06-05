import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getSapling } from "../../../actions/saplings";
import SaplingGrid from "./SaplingGrid";
import { Card, CircularProgress, Container, Paper } from "@mui/material";

const SaplingDetails = () => {
  const { sapling, saplings, isLoading } = useSelector(
    (state) => state.saplings
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { state, setState } = useState(false);
  useEffect(() => {
    dispatch(getSapling(id));
  }, [id, state]);

  if (!sapling) return null;

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
        <SaplingGrid state={state} setState={setState} sapling={sapling} />
      </Card>
    </Container>
  );
};

export default SaplingDetails;
