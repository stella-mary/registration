import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
// import './Login.scss'
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import register from '../img/register.svg';

import axios from 'axios';

const SignUp = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // const sign_up_btn = document.querySelector("#sign-up-btn");
    // const container = document.querySelector(".container");

    // sign_up_btn.addEventListener("click", () => {
    //     container.classList.add("sign-up-mode");
    // });

    // const container = () => {
    //     document.getElementById('container');
    // }

    // const signUpButton = () => {
    //     container.classList.add("sign-up-mode");
    //     navigate("/signin")
    // };


    const signUpButton = () => {
        navigate("/signin")
    };


    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const handleChange = (event) => {

        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value,
        });
    };

    // post
    const handleSubmit = async (e) => {
        console.log("handleSubmit button clicking")
        setLoading(true);
        e.preventDefault();

        createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
            .then(async (res) => {
                // console.log("createUserresponse:" + JSON.stringify(res))
                const user = res.user;
                // console.log("user:" + JSON.stringify(user));
                await updateProfile(user, {
                    displayName: signupData.name,
                });
                // console.log("name:" + signupData.name)
                // create Profile here
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    name: signupData.name,
                    email: signupData.email,
                    password: signupData.password,
                });
                // console.log("responseId:" + res.user.uid);
                console.log("firebase signup created");

                axios
                    .post("http://localhost:2024/profile", {
                        profileId: user.uid,
                        // id: id,
                        name: signupData.name,
                        email: signupData.email,
                        password: signupData.password,
                    })
                    .then((response) => {
                        console.log(response);
                        console.log(response.data);
                        console.log("axios id:" + response.data.profileId);
                        // navigate(`/eventslist?id=${id}`);
                        navigate(`/EventList?profile=${user.uid}`);
                    });
            })
            .catch((err) => {
                // setSubmitButtonDisabled(false);
                setErr(err.message);
            });

    }

    return (
        // <div className="formContainer1">
        //     <div className="formWrapper">
        //         <span className="logo">Admin Register</span>
        //         <form onSubmit={handleSubmit}>
        //             <input required type="text" name="name" placeholder="display name" value={signupData.name} onChange={handleChange} />
        //             <input required type="email" name="email" placeholder="email" value={signupData.email} onChange={handleChange} />
        //             <input required type="password" name="password" placeholder="password" value={signupData.password} onChange={handleChange} />
        //             <button type="submit">Sign up</button>
        //             {err && <span>Something went wrong</span>}
        //         </form>
        //         <p>
        //             You do have an account? <Link to="/signin">SignIn</Link>
        //         </p>
        //     </div>
        // </div>

        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" onSubmit={handleSubmit} className="sign-in-form">

                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i><PersonIcon className="Icon" /></i>
                            <input required type="text" name="name" placeholder="display name" value={signupData.name} onChange={handleChange} />
                        </div>
                        <div className="input-field">
                            <i><MailIcon className="Icon" /></i>
                            <input required type="email" name="email" placeholder="email" value={signupData.email} onChange={handleChange} />
                        </div>
                        <div className="input-field">
                            <i><LockIcon className="Icon" /></i>
                            <input required type="password" name="password" placeholder="password" value={signupData.password} onChange={handleChange} />
                        </div>
                        <button type='submit' className="btn solid">Sign up</button>
                    </form>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Welcome Back</h3>
                            <p>
                                To keep connected with us please login with your personal info
                            </p>
                            <button onClick={signUpButton} className="btn transparent">
                                Sign In
                            </button>
                        </div>
                        <img src={register} alt="register image" className="image" />
                        {/* <img src="img/register.svg" className="image" alt="" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;