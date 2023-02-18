import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './Login.scss'

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        // console.log(e.target[0].value)
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        })
                        // console.log("File available at", downloadURL);
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        });
                    })
                }
            );
        } catch (err) {
            setErr(true);
        }
    }


    // try {
    //     //Create user
    //     const res = await createUserWithEmailAndPassword(auth, email, password);

    //     //Create a unique image name
    //     const date = new Date().getTime();
    //     const storageRef = ref(storage, `${displayName + date}`);

    //     await uploadBytesResumable(storageRef).then(() => {
    //         getDownloadURL(storageRef).then(async (downloadURL) => {
    //             try {
    //                 //Update profile
    //                 await updateProfile(res.user, {
    //                     displayName,
    //                     photoURL: downloadURL,
    //                 });
    //                 //create user on firestore
    //                 await setDoc(doc(db, "users", res.user.uid), {
    //                     uid: res.user.uid,
    //                     displayName,
    //                     email,
    //                     photoURL: downloadURL,
    //                 });

    //                 //create empty user chats on firestore
    //                 await setDoc(doc(db, "userChats", res.user.uid), {});
    //                 navigate("/");
    //             } catch (err) {
    //                 console.log(err);
    //                 setErr(true);
    //                 setLoading(false);
    //             }
    //         });
    //     });
    // } catch (err) {
    //     setErr(true);
    //     setLoading(false);
    // }

    return (
        <div className="formContainer1">
            <div className="formWrapper">
                <span className="logo">Admin Register</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="display name" />
                    <input required type="email" placeholder="email" />
                    <input required type="password" placeholder="password" />
                    <input required style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button type="submit">Sign up</button>
                    {loading && "Uploading and compressing the image please wait..."}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;