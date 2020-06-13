import React from 'react';
import {Switch, Route} from "react-router-dom";

import CampaignLanding from './containers/Landing/Landing';
import Campaign from './containers/Campaign/Campaign';
import Details from './containers/Details/Details';
import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/campaign" component={Campaign} />
          <Route path="/details/:id" component={Details} />
          <Route path="/" component={CampaignLanding} />
        </Switch>
    </div>
  );
}

export default App;
