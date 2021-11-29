import { useState } from "react";
import Header from "../header";
import { useRouteMatch, Switch, Route, Redirect } from "react-router";
import Register from "./register";
import Login from "./login";
import React from "react";
import ArcAppFooterDemo from "../footer";
import { Forgotpassword } from "./forgotpassword";
import ListPodcast from "../listpodcast";
import Podcastdetail from "../podcastdetail";
import Price from "../price";

const AppComponent = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    console.log("drawer opened");
    setOpen(true);
  };

  let { path, url } = useRouteMatch();



  return (
    <div>
      <Header
        open={open}
        setOpen={setOpen}
        drawerWidth={0}
        handleDrawerOpen={handleDrawerOpen}
      />

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path={`${path}/login`} component={Login} />
        <Route path={`${path}/register`} component={Register} />
        <Route path={`${path}/reset`} component={Forgotpassword} />
        <Route path={`${path}/pricing`} component={Price} />
        <Route path={`${path}/listPodcast`} component={ListPodcast} />
        <Route path={`${path}/podcastdetail/:id`} component={Podcastdetail} />
        <Forgotpassword />
      </Switch>
      <ArcAppFooterDemo />
    </div>
  );
};
export default AppComponent;
