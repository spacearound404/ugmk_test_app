import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailsPage from './components/DetailsPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/details/:factoryId/:month" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
