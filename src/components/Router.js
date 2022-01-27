import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom"
import Login from '../routes/Login';
import Home from '../routes/Home';



const AppRouter = ({isLoggedIn}) => {
    return (
    <Router>
        <Switch>
            {isLoggedIn ? (
            <div
                style={{
                    display:'flex',
                    justifyContent: 'center',
                    marginTop: "20px"
                    
                }}>
                <Route exact path ='/'>
                    <Home />
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