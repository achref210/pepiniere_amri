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
import SpanningTable from "./EmpTable";
import employers from "../../../../../../reducers/employers";

export const capitalize = (sentence) =>
{
    return sentence && sentence[0].toUpperCase() + sentence.slice(1);
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const format = (temp) => {
  let date
  temp? date = new Date(temp):date = new Date();

  let day = String(date.getDate());
  let month = String(date.getMonth()+1);
  let year = String(date.getFullYear());

  if(day<10)
    day="0"+day;
  if(month<10)
    month="0"+month;
  return(String(day+"-"+month+"-"+year))
}

export const getTotalSalary = (salary,coefficient,startDate,workEnd,absenceCount) => {
  var date
  if(startDate>workEnd) return 0
  workEnd? date = new Date(workEnd): date = new Date();
  const diffTime = Math.abs(date - new Date(startDate));
  var diff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if(absenceCount>diff) return 0
  return (salary*diff-salary*absenceCount)*coefficient+20
}

class ComponentToPrint extends React.Component {
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item>
              {" "}
              <h4>Stè Pépiniere Amri<br/>
                Ain Laouafi - Ellès<br/>
                Le Sers - 7180<br/></h4>
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
                <b>Matricule: {this.props.employer.CIN}</b>
                {/*L'emploi ou poste occupé*/}
                <br />
                <b>Emploi: {this.props.employer.job}</b>
                {/*La date d'entrée du salarié;*/}
                <br />
                <b>Entrée le: {format(this.props.employer.hiringDate)}</b>
                <br />
                <b>Coefficient: {this.props.employer.coefficient}</b>
                <br />
                </div>
            </Container>
          </Grid>
          <Grid item xs={7}>
            <h3>Fiche de Paie</h3>
            <h5>
              période du : {this.props.employer.workStart}<br />
              paiement le : {console.log('aa',this.props.employer.workEnd)?format():format(this.props.employer.workEnd)}
            </h5>
            <br />
            <br />
            <br />
            <br />
            {/*Le Nom et le Prénom du salarié; L'adresse du salarié;*/}
            <h4>
              {capitalize(this.props.employer.firstName)} {capitalize(this.props.employer.lastName)}
            </h4>
            <p>
              {capitalize(this.props.employer.adresse)}
            </p>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <SpanningTable totalSalary={getTotalSalary(this.props.employer.salary,this.props.employer.coefficient,this.props.employer.workStart,this.props.employer.workEnd,this.props.employer.absenceCount)} employer={this.props}/>
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
