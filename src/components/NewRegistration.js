import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import { useNavigate, useSearchParams } from "react-router-dom";
// import './Login.scss';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import register1 from '../img/register1.svg';

export default function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [profession, setProfession] = useState();
    const [company, setCompany] = useState();
    const [lookingFor, setLookingFor] = useState();
    const [offerThis, setOfferThis] = useState();
    const [searchParam] = useSearchParams();
    const eventId = searchParam.get("event")
    console.log("addNewEvent-recd-eventId : " + eventId);


    const handleSubmitRegistration = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        axios.post('http://localhost:2024/register', {
            Name: name,
            Email: email,
            MobileNumber: mobileNumber,
            Profession: profession,
            Company: company,
            LookingFor: lookingFor,
            OfferThis: offerThis,
            eventId: eventId,
        }).then((response) => {
            console.log(response);
            console.log("Post data from Register" + JSON.stringify(response.data))
            navigate(`/registrationlist?event=${eventId}`);
        }
        )
        setName("");
        setEmail("");
        setMobileNumber("");
        setProfession("");
        setCompany("");
        setLookingFor("");
        setOfferThis("");
    }


    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup1">
                    <form onSubmit={handleSubmitRegistration}>
                        <h2 className="title1">Registration</h2>

                        <div className="input-field">
                            <i><PersonIcon className="Icon" /></i>
                            <input required
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><MailIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><PhoneIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                name='mobileNumber'
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><BusinessIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Profession"
                                name='profession'
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><ApartmentIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Company"
                                name='company'
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><AddCircleIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Requires"
                                name='lookingFor'
                                value={lookingFor}
                                onChange={(e) => setLookingFor(e.target.value)}
                            />
                        </div>

                        <div className="input-field">
                            <i><LocalOfferIcon className="Icon" /></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Offers"
                                name='offerThis'
                                value={offerThis}
                                onChange={(e) => setOfferThis(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn solid">
                            Add New Register
                        </button>
                        {/* <p onClick={handleClick} className="forgot-password text-right">
                    Already registered{" "}log in?
                </p> */}
                    </form>
                </div >

                <div className="panels-container">
                    <div className="panel left-panel">
                        <img src={register1} alt="event image" className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
};