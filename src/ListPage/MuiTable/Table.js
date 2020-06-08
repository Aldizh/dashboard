import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useListPageContext } from '../context';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const [data, dispatch] = useListPageContext();
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Country&nbsp;</TableCell>
            <TableCell align="right">Membership Type&nbsp;</TableCell>
            <TableCell align="right">Currency&nbsp;</TableCell>
            <TableCell align="right">Annual Fee</TableCell>
            <TableCell align="right">From Date</TableCell>
            <TableCell align="right">To Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.members.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.membership_type}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">{row.annual_fee}</TableCell>
              <TableCell align="right">{row.from_date}</TableCell>
              <TableCell align="right">{row.to_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}