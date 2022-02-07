import React, { useState } from 'react';
import { authService, dbService } from "fBase";
import { useHistory } from 'react-router-dom';

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onSubmit = async(event) => {
        event.preventDefault()
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName})
            refreshUser()
        }

    }

    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNewDisplayName(value)
    }

    const onLogoutClick =  () => {
        authService.signOut()
        history.push("/")
    }

    return (
        <div className="container">
            <form className="profileForm" onSubmit={onSubmit}>
                <input type="text" value = {newDisplayName} className="formInput" placeholder={newDisplayName} onChange={onChange}/>
                <input type="submit" className="formBtn" value="Update Profile" style={{marginTop: "10px"}}/>
            </form>
            <button 
                className="formBtn formCancelBtn logout"
                onClick={onLogoutClick}> 
                    Logout 
                </button>
        </div>
    )
}

export default Profile;