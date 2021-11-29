import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import React,{ useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import app_config from "../config";
import clsx from "clsx";
import { UserContext } from "../providers/userContext";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import MicIcon from "@material-ui/icons/Mic";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/Person";

const Header = (props) => {
  const open = props.open;
  const drawerWidth = props.drawerWidth;
  const handleDrawerOpen = props.handleDrawerOpen;

  const userService = useContext(UserContext);
  const history = useHistory();

  const useStyles = makeStyles((theme) => ({
    appBar: {
      type: "dark",
      position: "relative",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest,
      }),
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "white",
      textDecoration: "none",
      fontWeight: "bold",
    },
    link: {
      color: "white",
      textDecoration: "none",
    },
  }));

  const classes = useStyles();

  const showMenuButton = () => {
    if (props.drawer & !open) {
      return (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
      );
    }
  };

  const handleLogout = (e) => {
    sessionStorage.removeItem("user");
    userService.setLoggedin(false);
    userService.setCurrentUser(null);
    history.push("/main/login");
  };

  const renderLoggedIn = () => {
    let user = userService.currentUser;
    console.log(user);
    if (user) {
      const dashLink = user.isadmin ? "admin" : "user";

      return (
        <div>
          <Button
            color="inherit"
            component={Link}
            to={`/${dashLink}/dashboard`}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to={"/main/login"}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <Button color="inherit" component={Link} to={"/home"}>
            Home
          </Button>
          <Button color="inherit" component={Link} to={"/main/listpodcast"}>
            Podcasts
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Button
            color="inherit"
            component={Link}
            to="/home"
            className={classes.link}
          >
            <HomeRoundedIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/main/login"
            className={classes.link}
          >
            <PersonIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/main/register"
            className={classes.link}
          >
            <PersonAddIcon />
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/main/listpodcast"
            className={classes.link}
          >
            <MicIcon />
          </Button>
        </div>
      );
    }
  };

  return (
    <AppBar
      position="sticky"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        {showMenuButton()}
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to={"/home"}
        >
          {app_config.projectTitle}
        </Typography>
        {renderLoggedIn()}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
