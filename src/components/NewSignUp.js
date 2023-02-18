import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './Login.scss'

const NewSignUp = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();


        createUserWithEmailAndPassword(auth, signupData.email, signupData.password)
            .then(async (res) => {
                const user = res.user;
                await updateProfile(user, {
                    displayName: signupData.name,
                });
                // create Profile here
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    name: signupData.name,
                    email: signupData.email,
                    password: signupData.password,
                });
                console.log("firebase signup created");

                navigate("/");

            })
            .catch((err) => {
                setErr(err.message);
            });
    }

    return (
        <div className="formContainer1">

            <span className="logo">Admin Register</span>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="display name" value={signupData.name} onChange={handleChange} />
                <input required type="email" placeholder="email" value={signupData.email} onChange={handleChange} />
                <input required type="password" placeholder="password" value={signupData.password} onChange={handleChange} />
                <button type="submit">Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
        </div>
    );
};

export default NewSignUp;