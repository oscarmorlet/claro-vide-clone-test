import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "../components/Main";
import Navbar from "../components/Navbar";
import VideoDetail from "../components/VideoDetail";

function AppRouter(props) {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/video_detail/:idGroup" component={VideoDetail} />
          <Route exact path="/videos/:genre" component={Main} />
          <Route path="/" component={Main} />
        </Switch>
      </>
    </Router>
  );
}

export default AppRouter;
