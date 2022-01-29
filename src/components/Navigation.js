import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent:'center', marginTop: '40px'}}>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/profile"
                        style ={{
                            display:'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                        }}>
                            Profile
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;