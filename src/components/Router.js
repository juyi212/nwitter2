import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Login from '../routes/Login';
import Home from '../routes/Home';
import Navigation from './Navigation';


const AppRouter = ({isLoggedIn, userObj}) => {
    return (
    <Router>
        {isLoggedIn && <Navigation />}
        <Switch>
            {isLoggedIn ? (
            <div
                style={{
                    display:'flex',
                    justifyContent: 'center',
                    marginTop: "20px"
                    
                }}>
                <Route exact path ='/'>
                    <Home userObj={userObj}/>
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