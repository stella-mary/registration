import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import { useNavigate } from "react-router-dom";
import './Login.scss';

export default function Register() {

    const navigate = useNavigate()

    const [register, setRegister] = useState({
        name: "",
        email: "",
        mobileNumber: "",
        profession: "",
        company: "",
        lookingFor: "",
        offerThis: "",
    })


    const handleOnChange = (e) => {
        const { name, value } = e.target
        setRegister({ ...register, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // e.stopPropagation()
        axios.post('http://localhost:2023/registration', {
            Name: register.name,
            Email: register.email,
            MobileNumber: register.mobileNumber,
            Profession: register.profession,
            Company: register.company,
            LookingFor: register.lookingFor,
            OfferThis: register.offerThis
        }).then((response) => {
            console.log(response);
            console.log("Post data from Register" + JSON.stringify(response.data))
            navigate("/submit")
        }
        )
    }


    return (
        <div className='inner'>
            <div className="formContainer1">
                {/* <div className="formWrapper"> */}
                <form onSubmit={handleSubmit}>
                    <h3>Registration</h3>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                            value={register.name}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            name='email'
                            value={register.email}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            name='mobileNumber'
                            value={register.mobileNumber}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Profession</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Profession"
                            name='profession'
                            value={register.profession}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company"
                            name='company'
                            value={register.company}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Requires</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Requires"
                            name='lookingFor'
                            value={register.lookingFor}
                            onChange={handleOnChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Offers</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Offers"
                            name='offerThis'
                            value={register.offerThis}
                            onChange={handleOnChange}
                        />
                    </div>

                    <button type="submit" className="SubmitRegister">
                        Register
                    </button>
                    {/* <p onClick={handleClick} className="forgot-password text-right">
                    Already registered{" "}log in?
                </p> */}
                </form>
            </div>
        </div>
        // </div>
    );
}