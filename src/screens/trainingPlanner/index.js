import React, { useState, useEffect } from "react";
import { Box, Grid, TextField } from "@material-ui/core";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Trainings } from "../../components/Trainings";
import { TrainingForm } from "../../components/TrainingForm";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { Navbar } from "../../components/Navbar";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import {DeleteSingleTrainingForm} from "../../components/DeleteSingleTrainingForm"

function dateReformatter(date) {
  var var1 = date.substring(0, 4);
  var var2 = date.substring(5, 7);
  var var3 = date.substring(8, 10);
  var res = var3 + "-" + var2 + "-" + var1;
  return res;
}

function adjustTimeZone(date) {
  let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
  let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
  date.setHours(hoursDiff);
  date.setMinutes(minutesDiff);
  return date;
}

const TrainingPlanner = () => {
  const [value, onChange] = useState(new Date());
  const { user, logOut } = useUserAuth();
  const [trainingsF, setTraining] = useState([]);
  const trainingCollectionRef = collection(db, "trainings");

  useEffect(() => {
    const getTrainings = async () => {
      const data = await getDocs(trainingCollectionRef);
      setTraining(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTrainings();
  }, []);

  return (
    <div>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "10%" }}
          >
            <Grid item>
              <Calendar onChange={onChange} value={value} />
            </Grid>
            <Grid item xs = {12} style = {{marginTop:"5%"}}>
                  <DeleteSingleTrainingForm  selectedDay = {dateReformatter(JSON.stringify(value).substring(1, 11))}/>
                  </Grid>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              style={{
                backgroundColor: "lightblue",
                marginTop: "5%",
                marginLeft: "20%",
                marginRight: "20%",
                paddingBottom: "5%",
              }}
            >
              
              <Grid item>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    marginTop: "10%",
                    textAlign: "center",
                    backgroundColor: "lightBlue",
                  }}
                >
                  
                  <Grid item xs={12}>
                    
                    <p>
                      Selected date:&nbsp;
                      {dateReformatter(JSON.stringify(value).substring(1, 11))}
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div>
                      <Trainings
                        trainings={trainingsF}
                        date={dateReformatter(
                          JSON.stringify(value).substring(1, 11)
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Grid
          item
          xs={12}
          md={6}
          style={{ paddingLeft: "5%", paddingRight: "5%", marginTop: "3%" }}
        >
          <Box style={{ backgroundColor:"lightblue", paddingTop: "2%", paddingBottom: "4%", marginRight: "15%", marginLeft: "15%" }}>
            <h2>Add a new training</h2>
            <TrainingForm
              date={dateReformatter(
                JSON.stringify(adjustTimeZone(value)).substring(1, 11)
              )}
            />
          </Box>
        </Grid>
        
        
      </Grid>
    </div>
  );
};

export default TrainingPlanner;
