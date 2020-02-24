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
import { createStore } from 'redux';
import { appStore } from './model/state';
import { Menu } from './menu/Menu';
import { MobileSiteIndicator } from './MobileSiteIndicator';

const store = createStore(appStore)

function App() {
  return (
    <div className="Page">
      <div className="App">
      <Provider store={store}>
        <MobileSiteIndicator> </MobileSiteIndicator>
        <Router>
          <Switch>
            <Route path="/list">
              <Listing></Listing>
              <Footer color="black"></Footer>
            </Route>
            <Route path="/help">
              <Welcome></Welcome>
            </Route>
            <Route path ="/">
              <Menu></Menu>
              <Footer color="white"></Footer>
            </Route>
          </Switch>
        </Router>
        </Provider>
      </div>
    </div>
  );
}

export default App;
