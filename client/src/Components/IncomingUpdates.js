import React, { useState, useContext, useEffect } from 'react';
import IncomingUpdateItem from './IncomingUpdateItem';
import Message from './Message';
import IncomingUpdateService from '../Services/IncomingUpdateService';
import AuthContext from '../Context/AuthContext';


// functional component
const IncomingUpdates = prop => {
    const [incomingupdate, setIncomingUpdate] = useState({ name: '' });
    const [incomingupdates, setIncomingUpdates] = useState([]);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        IncomingUpdateService.getIncomingUpdates().then(data => {
            setIncomingUpdates(data.incomingupdates);
        });
    }, []);


    const onSubmit = e => {
        e.preventDefault();
        IncomingUpdateService.postIncomingUpdate(incomingupdate).then(data => {
            const { message } = data;
            resetForm();
            // if successfully created a incomingupdate
            if (!message.msgError) {
                IncomingUpdateService.getIncomingUpdates().then(getData => {
                    setIncomingUpdates(getData.incomingupdates);
                    setMessage(message);
                });
            }
            // if JWT token expires
            else if (message.msgBody === "Unauthorized") {
                setMessage(message);
                authContext.setUser({ usernMe: '', role: '' });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
    }

    const onChange = e => {
        setIncomingUpdate({ name: e.target.value });
    }

    const resetForm = () => {
        setIncomingUpdate({ name: "" });
    }

    return (
        <div className='container'>
            <div className="mt-5">
            <div className="list-group">
                
                {
                    incomingupdates.map(incomingupdate => {
                        return <IncomingUpdateItem key={incomingupdate._id} incomingupdate={incomingupdate} />
                    })
                }
            </div>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor="incomingupdate"> Enter Incoming Updates</label>
                <input type='text'
                    name='incomingupdate'
                    value={incomingupdate.name}
                    onChange={onChange}
                    className="form-control mb-3"
                    placeholder='Please enter incoming updates' />
                <button className="btn btn-primary" type='submit'>Submit</button>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
        </div>
    );

};

export default IncomingUpdates;