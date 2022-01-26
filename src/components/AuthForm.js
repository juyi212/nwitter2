import React, { useState } from 'react';
import {authService} from "fBase"
import { Link } from 'react-router-dom';

const AuthForm = ({formLogin}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLogging, setIsLogging] = useState(formLogin)
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
            if (isLogging) {
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
                    value= {isLogging ? "Log In" : "Create Account"}
                    className="authButton"
                />
                { formLogin &&
                    <Link to = "/signup" className="link">            
                        <input className="signupButton" value ="Signup"/> 
                    </Link>
                }
            </form>
        </>
    )
}

export default AuthForm;