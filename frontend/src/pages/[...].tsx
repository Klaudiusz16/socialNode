import React from "react";
import { Router } from "@reach/router";

import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import PrivateRoute from "../components/Auth/PrivateRoute";
import Apollo from "../components/Auth/Apollo";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layout from "../components/Layout/Layout";
import Cookies from "js-cookie";

export default function App() {
  const isLogged = Cookies?.get("jwt") || Cookies?.get("signedin");

  return (
    <Provider store={store}>
      <Apollo>
        <Layout isLogged={isLogged}>
          <Router basepath="/">
            <PrivateRoute path="/" component={Home} />
            <PrivateRoute path="/profile/:id" component={Profile} />
          </Router>
        </Layout>
      </Apollo>
    </Provider>
  );
}
