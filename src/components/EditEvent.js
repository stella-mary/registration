import React, { useEffect, useState, } from 'react';
import { navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
// import './Login.scss'
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FeedIcon from '@mui/icons-material/Feed';
import event from '../img/event.svg';


export default function EditRegistration() {

    const navigate = useNavigate()
    const [searchParam] = useSearchParams();
    const idToEdit = searchParam.get("event");
    const [idToUpdate, setIdToUpdate] = useState();
    const [eventName, setEventName] = useState();
    const [eventType, setEventType] = useState();
    const [eventDate, setEventDate] = useState();
    const [freeze, setFreeze] = useState();
    const [status, setStatus] = useState();

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("Update Id" + idToEdit)
        axios
            .put("http://localhost:2024/events/", {
                eventId: parseInt(idToEdit),
                eventName: eventName,
                eventType: eventType,
                eventDate: eventDate,
                freeze: freeze,
            })
            .then((response) => {
                console.log("Update Response" + JSON.stringify(response));
                axios.get(`http://localhost:2024/events/profileId/${idToEdit}`).then((response) => {
                    console.log("get ProfileId response" + JSON.stringify(response))
                    navigate(`/EventList?profile=${response.data.profileId}`)
                });
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:2024/events/${idToEdit}`).then((response) => {
            // setIdToUpdate(response.data.Id)
            console.log("useeffect response" + JSON.stringify(response))
            setEventName(response.data.eventName);
            setEventType(response.data.eventType);
            setEventDate(response.data.eventDate);
            setFreeze(response.data.freeze);
        });
    }, []);


    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form onSubmit={handleUpdate}>
                        <h2 className="title">Event</h2>
                        <div className="input-field">
                            <i><PersonIcon className="Icon" /></i>
                            <input required
                                type="text"
                                className="form-control"
                                placeholder="Enter Event Name"
                                name="eventName"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><EventNoteIcon className="Icon" /></i>
                            <select
                                type="text"
                                className="form-control"
                                // placeholder="eventType"
                                name='eventType'
                                value={eventType}
                                onChange={(e) => setEventType(e.target.value)}
                            >
                                <option value=''>Select Event Type</option>
                                <option value='Software'>Software</option>
                                <option value='Business'>Business</option>
                                <option value='Woman'>Woman</option>

                            </select>
                        </div>

                        <div className="input-field">
                            <i><CalendarMonthIcon className="Icon" /></i>

                            <input
                                type="date"
                                className="form-control"
                                placeholder="dd-mm-yyyy"
                                name='eventDate'
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><FeedIcon className="Icon" /></i>
                            <input required
                                type="text"
                                className="form-control"
                                placeholder="Enter Freeze"
                                name='freeze'
                                value={freeze}
                                onChange={(e) => setFreeze(e.target.value)}
                            />
                        </div>

                        {/* <div className="input-field">
                            <label>Status</label>
                            <input required
                                type="text"
                                className="form-control"
                                placeholder="Enter status"
                                name='status'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            />
                        </div> */}
                        {/* <button onClick={navigateToAddNewEvent}>Add New Event</button> */}

                        <button type="submit" className="btn solid">
                            Update
                        </button>
                        {/* <p onClick={handleClick} className="forgot-password text-right">
                    Already registered{" "}log in?
                </p> */}
                    </form>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <img src={event} alt="event image" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

