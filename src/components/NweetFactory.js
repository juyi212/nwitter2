import { dbService } from 'fBase';
import React, {useState} from 'react';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value)
    }
    
    const onSubmit = async(event) => {
        event.preventDefault();
        const nweetObj = {
            text: nweet,
            createdDate : Date.now(),
            creatorId: userObj.uid,
            // attachmentUrl 
        };
        await dbService.collection("nweets").add(nweetObj)
        setNweet("")
    }


    return (
        <form className="factoryForm" onSubmit={onSubmit}>
            <div className="factoryContainer">
                <input 
                    type = "text"
                    className='factoryInput' 
                    onChange={onChange} 
                    value = {nweet}
                    placeholder="what's on your mind?"
                    />
                <input className="factoryArrow" type ="submit" value="&rarr;" />
            </div>
        </form>
    )
}

export default NweetFactory;