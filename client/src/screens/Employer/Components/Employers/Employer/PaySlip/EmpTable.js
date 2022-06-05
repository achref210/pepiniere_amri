import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmpTable2 from "./EmpTable2";

export default function SpanningTable({totalSalary,employer}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="table">
        <TableBody>
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
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <TableRow>
            <TableCell rowSpan={3} colSpan={4}>
              <h2>Salaire Journalier: </h2>
            </TableCell>
            <TableCell rowSpan={3} colSpan={2}>
              <h2>{employer.employer.salary||0} dt</h2>
            </TableCell>
          </TableRow>
          <bd />
          <TableRow />
          <TableRow>
            <TableCell rowSpan={3} colSpan={4}>
              Avance :
            </TableCell>
            <TableCell rowSpan={3} colSpan={2}>
              {employer.employer.advance||0} dt
            </TableCell>
          </TableRow>
          <bd />
          <TableRow />
          <TableRow>
            <TableCell rowSpan={3} colSpan={4}>
              Jours De Travaille :
            </TableCell>
            <TableCell rowSpan={3} colSpan={2}>
              {totalSalary/employer.employer.salary||0} jours
            </TableCell>
          </TableRow>
          <bd />
          <TableRow />
        </TableBody>
      </Table>
      <EmpTable2 employer={employer} totalSalary={totalSalary}/>
    </TableContainer>
  );
}
