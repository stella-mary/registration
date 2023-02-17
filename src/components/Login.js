import React, { useState } from 'react';
// import axios from 'axios';
import { signInWithEmailAndPassword } from "firebase/auth";
import './Registration.css';
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import './Login.scss'

export default function Login() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            // navigate("/")
            console.log(user);
        } catch (err) {
            console.log(err.message)
            setErr(true);
        }
    };
    return (
        <div className="formContainer1">
            <div className="formWrapper">
                <span className="logo">Admin</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    {/* {err && <span>Something went wrong</span>} */}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};
