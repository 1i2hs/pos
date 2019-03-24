import React, { Component, Fragment } from "react";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import "antd/dist/antd.css";
import "./App.css";

class App extends Component {
  state = {
    isSignedIn: true
  };
  render() {
    const { isSignedIn } = this.state;
    return <Fragment>{isSignedIn ? <Home /> : <SignIn />}</Fragment>;
  }
}

export default App;
