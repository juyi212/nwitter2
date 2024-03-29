import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Login from '../routes/Login';
import Home from '../routes/Home';
import Profile from '../routes/Profile'
import Navigation from './Navigation';


const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    return (
    <Router>
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Switch>
            {isLoggedIn ? (
            <div
                style={{
                    display:'flex',
                    justifyContent: 'center',
                    marginTop: 50,
                    
                }}>
                <Route exact path ='/'>
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path ='/profile'>
                    <Profile refreshUser = {refreshUser} userObj={userObj}/>
                </Route>
                </div> ): (
                <>
                <Route exact path ='/'>
                    <Login />    
                </Route>
                </>
            )}
        </Switch>
    </Router>
    )
};

export default AppRouter;