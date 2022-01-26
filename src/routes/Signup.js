import React from 'react';
import AuthForm from "../components/AuthForm"

const Signup = () => {
    return (
        <div className="authContainer">
            <AuthForm isLogging = {false}/>
        </div>
    )
}

export default Signup;