import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmpTable2 from "./EmpTable2";

function createRow(
  Rubriques,
  Base,
  Taux_Salarial,
  Cot_Salariales,
  Taux_Patronal,
  Cot_Patronal
) {
  return {
    Rubriques,
    Base,
    Taux_Salarial,
    Cot_Salariales,
    Taux_Patronal,
    Cot_Patronal,
  };
}

const rows = [
  createRow("Salaire de base", 100, 1.15),
  createRow("Salaire brut", 100, 1.15),
  createRow("Total des retenus", 2, 17.99),
];

export default function SpanningTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rubriques</TableCell>

            <TableCell align="right">Base</TableCell>
            <TableCell align="right">Taux Salarial</TableCell>
            <TableCell align="right">Cot. Salariales</TableCell>
            <TableCell align="right">Taux Patronal</TableCell>
            <TableCell align="right">Cot. Patronal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index + ""}>
              <TableCell>{row.Rubriques}</TableCell>
              <TableCell align="right">{row.Base}</TableCell>
              <TableCell align="right">{row.Taux_Salarial}</TableCell>
              <TableCell align="right">{row.Cot_Salariales}</TableCell>
              <TableCell align="right">{row.Taux_Patronal}</TableCell>
              <TableCell align="right">{row.Cot_Patronal}</TableCell>
            </TableRow>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <TableRow>
            <TableCell rowSpan={3} colSpan={4}>
              <h2>Net a payer avant impot sur le revenu: </h2>
            </TableCell>
            <TableCell rowSpan={3} colSpan={2}>
              <h2>0 $</h2>
            </TableCell>
          </TableRow>
          <hr />
          <bd />
          <TableRow />
          <TableRow>
            <TableCell rowSpan={3} colSpan={4}>
              évolution de la rémunération :{" "}
            </TableCell>
            <TableCell rowSpan={3} colSpan={2}>
              0 $
            </TableCell>
          </TableRow>
          <hr />
          <bd />
          <TableRow />
        </TableBody>
      </Table>
      <EmpTable2 />
    </TableContainer>
  );
}
