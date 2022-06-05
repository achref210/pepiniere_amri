import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/system';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter } from '@mui/material';

function format(temp){
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

export default function EmpTable2({totalSalary,employer}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
            <TableRow>
                <TableCell align="left">nombre de jours de congés payés</TableCell>
              <TableCell align="right">0 jours</TableCell>
              <TableCell align="left">nombre de jours de congés non payés</TableCell>
              <TableCell align="right">{employer.employer.absenceCount} jours</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" rowSpan={3} colSpan={2}><h2>Net a payés</h2></TableCell>
                <TableCell rowSpan={3} colSpan={2} align="left"><h2>{totalSalary} dt</h2></TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>
        <TableRow>
            <TableCell align="right" colSpan={2}><h2>Date Signature:  {format()}</h2></TableCell>
            <TableCell colSpan={2}><h2>Signature:</h2></TableCell>
        </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}