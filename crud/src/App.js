import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components1/Navbar';
import Registre from './components1/Page/Registre';
import Login from './components1/Page/Login';
import Ajout from './components2/Ajout';
import Liste from './components2/Liste';
import Modif from './components2/Modif';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/registre' element={<Registre />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/ajout' element={<Ajout />}></Route>
          <Route path='/liste' element={<Liste />}></Route>
          <Route path='/modif/:id' element={<Modif />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
