import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { UserProvider } from "./providers/userContext";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, green } from "@material-ui/core/colors";
import UserDashboard from "./components/user";
import Admin from "./components/admin";
import AppComponent from "./components/authentication";
import { Home } from "./components/home";
import { PodcastProvider } from "./providers/podcastContext";
import Podcastdetail from "./components/podcastdetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Price from "./components/price";
import Contact from "./components/contact";
import React, { useState } from "react";
import { Component } from "react";
import Anime from "./anime";

const stripe = loadStripe(
  "pk_test_51Ipo7TSDDpZ34k6P9IaeHYV7pWYXIAgKvLW69GubrVnlAzqOJw9gmLUIrpltZ7sIxwCty7bCeVtmvm3L074TyX26009MOlwjs1"
);
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const GuardedRoute = ({ component, auth, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <PodcastProvider>
          <UserProvider>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/anime">
              <Anime />
            </Route>
            <Elements stripe={stripe}>
              <Route path="/user">
                <UserDashboard />
              </Route>
            </Elements>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/podcastdetail">
              <Podcastdetail />
            </Route>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/pricing">
              <Price />
            </Route>
            <Route path="/main">
              <AppComponent />
            </Route>
          </UserProvider>
        </PodcastProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
