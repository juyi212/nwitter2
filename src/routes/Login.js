import React from 'react';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter
  } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
                />
            <AuthForm formLogin={true}/>
        </div>
    )
}

export default Login;