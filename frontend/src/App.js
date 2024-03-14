import React from "react";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import BenchIndexPage from "./components/BenchIndexPage";
import BenchShowPage from "./components/BenchShowPage";
import BenchFormPage from "./components/BenchFormPage";
import Modal from "./components/Modal";

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <BenchIndexPage />
        </Route>
        <Route path="/benches/new">
          <BenchFormPage />
        </Route>
        <Route path="/benches/:benchId">
          <BenchShowPage />
        </Route>
      </Switch>
      <Modal />
    </>
  );
}

export default App;