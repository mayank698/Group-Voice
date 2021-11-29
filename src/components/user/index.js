import React,{ useEffect, useState } from "react";
import DrawerComponent from "../drawer";
import Header from "../header";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useRouteMatch, Switch, Route, Redirect, useHistory } from "react-router";
import Profile from "../profile";
import Addpodcast from "./addpodcast";
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import RecordPodcast from "./recordpodcast";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Checkout from "./checkout";
import CreateSeries from "./createSeries";
import Swal from "sweetalert2";
import PostAddIcon from '@material-ui/icons/PostAdd';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ManagePodcast from "./managepodcast";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 60,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 230,
  },
}));

const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const history = useHistory();


  const handleDrawerOpen = () => {
    console.log("drawer opened");
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let { path, url } = useRouteMatch();

  const drawerOptions = [
    {
      name: "Profile",
      icon: <AccountCircleIcon />,
      link: `${url}/profile`,
    },
    {
      name: "Addpodcast",
      icon: <PostAddIcon />,
      link: `${url}/addpodcast`,
    },
    {
      name: "Managepodcast",
      icon: <PostAddIcon />,
      link: `${url}/managepodcast`,
    },
    {
      name: "Record Podcast",
      icon: <RecordVoiceOverIcon />,
      link: `${url}/recordpodcast`,
    },
    {
      name: "Create Series",
      icon: <CreateSharpIcon />,
      link: `${url}/addseries`,
    },
    {
      name: "Checkout",
      icon: <ShoppingCartIcon />,
      link: `${url}/checkout`
    }
  ];

  useEffect(() => {
    if (currentUser) {
      return;
    }
    Swal.fire({
      icon: 'error',
      title: 'Not Permitted',
      text: 'You do not have admin permissions'
    })
    history.push('/main/login');

  }, [])

  return (
    <div>
      <Header
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        handleDrawerOpen={handleDrawerOpen}
        drawer={true}
      />
      <DrawerComponent
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        drawerOptions={drawerOptions}
      />

      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Switch>
          <Redirect exact path={`${path}/dashboard`} to={`${path}/profile`}>
          </Redirect>
          <Route path={`${path}/profile`} component={Profile} />
          <Route exact path={`${path}`}>
            <Profile />
          </Route>
          <Route path={`${path}/addpodcast`} component={Addpodcast} />
          <Route path={`${path}/managepodcast`} component={ManagePodcast} />
          <Route path={`${path}/recordpodcast`} component={RecordPodcast} />
          <Route path={`${path}/addseries`} component={CreateSeries} />
          <Route path={`${path}/checkout`}>
            <Checkout />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default UserDashboard;
