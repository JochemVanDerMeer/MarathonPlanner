import React from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { CardActionArea } from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import UpdateIcon from "@mui/icons-material/Update";
import Navbar from "../components/Navbar";

const Home = () => {
  const { user } = useUserAuth();

  const navigate = useNavigate();
  const goPlanner = async (e) => {
    e.preventDefault();

    navigate("/trainingplanner");
  };

  const goSchedule = async (e) => {
    e.preventDefault();

    navigate("/marathonschedule");
  };

  const goGenerate = async (e) => {
    e.preventDefault();

    navigate("/generatetrainings");
  };

  return (
    <div>
      <Navbar />
      <h1 style = {{marginTop:"3%", marginBottom:"3%"}}>Welcome</h1>
      <Grid container>

        <Grid item xs={12} md={12} lg={4} style = {{paddingLeft:"2%", paddingRight:"2%", paddingBottom: "2%"}}>
          <Card sx={{ maxWidth: 345 }} onClick={goPlanner} style = {{backgroundColor:"lightblue"}}>
            <CardActionArea style = {{paddingTop:"3%"}}>
              <DirectionsRunIcon style={{ fontSize: "10em" }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <b>Training Planner</b>
                </Typography>
                <Typography variant="body2">
                  View your trainings in the calendar. You can add trainings to create a training plan. You can also delete trainings on specific days.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={4} style = {{paddingLeft:"2%", paddingRight:"2%", paddingBottom: "2%"}}>
          <Card sx={{ maxWidth: 345 }} onClick={goGenerate} style = {{backgroundColor:"lightblue"}}>
            <CardActionArea style = {{paddingTop:"3%"}}>
              <UpdateIcon style={{ fontSize: "10em" }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <b>Generate trainings</b>
                </Typography>
                <Typography variant="body2">
                  Generate a training plan for your upcoming marathon. It is also possible to delete all your trainings.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} lg={4} style = {{paddingLeft:"2%", paddingRight:"2%", paddingBottom: "2%",}}>
          <Card sx={{ maxWidth: 345 }} onClick={goSchedule} style = {{backgroundColor:"lightblue"}}>
            <CardActionArea style = {{paddingTop:"3%"}}>
              <EventNoteIcon style={{ fontSize: "10em" }} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <b>Upcoming marathons in Europe</b>
                </Typography>
                <Typography variant="body2">
                  View upcoming marathons in Europe. This schedule is updated regularly by adding newly scheduled marathons.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
