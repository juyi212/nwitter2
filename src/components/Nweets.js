import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { dbService } from 'fBase';

const Nweets = ({nweetobj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetobj.text)

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure to delete this nweet?")
        if (ok){
            await dbService.doc(`nweets/${nweetobj.id}`).delete();
        } 
    }

    const onEditClick = () => setEditing((prev) => !prev)

    const onChange = (event) => {
        const { target : {value} } = event;
        setNewNweet(value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetobj.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }

    return (
        <div className="nweet">
            { editing ?
            <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input value={newNweet} onChange={onChange} required autoFocus className="formInput"/>
                    <input type="submit" className="formBtn" value = "update nweet" />
                </form>
                <span onClick={onEditClick} className="formBtn formCancelBtn">cancel</span>
            </>
            :
            <>
                <h4>{nweetobj.text}</h4>
                {isOwner &&
                    <div className="nweet_actions">
                    <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                    <span onClick={onEditClick} style={{ marginLeft: "10px"}}><FontAwesomeIcon icon={faPencilAlt} /></span>
                    </div>
                }
            </>
            }
        </div>
    )
}

export default Nweets;