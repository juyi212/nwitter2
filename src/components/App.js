import React , {useState} from 'react';
import AppRouter from "./Router";
import {authService} from "../fBase"

function App () {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <AppRouter isLoggedIn={isLoggedIn}/>
  )
}

export default App;
