import React, { useState } from 'react';
import {authService} from "fBase"
import { Link } from 'react-router-dom';

const AuthForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data  = await authService.signInWithEmailAndPassword(
                    email, password
                )
            } else {
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            }
            console.log(data)
        } catch(error) {
            console.log(error)
        }

    }

    const toggleAccount = () => setNewAccount((prev) => !prev)

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input 
                    name = "email" 
                    value={email} 
                    type="email" 
                    placeholder='email' 
                    required 
                    onChange ={onChange}
                    className= "authInput"
                    /> 
                
                <input 
                    name = "password" 
                    value={password} 
                    type="password" 
                    placeholder='password' 
                    required 
                    onChange ={onChange} 
                    className="authInput"
                    />
                <input 
                    type ="submit" 
                    value= {newAccount ? "Log In" : "Create Account"}
                    className="authButton"
                />
                
                <span className="signupButton" onClick={toggleAccount}>
                    {newAccount ? "Signup" : "Login"}
                </span>
                
            </form>
        </>
    )
}

export default AuthForm;