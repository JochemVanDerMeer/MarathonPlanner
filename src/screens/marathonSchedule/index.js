import React, { useState, useEffect } from "react";
import axios from "axios"
import {
  Grid,
} from "@material-ui/core";
import Navbar from "../../components/Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, date, country) {
    return { name, date, country };
  }

const MarathonSchedule = () => {
  const [marathon, setMarathon] = useState(null)

  const url = "https://marathon-schedule-api.herokuapp.com/marathon"
  
    
    useEffect(() => {
      axios.get(url).then(response => {
        setMarathon(response.data)
      })
    }, [url])
  
    function createRows() {
      var marathons = []
      marathon?.map(marathon => createData(marathon.name, marathon.date, marathon.country), marathons.push(marathon))
      return marathons
    }

    var receivedMarathons = createRows()

  return (
   <Grid container>
       <Navbar/>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Marathon</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
            <TableCell align="right"><b>Country</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receivedMarathons.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[index].name}
              </TableCell>
              <TableCell align="right">{row[index].date}</TableCell>
              <TableCell align="right">{row[index].country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Grid>
  );
};

export default MarathonSchedule;
