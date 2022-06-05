import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getSapling } from "../../../actions/saplings";
import SaplingGrid from "./SaplingGrid";
import FertilizationGrid from "./FertilizationGrid"
import { Card, CircularProgress, Container, Paper } from "@mui/material";

const SaplingDetails = (props) => {
  const { sapling, saplings, isLoading } = useSelector(
    (state) => state.saplings
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const { state, setState } = useState(false);
    
  const [fertilizationPlanIndex,setFertilizationPlanIndex] = useState(false);

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
  console.log(sapling.stock)

  return (
    //tableau affiche le stock

    <Container maxwidth="lg">
      <br></br>
      <Card>
        <SaplingGrid setFertilizationPlanIndex={setFertilizationPlanIndex} sapling={sapling} />
      </Card>
      <br></br>
      <Card>
        {fertilizationPlanIndex!==false && <FertilizationGrid fertilizationPlanIndex={fertilizationPlanIndex} setFertilizationPlanIndex={setFertilizationPlanIndex} sapling={sapling} refresh={props.refresh} />}
      </Card>
    </Container>
  );
};

export default SaplingDetails;
