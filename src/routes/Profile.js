import React, { useState, useEffect } from 'react';
import { authService, dbService } from "fBase";
import { useHistory } from 'react-router-dom';
import Nweets from "../components/Nweets"

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)
    const [myNweets, setMyNweets] = useState([])
    const [changeProfile, setChangeProfile] = useState(false)

    useEffect(()=> {
        getMyNweets()
    }, [])

    const getMyNweets = async() => {
        const Nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .get();
        const realMyNweets =  Nweets.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setMyNweets(realMyNweets)

    }

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

    const toggleProfile = () => setChangeProfile((prev) => !prev)

    return (
        <div className="container">
            <div className="profileNav">
                <span onClick={toggleProfile}>{userObj.displayName}의 nweets</span>
                <span onClick= {toggleProfile} style={{ marginLeft: "10px"}}>Change Profile Info</span>
            </div>
            {changeProfile ? 
                <div>
                    {myNweets.map(mynweet => (
                        <Nweets nweetobj={mynweet}/>
                    ))}
                </div> :
                <>
                <form className="profileForm" onSubmit={onSubmit}>
                    <input type="text" value = {newDisplayName} className="formInput" placeholder={newDisplayName} onChange={onChange}/>
                    <input type="submit" className="formBtn" value="Update Profile" style={{marginTop: "10px"}}/>
                </form>
                <button 
                    className="formBtn formCancelBtn logout"
                    onClick={onLogoutClick}> 
                    Logout 
                </button>
                </>

            }
        </div>
    )
}

export default Profile;