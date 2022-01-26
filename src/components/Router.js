import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Login from '../routes/Login';
import Home from '../routes/Home';
import Signup from '../routes/Signup';


const AppRouter = ({isLoggedIn}) => {
    return (
    <Router>
        <Switch>
            {isLoggedIn ? (
                <>
            <Route exact path ='/'>
                <Home />
            </Route>
            </> ): (
                <>
                <Route exact path ='/signup'>
                    <Signup />    
                </Route>
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