import React from 'react';

import CampaignLanding from './containers/Landing';
import Navbar from './components/Navbar/Navbar';

import './App.css';

function App() {
  return (
    <div className="App">
        <Navbar />
        <CampaignLanding />
    </div>
  );
}

export default App;
