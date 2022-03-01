import React, { useState, useEffect } from "react";
import { Button, TextField, FormControl, List, Typography } from "@material-ui/core";
import { useUserAuth } from "../contexts/UserAuthContext";
import { doc, deleteDoc, collection, query, where, getDocs  } from "firebase/firestore";
import { db } from "../firebase";

export const DeleteSingleTrainingForm = (selectedDay) => {
  const trainingCollectionRef = collection(db, "trainings");

  function refreshPage() {
    window.location.reload(false);
  }

  const askConfirmation = () => {
    if (window.confirm("Are you sure you want to delete all planned trainings on the selected day?") == true) {
      deleteTraining()
      alert("All trainings on this day have been deleted, please refresh the page.")
      
    } 
    
  }

  const deleteTraining = async () => {
    const singleTraining = query(trainingCollectionRef, where("date", "==", Object.values(selectedDay)[0]));
    const querySnapshot = await getDocs(singleTraining);
    querySnapshot.forEach((doc) => {
      deleteDocument(doc.id)
    });
  }

  const deleteDocument = async (docID) => {
    await deleteDoc(doc(db, "trainings", docID));
  }
  return (
    <FormControl>
      <Button variant="contained" onClick={askConfirmation}>
        Delete all trainings on this day
      </Button>
    </FormControl>
  );
};

export default DeleteSingleTrainingForm;
