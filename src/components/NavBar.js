import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import ClearIcon from '@mui/icons-material/Clear';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "./firebase";

function NavBar() {
    const [click, setClick] = useState(false);
    const navigate = useNavigate();
    // const { signUp, user } = auth();
    const [user, setUser] = useState({});

    const handleLogout = async () => {
        try {
            // await signUp();
            navigate("/signin");
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClick = () => setClick(!click);
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <NavLink exact to="/" className="nav-logo">
                        {/* CodeBucks */}
                    </NavLink>

                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            {/* <NavLink
                                exact
                                to="/"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Home
                            </NavLink> */}
                        </li>
                        {/* <li className="nav-item">
                            <NavLink
                                exact
                                to="/AddNewEvent"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Event
                            </NavLink>
                        </li> */}
                        {/* <li className="nav-item">
                            <NavLink
                                exact
                                to="/NewRegistration"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Registration
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            {!user ? (
                                <NavLink
                                    exact
                                    to="/signIn"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Sign In
                                </NavLink>

                            ) : (
                                <>
                                    <NavLink
                                        exact
                                        to="/signUp"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Sign In
                                    </NavLink>
                                </>

                            )}
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {click ? <DehazeIcon /> : <ClearIcon />}
                    </div>
                    {/* <button onClick={handleLogout}>SignUp</button> */}
                </div>
            </nav>
        </>
    );
}

export default NavBar;