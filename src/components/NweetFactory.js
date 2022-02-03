import { dbService } from 'fBase';
import React, {useState, useRef} from 'react';
import { storageService } from "fBase";
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("")
    const [attachment, setAttachment] = useState("");
    const fileInput = useRef()
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value)
    }
    
    const onSubmit = async(event) => {
        if (nweet === "") {
            return;
        }
        event.preventDefault();
        
        // 파일을 url로 바꿔서 넘겨줌
        let attachmentUrl = "";
        if (attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid} /${uuidv4()}`)
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const nweetObj = {
            text: nweet,
            createdDate : Date.now(),
            creatorId: userObj.uid,
            attachmentUrl 
        };

        await dbService.collection("nweets").add(nweetObj)
        setNweet("")
        setAttachment("")
        fileInput.current.value = "";
    }

    const onFileChange = (event) => {
        const { target : {files}} = event;
        const theFile = files[0]
        const reader = new FileReader();
        reader.onloadend =  (finishedEvent) => {
            const { currentTarget : {result}} = finishedEvent;
            setAttachment(result)
        }
        reader.readAsDataURL(theFile)
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
            <label for="attach-file">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id ="attach-file" type="file" accept= "image/*" ref={fileInput} style={{ opacity: 0 }} onChange ={onFileChange} />
            { attachment && (
                <div>
                    <img src={attachment} />
                    <div>
                        <span> Remove </span>
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;