import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import Logout from "./Logout"
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  customColor: {
    backgroundColor: "#4054b4"
  },
  customHeight: {
    minHeight: 200
  },
  offset: theme.mixins.toolbar
}));

export const Navbar = () => {
  const classes = useStyles();
  const [example, setExample] = useState("primary");
  const isCustomColor = example === "customColor";
  const isCustomHeight = example === "customHeight";
  const navigate = useNavigate()

  function editProfile(e){
    e.preventDefault()
    navigate("/profile")
  }

  function goHome(e){
    e.preventDefault()
    navigate("/home")
  }

  return (
    <React.Fragment>
      <AppBar
        className={`${isCustomColor && classes.customColor} ${
          isCustomHeight && classes.customHeight
        }`}
      >
        <Toolbar>
          <DirectionsRunIcon style = {{textAlign:"left"}}/>
          <Typography onClick = {goHome} variant="h5" className={classes.title} style={{textAlign:"left"}}>
            Marathon Planner
          </Typography>
          <IconButton color="inherit" onClick = {goHome}>
            <HomeIcon/>
            
          </IconButton>
          <IconButton color="inherit" onClick = {editProfile}>
            <AccountCircleIcon  />
            
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setExample("customHeight")}
          >
          </IconButton>
          <Logout/>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Navbar