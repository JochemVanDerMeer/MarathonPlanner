import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Slider,
} from "@material-ui/core";
import { useUserAuth } from "../contexts/UserAuthContext";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const CustomTrainingForm = () => {
  const { user } = useUserAuth();
  const [checkedMO, setCheckedMO] = React.useState(false);
  const [checkedTU, setCheckedTU] = React.useState(false);
  const [checkedWE, setCheckedWE] = React.useState(false);
  const [checkedTH, setCheckedTH] = React.useState(false);
  const [checkedFR, setCheckedFR] = React.useState(false);
  const [checkedSA, setCheckedSA] = React.useState(false);
  const [checkedSU, setCheckedSU] = React.useState(false);
  const availability = [
    checkedMO,
    checkedTU,
    checkedWE,
    checkedTH,
    checkedFR,
    checkedSA,
    checkedSU,
  ];
  const [weeks, setWeeks] = useState(10);
  const [easyPace, setEasyPace] = useState("");
  const [sprintPace, setSprintPace] = useState("");
  const trainingCollectionRef = collection(db, "trainings");
  const distances = [5, 6, 7, 10, 11, 14, 18, 21];

  const createTraining = async (pace, date) => {
    await addDoc(trainingCollectionRef, {
      title: "Your training",
      pace: pace,
      distance: distances[getRandomInt(distances.length)],
      date: date,
      userId: user.email,
    });
  };

  function daysInMonth(d, m, y) {
    var days = new Date(y, m, 0).getDate();
    var sundays = [-5 + d - new Date(m + "/01/" + y).getDay()];
    for (var i = sundays[0] + 7; i < days; i += 7) {
      var tempDay = i.toString();
      var tempMonth = m.toString();
      if (i.toString().length == 1) {
        tempDay = "0" + i.toString();
      }
      if ((m + 1).toString().length == 1) {
        tempMonth = "0" + m.toString();
      }
      if (
        tempDay != "00" &&
        tempDay != "-1" &&
        tempDay != "-2" &&
        tempDay != "-3" &&
        tempDay != "-4" &&
        tempDay != "-5" &&
        tempDay != "-6" &&
        tempDay != "-7"
      ) {
        sundays.push(tempDay + "-" + tempMonth + "-" + y.toString());
      }
    }
    sundays.shift();
    var res = sundays.filter((day) => day != 0);
    return res;
  }

  const generateTrainings = () => {
    var d = new Date();
    var availableDays = [[], [], [], [], [], [], []];
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();
    var nextMonth1 = d.getMonth(d.setMonth(d.getMonth() + 1));
    var nextMonth2 = d.getMonth(d.setMonth(d.getMonth() + 1));
    for (const [i, v] of availability.entries()) {
      if (v == true) {
        availableDays[i].push(
          daysInMonth(i, parseInt(currentMonth + 1), parseInt(currentYear)),
          daysInMonth(i, parseInt(nextMonth1 + 1), parseInt(currentYear)),
          daysInMonth(i, parseInt(nextMonth2 + 1), parseInt(currentYear))
        );
        availableDays[i] = availableDays[i].flat();
        availableDays[i] = availableDays[i].slice(0, weeks);
      }
    }
    return availableDays;
  };
  const handleChange = (event) => {
    setWeeks(event.target.value);
  };

  const addTrainings = (e) => {
    e.preventDefault();
    generateTrainings()
      .flat()
      .map((training) => {
        createTraining(determineAveragePace(), training);
      });
      alert("Your trainings have been generated and can be viewed in the training planner.")
      setCheckedMO(false)
      setCheckedTU(false)
      setCheckedWE(false)
      setCheckedTH(false)
      setCheckedFR(false)
      setCheckedSA(false)
      setCheckedSU(false)
      setWeeks(7)
      setEasyPace("")
      setSprintPace("")
  };

  function determineAveragePace() {
    var res = [];
    var easy =
      Number(easyPace.target.value.substring(0, 1)) * 60 +
      Number(easyPace.target.value.substring(2, 4));
    var sprint =
      Number(sprintPace.target.value.substring(0, 1)) * 60 +
      Number(sprintPace.target.value.substring(2, 4));
    var average = (easy + sprint) / 2;
    res.push(average);
    res.push(average - 10);
    res.push(average + 10);
    res.push(average - 5);
    res.push(average + 5);
    res.push(average - 7);
    res.push(average + 7);
    var temp = res[getRandomInt(res.length)];
    var firstPart = Math.floor(temp / 60);
    var secondPart = Math.round(temp % 60);
    firstPart = firstPart.toString();
    secondPart = secondPart.toString();
    if (secondPart.length == 1) {
      secondPart = "0" + secondPart;
    }
    return firstPart + ":" + secondPart;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        Available days per week
      </FormLabel>

      <FormControlLabel
        control={
          <Checkbox
            checked={checkedMO}
            onChange={() => setCheckedMO(!checkedMO)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Monday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedTU}
            onChange={() => setCheckedTU(!checkedTU)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Tuesday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedWE}
            onChange={() => setCheckedWE(!checkedWE)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Wednesday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedTH}
            onChange={() => setCheckedTH(!checkedTH)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Thursday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedFR}
            onChange={() => setCheckedFR(!checkedFR)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Friday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedSA}
            onChange={() => setCheckedSA(!checkedSA)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Saturday"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedSU}
            onChange={() => setCheckedSU(!checkedSU)}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Sunday"
      />

      <TextField
        onChange={(e) => setEasyPace(e)}
        style={{ marginBottom: "7%", marginTop: "5%" }}
        placeholder="easy pace, (e.g. 5:15)"
      />
      <TextField
        onChange={(e) => setSprintPace(e)}
        style={{ marginBottom: "15%" }}
        placeholder="sprint pace, (e.g. 4:50)"
      />
      <FormControl>
        <InputLabel id="demo-simple-select-label">
          Weeks until marathon
        </InputLabel>
        <Slider
          aria-label="Weeks until marathon"
          defaultValue={7}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          onChange={handleChange}
          style={{ marginBottom: "10%" }}
        />
      </FormControl>
      <Button
        onClick={addTrainings}
        variant="contained"
        style={{ marginTop: "10%" }}
      >
        Submit
      </Button>
    </FormControl>
  );
};

export default CustomTrainingForm;
