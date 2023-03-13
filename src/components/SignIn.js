import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import './Registration.css';
import { useNavigate, Link } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './Login.scss';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import log from '../img/log.svg';

export default function SignIn() {

    const [err, setErr] = useState(false);

    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState({});

    // const sign_in_btn = document.querySelector("#sign-in-btn");

    // const container = document.querySelector(".container");

    // sign_in_btn.addEventListener("click", () => {
    //     container.classList.remove("sign-up-mode");
    // });

    // const container = () => {
    //     document.getElementById('container');
    // }

    // const signInButton = () => {
    //     container.classList.remove('sign-up-mode');
    //     navigate('/signup')
    // };

    const signInButton = () => {
        navigate('/signup')
    };


    function googleSignIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    const handleClick = async () => {
        try {
            await googleSignIn();
            // const user = res.user;
            axios
                .post("http://localhost:2024/profile", {
                    profileId: user.uid,
                    name: user.displayName,
                    email: user.email,
                    // password: user.password,
                })
                .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    // console.log(response.data.profileId);
                    navigate(`/EventList?profile=${response.data.profileId}`);
                });
        } catch (err) {
            console.log(err.message)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const email = e.target[0].value;
        // const password = e.target[1].value;

        // try {
        //     const user = await signInWithEmailAndPassword(auth, email, password);
        //     // navigate("/registration")
        //     console.log(user);
        //     navigate(`/EventList?profile=${user.uid}`);
        // } catch (err) {
        //     console.log(err.message)
        //     setErr(true);
        // }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (res) => {
                console.log(res);
                navigate(`/eventlist?profile=${res.user.uid}`);

            })
            .catch((err) => {
                setErr(err.message);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            console.log("Auth", currentuser);
            setUser(currentuser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        // getAllRegister();
    }, []);


    return (
        // <div className="formContainer1">
        //     <div className="formWrapper">
        //         <span className="logo">Admin Login</span>
        //         <form onSubmit={handleSubmit}>
        //             <input type="email" placeholder="email" name="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)} />
        //             <input type="password" placeholder="password" name="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)} />
        //             <button type='submit'>Sign in</button>
        //             <button onClick={handleClick}>Signin With Google</button>
        //             {err && <span>Something went wrong</span>}
        //         </form>
        //         <p>You don't have an account? <Link to="/signup">Register</Link></p>
        //     </div>
        // </div>

        <div className="container" id='container'>
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="#" onSubmit={handleSubmit} className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i><MailIcon className="Icon" /></i>
                            <input type="email" placeholder="email" name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i><LockIcon className="Icon" /></i>
                            <input type="password" placeholder="password" name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button type='submit' className="btn solid">Sign in</button>
                        <button onClick={handleClick} className="btn solid">Sign with Google</button>
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Welcome</h3>
                        <p>
                            Enter Your Personal Details and start journey with us
                        </p>
                        <button onClick={signInButton} id="signIn" className="btn transparent">
                            Sign up
                        </button>
                    </div>
                    <img src={log} alt="register image" className="image" />
                    {/* <img src="img/log.svg" className="image" alt="" /> */}
                </div>
            </div>
        </div>
    );
};
