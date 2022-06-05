import React, { forwardRef, useRef, useImperativeHandle } from "react";
import ReactToPrint from "react-to-print";
import PropTypes from "prop-types";
import { useReactToPrint } from "react-to-print";
import { Button, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SpanningTable from "./partials/EmpTable";
import employers from "../../../../../../reducers/employers";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

class ComponentToPrint extends React.Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item>
              {" "}
              <br />
              7180, HABIB THAMER, SERS
              <br />
              <br />
              <b>Matricule Fiscal: 1489823/A</b>
              <br />
              <b>Code TVA: N</b>
              <br />
              <b>Code Catégorie: M</b>
              <br />
              <b>Raison Sociale: ALMANBET</b>
            </Item>
            <Container>
              <div className="emp">
                {/*Le matricule du salarié dans l'entreprise (en général ce dernier est déterminé par ordre d'arrivée dans l'effectif);*/}
                <br />
                <b>Matricule:</b>
                {/*L'emploi ou poste occupé*/}
                <br />
                <b>Emploi:</b>
                {/*La date d'entrée du salarié;*/}
                <br />
                <b>Entrée le:</b>
                {/*La qualification du salarié;*/}
                <br />
                <b>Qualification:</b>
                {/*La classification du salarié coef*/}
                <br />
                <b>Coefficient:</b>
                {/*Le montant du plafond de sécurité sociale en vigueur lors de l'établissement de la fiche de paie;*/}
                <br />
                <b>Plafond Sécurité Sociale:</b>
              </div>
            </Container>
          </Grid>
          <Grid item xs={7}>
            <h3>Fiche de Paie</h3>
            <h5>
              période du : <br />
              paiement le :
            </h5>
            <br />
            <br />
            <br />
            {/*Le Nom et le Prénom du salarié; L'adresse du salarié;*/}
            <h4>
              {this.props.employer.firstName} {this.props.employer.lastName}
            </h4>
            <p>
              {" "}
              rue ain awafi
              <br /> 6140 ain awafi
            </p>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <SpanningTable />
      </Box>
    );
  }
}

const Paie = forwardRef((props, ref) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useImperativeHandle(ref, () => ({
    handlePrint,
  }));

  return (
    <div>
      <ComponentToPrint ref={componentRef} employer={props.employer} />
    </div>
  );
});

export default Paie;
