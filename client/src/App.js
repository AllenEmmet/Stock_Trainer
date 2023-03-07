import logo from './logo.svg';
import './App.css';
import Basic from './components/Basic'
import Register from './components/Register'
import Details from './components/Details';
import Dash from './components/Dash';
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  return (
    <div className="App">
      
      <BrowserRouter>
      {/* <NavBar isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar> */}
        <Routes>
          <Route element={<Register user={user} setUser={setUser}></Register>} path='/' default></Route>
          <Route element={<Dash user={user} setUser={setUser}></Dash>} path='/dashboard'></Route>
          <Route element={<Basic user={user} setUser={setUser} ></Basic>} path='/search'></Route>
          <Route element={<Details user={user} setUser={setUser}></Details>} path='/:id'></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
