import React, {useState, useEffect} from 'react';
import NweetFactory from 'components/NweetFactory';
import Nweets from 'components/Nweets';
import { dbService } from 'fBase';

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([])

    useEffect(()=> {
        dbService
        .collection("nweets")
        .orderBy("createdDate","desc")
        .onSnapshot((snapshot)=> {
            const nweetArray = snapshot.docs.map(doc => ({
                id : doc.id,
                ...doc.data(),
            }))
            setNweets(nweetArray)
            
        })

    }, [])
    
    return (
        <div className='container'>
            <NweetFactory userObj={userObj} />
            <div style={{marginTop: "10px"}}>
                {nweets.map(nweet => (
                    <Nweets key = {nweet.id} nweetobj = {nweet} isOwner = {nweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    )
}

export default Home;