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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("")
  const { logIn, forgotPassword } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      if (err.message == "Firebase: Error (auth/wrong-password)."){
        setStatus("Wrong password")
      }
      if (err.message == "Firebase: Error (auth/invalid-email)."){
        setStatus("Invalid e-mail")
      }
      if (err.message == "Firebase: Error (auth/internal-error)."){
        setStatus("Please enter a password")
      }
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email, password);
      alert("An e-mail with a link for a new password has been sent.")
    } catch (err) {
      console.log(err.message);
    }
  };

  const goSignUp = async (e) => {
    e.preventDefault();

    navigate("/signup");
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
            <Grid item xs={12} style = {{marginBottom: "10%"}}>
              {status}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{ marginBottom: "10%" }}
                onClick={handleSubmit}
              >
                login
              </Button>
            </Grid>
            <Grid item xs = {12}><Button variant = "contained" style = {{marginBottom:"10%"}} onClick={goSignUp}>Need an account?</Button></Grid>
            <Grid>
              <Typography onClick={handleForgotPassword}>
                Forgot password?
              </Typography>
              
            </Grid>
          </FormControl>
        </Grid>
      </Container>
    </Container>
  );
};

export default Login;
