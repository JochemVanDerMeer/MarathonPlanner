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
import { useUserAuth } from "../../contexts/UserAuthContext";

const EditProfile = () => {
  const { user, forgotPassword } = useUserAuth();
  const [email, setNewEmail] = useState("");
  const [passwordReset, setPasswordReset] = useState("");
  const auth = getAuth();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(user.email);
      setPasswordReset(
        "An e-mail with a link for a new password has been sent."
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  function editEmail() {
    updateEmail(auth.currentUser, email);
  }

  return (
    <Grid container style={{ justifyContent: "center" }}>
      <Navbar />
      <Grid item xs={12} md={8} style={{ marginTop: "4%" }}>
        <h1>Edit profile</h1>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "lightblue", paddingBottom: "4%" }}
        >
          <Grid item md={4}></Grid>
          <Grid item xs={10} md={4} style={{ marginTop: "2%" }}>
            <h2>Change your e-mail address</h2>
            <InputLabel htmlFor="outlined-adornment-amount">
              Current email: {user.email}
            </InputLabel>
            <TextField
              fullWidth
              label="Enter new e-mail"
              value={email}
              onChange={(e) => setNewEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item md={4}></Grid>

          <Grid item xs={12} style={{ paddingTop: "2%" }}>
            <Button variant="contained" onClick={editEmail}>
              <Typography>Save changes</Typography>
            </Button>
          </Grid>
          <Grid item xs={10} style={{ paddingTop: "2%" }}>
            <h2>Get a new password</h2>
            <Button onClick={handleForgotPassword} variant="contained">
              <Typography>Reset password</Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditProfile;
