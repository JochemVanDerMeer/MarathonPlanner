import React, { useState } from "react";
import { Button, TextField, FormControl, List, Typography } from "@material-ui/core";
import { useUserAuth } from "../contexts/UserAuthContext";
import { doc, deleteDoc, collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../firebase";

export const DeleteTrainingForm = () => {
  const { user } = useUserAuth();
  const [deleteStatus, setDeleteStatus] = useState("")

  const trainingCollectionRef = collection(db, "trainings");

  const askConfirmation = () => {
    if (window.confirm("Are you sure you want to delete all planned trainings?") == true) {
      deleteTraining()
      setDeleteStatus("All trainings have been deleted.")
    } 
  }

  const deleteTraining = async () => {
    const singleTraining = query(trainingCollectionRef, where("userId", "==", user.email));

    const querySnapshot = await getDocs(singleTraining);
    querySnapshot.forEach((doc) => {
      deleteDocument(doc.id)
    });
  }

  const deleteDocument = async (docID) => {
    await deleteDoc(doc(db, "trainings", docID));
    console.log("deleted document", docID)
  }
  return (
    <FormControl>
      <Button variant="contained" onClick={askConfirmation}>
      Delete all your trainings
      </Button>
      <Typography>{deleteStatus}</Typography>
    </FormControl>
  );
};

export default DeleteTrainingForm;
