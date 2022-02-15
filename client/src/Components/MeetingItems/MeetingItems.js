import React, { useState, useContext, useEffect } from 'react';
import MeetingItem from './MeetingItem';
import Message from '../Message/Message';
import MeetingService from '../../Services/MeetingItem';
import AuthContext from '../../Context/AuthContext';

const defaultFormData = { item: "" };

const MeetingItems = prop => {
    const [formData, setFormData] = useState(defaultFormData);
    const [meetingItems, setMeetingItems] = useState([]);

    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        MeetingService.getMeetingItems().then(data => {
            setMeetingItems(data.meetingitems);
        });
    }, []);


    const onSubmit = e => {
        e.preventDefault();
        MeetingService.postMeetingItem({...formData, category:prop.category}).then(data => {
            const { message, meetingitem } = data;
            resetForm();
            // if successfully created a incomingupdate
            if (!message.msgError) {
                // MeetingService.getIncomingUpdates().then(getData => {
                //     setMeetingItems(getData.incomingupdates);
                //     setMessage(message);
                // });
                setMeetingItems([...meetingItems, meetingitem])
                setMessage(message);
            }
            // if JWT token expires
            else if (message.msgBody === "Unauthorized") {
                setMessage(message);
                authContext.setUser({ username: '', role: '' });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
    }

    const onChange = e => {
        setFormData({ [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setFormData(defaultFormData);
    }

    return (
        <div className='container'>
            <div className="mt-5">
                <div className="list-group">
                    {
                        meetingItems.map(meetingitem => {
                            return <MeetingItem key={meetingitem._id} meetingitem={meetingitem} category={prop.category}/>
                        })
                    }
                </div>
                <form onSubmit={onSubmit}>
                    <input type='text'
                        name='item'
                        value={formData.item}
                        onChange={onChange}
                        className="form-control mb-3"
                        placeholder='Please enter meeting item' />
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </form>
                {message ? <Message message={message} /> : null}
            </div>
        </div>
    );

};

export default MeetingItems;