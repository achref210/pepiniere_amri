import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/system';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'

export default function EmpTable2() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
            <TableRow>
                <TableCell align="left">nombre de jours de congés payés</TableCell>
              <TableCell align="right">jours</TableCell>
              <TableCell align="left">nombre de jours de congés non payés</TableCell>
              <TableCell align="right">jours</TableCell>
              <TableCell align="left">nombre de jours d'arrêt de travail </TableCell>
              <TableCell align="right">jours</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" rowSpan={3} colSpan={2}><h2>Net à payer:</h2></TableCell>
                <TableCell align="center" rowSpan={3} colSpan={2}><h2>dt</h2></TableCell>
                <TableCell rowSpan={3} colSpan={2} align="left"><h2>Signature</h2></TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}