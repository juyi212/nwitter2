import React , {useEffect, useState} from 'react';
import AppRouter from "./Router";
import {authService} from "../fBase"

function App () {
  const [init, setInit] =  useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  
  useEffect(() => {
    // 로그인 되어 있는지 체크 
      authService.onAuthStateChanged((user) => {
      if (user){
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
        
      }
      setInit(true)
    })
  },[])



  return (
    <div style={{color: "white"}}>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..." }
    </div>
  )
}

export default App;
