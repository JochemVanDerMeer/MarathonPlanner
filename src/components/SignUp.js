import React, { useState, useRef } from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
import { useNavigate } from "react-router-dom";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import {
  Grid,
  Container,
  Button,
  TextField,
  FormControl,
  Typography,
} from "@material-ui/core";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const {signUp} = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/home");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/email-already-in-use).") {
        setStatus("E-mail already exists")
      }
      if (err.message == "Firebase: Password should be at least 6 characters (auth/weak-password).") {
        setStatus("The password length should be at least 6 characters")
      }
      if (err.message == "Firebase: Error (auth/missing-email)." || err.message == "Firebase: Error (auth/invalid-email).") {
        setStatus("Invalid email")
      }
      console.log(err.message)
    }
  };

  const goLogIn = async (e) => {
    e.preventDefault();

    navigate("/login");
  };

  return (
    <Container style={{ marginTop: "3%", paddingLeft: "20%", paddingRight: "20%" }}>
      {" "}
      <h1><DirectionsRunIcon/> Marathon Planner</h1>
      <Container
        style={{
          backgroundColor: "lightblue",
          paddingBottom: "8%"
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={0}
        >
          <FormControl>
            <Grid item style={{ marginTop: "30%", marginBottom: "10%" }}>
              <Container>
                <TextField
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Container>
            </Grid>
            <Grid item style={{ marginBottom: "10%" }}>
              <Container>
                <TextField
                  placeholder="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Container>
            </Grid>
            <Grid item xs={12} style = {{marginBottom:"10%"}}>
              {status}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ marginBottom: "10%" }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid>
                <Button variant = "contained" style = {{marginBottom:"10%"}} onClick={goLogIn}>Do you already have an account?</Button>
            </Grid>

          </FormControl>
        </Grid>
      </Container>
    </Container>
  );
};

export default SignUp;
