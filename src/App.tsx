import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux'
import { Footer } from './footer/Footer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Welcome } from './welcome/Welcome';
import { Listing } from './listing/Listing';
import { Location } from './model/types'


function App() {
  return (
    <div className="Page">
      <div className="App">
        <Router>
        <Switch>
            <Route path="/list">
              <Listing></Listing>
            </Route>
            <Route path="/">
              <Welcome></Welcome>
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
