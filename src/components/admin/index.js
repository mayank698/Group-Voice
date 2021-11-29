import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Route, useRouteMatch, Switch, useHistory } from "react-router-dom";
import ManageUser from "./usermanager";
import Header from "../header";
import DrawerComponent from "../drawer";
import AdminDashboard from "./dashboard";
import clsx from "clsx";
import Swal from "sweetalert2";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 60,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 230,
  },
}));


const Admin = () => {

  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  let { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(path)

  const drawerOptions = [
    {
      name: "Profile",
      icon: <AccountBoxIcon />,
      link: `${url}/profile`
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: `${url}/dashboard`
    },
    {
      name: "ManageUsers",
      icon: <PeopleIcon />,
      link: "/admin/manageusers"
    },
  ]

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isadmin) {
        return;
      }
    }
    Swal.fire({
      icon: 'error',
      title: 'Not Permitted',
      text: 'You do not have admin permissions'
    })
    history.push('/main/login');

  }, [])



  const handleDrawerOpen = () => {
    console.log('drawer opened');
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header open={open} drawerWidth={drawerWidth} handleDrawerOpen={handleDrawerOpen} drawer={true} />
      <DrawerComponent
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        handleDrawerClose={handleDrawerClose}
        drawerOptions={drawerOptions} />


      <div className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}>
        <Switch>
          <Route path={`${path}/dashboard`} component={AdminDashboard} />
          <Route path={`${path}/manageusers`} component={ManageUser} />
        </Switch>
      </div>




    </div>
  );
}
export default Admin;
