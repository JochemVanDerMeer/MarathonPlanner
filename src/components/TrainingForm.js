import React, { useState } from "react";
import { Button, TextField, FormControl } from "@material-ui/core";
import { useUserAuth } from "../contexts/UserAuthContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export const TrainingForm = (trainingDate) => {
  const { user } = useUserAuth();
  const date = Object.values(trainingDate)[0];
  const userId = user.email;

  const [newTitle, setNewTitle] = useState("");
  const [newPace, setNewPace] = useState("");
  const [newDistance, setNewDistance] = useState("");

  const trainingCollectionRef = collection(db, "trainings");

  const createTraining = async () => {
    await addDoc(trainingCollectionRef, {
      title: newTitle,
      pace: newPace,
      distance: newDistance,
      date: date,
      userId: userId,
    });
    window.location.reload();
  };

  return (
    <FormControl>
      <TextField
        required
        style={{ marginBottom: "10%" }}
        placeholder="title"
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <TextField
        required
        style={{ marginBottom: "10%" }}
        placeholder="date"
        value={date}
        inputProps={{ readOnly: true }}
      />
      <TextField
        required
        style={{ marginBottom: "10%" }}
        placeholder="distance"
        onChange={(e) => setNewDistance(e.target.value)}
      />
      <TextField
        required
        style={{ marginBottom: "10%" }}
        placeholder="pace e.g. (5:21)"
        onChange={(e) => setNewPace(e.target.value)}
      />
      <Button variant="contained" onClick={createTraining}>
        Submit
      </Button>
    </FormControl>
  );
};

export default TrainingForm;
