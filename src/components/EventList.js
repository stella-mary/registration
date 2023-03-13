import React, { useEffect, useState, useRef } from 'react';
import { Card } from "antd"
import software from '../img/software.jpg';
import woman from '../img/woman.jpg';
import business from '../img/business.jpeg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Icon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    WhatsappShareButton,
    WhatsappIcon,
} from 'react-share';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FacebookFilled, TwitterOutlined, InstagramOutlined, YoutubeFilled, CopyTwoTone } from '@ant-design/icons';
import { Avatar } from '@mui/material';
import Fade from '@mui/material/Fade';


export default function EventList(title, text) {


    const [copied, setCopied] = useState(false);
    const navigate = useNavigate()
    const [allEventList, setAllEventList] = useState([]);
    const [searchParam] = useSearchParams()
    const profileId = searchParam.get("profile")
    console.log("addNewEvent-recd-profileId : " + profileId);
    // const shareUrl = `https://localhost:3000/NewRegistration?event=${eventId}`;
    // navigate(`/NewRegistration?event=${eventId}`)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectEvent, setSelectEvent] = useState();
    const [copySuccess, setCopySuccess] = useState("")
    const textAreaRef = useRef(null)

    async function copyToClip() {
        await navigator.clipboard.writeText(window.location.href);
        setCopySuccess("Copied");
    }

    let url = new URL(window.location.href);
    console.log(url.href);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function copy() {
        // e.stopPropagation();
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

    const getAllEventlist = () => {
        axios.get(`http://localhost:2024/events/all/${profileId}`).then((response) => {
            console.log(response.data);
            setAllEventList(response.data);
        });
    };

    const handleRemove = (e, eventId) => {
        e.stopPropagation();
        // setAnchorEl(null)
        axios
            .delete(`http://localhost:2024/events/${eventId}`).then((response) => {
                console.log(response);
                getAllEventlist();
            })
    };


    const navigateToAddNewEvent = () => {
        navigate(`/AddNewEvent?profile=${profileId}`)
    }

    const handleEdit = (e, eventId) => {
        e.stopPropagation();
        navigate(`/editevent?event=${eventId}`);
    };

    const navigateToRegisterList = (eventId) => {
        navigate(`/RegistrationTable?event=${eventId}`)
    }

    useEffect(() => {
        getAllEventlist();
    }, []);


    return (
        <div className='App1'>
            <div className='buttonSubmit1'>
                <button className="buttonSubmit" onClick={navigateToAddNewEvent}> Add New Event</button>
            </div>
            {allEventList.length > 0 && (
                <div className='App2'>
                    {allEventList.map((row, i) => (
                        <div>
                            {/* {console.log(row)} */}

                            <Card
                                style={{ width: 300, margin: 20 }}
                                actions={[
                                    <FacebookFilled style={{ color: 'blue' }} />,
                                    <TwitterOutlined style={{ color: 'skyblue' }} />,
                                    <InstagramOutlined style={{ color: 'purple' }} />,
                                    <WhatsappShareButton
                                        url={`http://localhost:3000/NewRegistration?event=${row.eventId}`}
                                        quote={'Title or jo bhi aapko likhna ho'}
                                    >
                                        <WhatsappIcon size={20} round={true} />
                                    </WhatsappShareButton>

                                ]}

                                cover={<div style={{
                                    height: 150,
                                    width: '100%',
                                    background: '#04498e',
                                    color: 'white',
                                    fontSize: 30,
                                    paddingTop: 10,
                                    fontFamily: "cursive",
                                }}
                                >
                                    <div className='dotButton'>
                                        <Button

                                            id="fade-button"
                                            aria-controls={open ? 'fade-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            // onClick={handleClick}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                console.log("set show clicked..");
                                                setSelectEvent(row.eventId);
                                                // setShow((show) => !show);
                                                setAnchorEl(e.currentTarget);
                                            }}
                                        >

                                            <MoreVertIcon />
                                        </Button>
                                    </div>
                                    {/* <MenuItem onClick={(e) => copy(e, row.eventId)}>{!copied ? "Copy link" : "Copied!"}</MenuItem> */}
                                    <div>
                                        {row.eventId === selectEvent && anchorEl ? (

                                            <Menu
                                                id="fade-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'fade-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                TransitionComponent={Fade}
                                            >

                                                <MenuItem onClick={copyToClip}>
                                                    Copy
                                                </MenuItem>
                                                {/* <MenuItem onClick={(e) => copy(e, row.eventId)}>{!copied ? "Copy link" : "Copied!"}</MenuItem> */}
                                                <MenuItem>
                                                    <WhatsappShareButton
                                                        url={`http://localhost:3000/NewRegistration?event=${row.eventId}`}
                                                        quote={'Title or jo bhi aapko likhna ho'}
                                                    >
                                                        Share
                                                    </WhatsappShareButton>
                                                </MenuItem>
                                                <MenuItem onClick={(e) => handleEdit(e, row.eventId)}>Edit</MenuItem>
                                                <MenuItem onClick={(e) => handleRemove(e, row.eventId)}>Delete</MenuItem>
                                            </Menu>
                                        ) :
                                            null
                                        }
                                    </div>

                                    {/* <MenuItem onClick={() => handleEdit(row.eventId)}>Edit</MenuItem>
                                    <MenuItem onClick={() => handleRemove(row.eventId)}>Delete</MenuItem> */}
                                    {row.eventName}
                                </div>
                                }
                            >
                                <Card.Meta onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToRegisterList(row.eventId);
                                }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        marginTop: -70,

                                    }}

                                    avatar={
                                        <div>
                                            {row.eventType === "Woman" ?
                                                (
                                                    <Avatar
                                                        style={{
                                                            marginLeft: 70,
                                                            marginBottom: 30,
                                                            width: 100,
                                                            height: 100,
                                                            // textAlign: "center",
                                                        }}>
                                                        <img src={woman} alt="image" />
                                                    </Avatar>
                                                ) :
                                                row.eventType === "Software" ?
                                                    (
                                                        <Avatar
                                                            style={{
                                                                marginLeft: 70,
                                                                marginBottom: 30,
                                                                width: 100,
                                                                height: 100,
                                                            }}>
                                                            <img src={software} alt="image" />
                                                        </Avatar>
                                                    ) :
                                                    row.eventType === "Business" ?

                                                        (<Avatar
                                                            style={{
                                                                marginLeft: 70,
                                                                marginBottom: 30,
                                                                width: 100,
                                                                height: 100,
                                                            }}>
                                                            <img src={business} alt="image" />

                                                        </Avatar>) :
                                                        (
                                                            <Avatar
                                                                style={{
                                                                    marginLeft: 70,
                                                                    marginBottom: 30,
                                                                    width: 100,
                                                                    height: 100,
                                                                }}>
                                                            </Avatar>
                                                        )
                                            }
                                        </div>
                                    }
                                    // onClick={(e) => {
                                    //     e.stopPropagation();
                                    //     navigateToRegisterList(row.eventId);
                                    // }}
                                    title={row.eventType}
                                    description={row.eventDate}
                                >
                                </Card.Meta>
                                <p>{row.freeze}</p>
                            </Card >
                        </div>
                    ))
                    }
                </div >
            )
            }
            {allEventList.length < 1 && <p className="no-text">No Events found</p>}

        </div >
    )
}

