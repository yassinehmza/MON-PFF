import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home.js';
import FormateurLogin from './LoginPages/FormateurLogin';
import EtudiantLogin from './LoginPages/EtudiantLogin';
import AdministrateurLogin from './LoginPages/AdministrationLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formateur/login" element={<FormateurLogin />} />
        
        <Route path="/etudiant/login" element={<EtudiantLogin />} />
       
        <Route path="/administrateur/login" element={<AdministrateurLogin />} />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
