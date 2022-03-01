import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  InputLabel,
} from "@material-ui/core";
import { getAuth, updateEmail } from "firebase/auth";
import Navbar from "../../components/Navbar";
import { DeleteTrainingForm } from "../../components/DeleteTrainingForm";
import { CustomTrainingForm } from "../../components/CustomTrainingForm";

const GenerateTrainings = () => {
  return <Grid>
      <Navbar/>
      <Grid container>

      <Grid item xs = {12} style = {{paddingBottom:"2%", paddingTop:"2%"}}>
        <Box style = {{backgroundColor:"lightblue", paddingTop: "1%", paddingBottom:"2%", marginLeft:"12%", marginRight:"12%"}}>
          <h2>Generate training plan</h2>
          <Typography style = {{marginBottom:"2%"}}>Fill in this form to generate a training plan. Trainings will be added to your account which you can view in the training planner.</Typography>
         <CustomTrainingForm/>
         </Box>
      </Grid>

      <Grid item xs = {12} style = {{paddingBottom: "2%"}}>
          <Box style = {{backgroundColor:"lightblue", paddingTop: "1%", paddingBottom:"4%", marginLeft:"12%", marginRight:"12%"}}>
            <h2>Delete trainings</h2>
            <Typography style = {{marginBottom:"1%"}}>It is possible to delete all your trainings. This action cannot be reversed.</Typography>
       
      <DeleteTrainingForm/>
      </Box>
        </Grid>

      </Grid>
  </Grid>;
};

export default GenerateTrainings;

