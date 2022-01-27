import React, {useState} from 'react';

const NweetFactory = () => {
    const [nweet, setNweet] = useState("")
    const onChange = (event) => {
        const {target : {value}} = event;
        setNweet(value)
    }

    return (
        <form className="factoryForm">
            <div className="factoryContainer">
                <input 
                    type = "text"
                    className='factoryInput' 
                    onChange={onChange} 
                    value = {nweet}
                    placeholder="what's on your mind?"
                    />
                <input className="factoryArrow" type ="submit" />
            </div>
        </form>
    )
}

export default NweetFactory;