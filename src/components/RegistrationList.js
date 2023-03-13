import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function RegistrationList() {

    const navigate = useNavigate()
    const [allRegister, setAllRegister] = useState([]);
    const [searchParam] = useSearchParams()
    const eventId = searchParam.get("event")


    const getAllRegister = () => {
        axios.get(`http://localhost:2024/register/all/${eventId}`).then((response) => {
            console.log(response.data);
            setAllRegister(response.data);
        });
    };


    const navigateToNewRegistration = () => {
        navigate(`/NewRegistration?event=${eventId}`)
    }


    const navigateToEventList = (eventId) => {
        navigate(`/RegistrationTable?event=${eventId}`)
    }

    // const handleRemove = (e, eventId) => {
    //     axios
    //         .delete(`http://localhost:2024/register/${idToDelete}`, {
    //             data: {
    //                 id: parseInt(idToDelete),
    //             },
    //         })
    //         .then((response) => {
    //             console.log(response);
    //             getAllRegister();
    //         })
    // };

    const handleRemove = (e, eventId) => {
        e.stopPropagation();
        // setAnchorEl(null)
        axios
            .delete(`http://localhost:2024/register/${eventId}`).then((response) => {
                console.log(response);
                getAllRegister();
            })
    };

    // const handleEdit = (e, registerId) => {
    //     navigate(`/EditRegistration?register=${registerId}`);
    // };

    useEffect(() => {
        getAllRegister();
    }, []);


    return (
        <div className='App1'>
            <div className='buttonSubmit1'>
                <button className="buttonSubmit" onClick={navigateToNewRegistration}>Add New Register</button>
            </div>
            {allRegister.length > 0 && (
                <div className='App3'>
                    {allRegister.map((row, i) => (
                        <Card

                            sx={{ minWidth: 100 }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    {row.Name}
                                </Typography>
                                <Typography variant="h7" component="div">
                                    {row.Email}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {row.MobileNumber}
                                </Typography>
                                <Typography variant="body2">
                                    {row.Profession}
                                    <br />
                                    {row.Company}
                                    <br />
                                    {row.LookingFor}
                                    <br />
                                    {row.OfferThis}
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToEventList(row.eventId);
                                }}
                                    size="small">Submit</Button>

                            </CardActions> */}
                        </Card>

                    ))
                    }
                </div>
            )}
            {allRegister.length < 1 && <p className="no-text">No Register found</p>}

        </div>

    )
}


//     return (
//         <div>
//             <h3>Registration List</h3>

//             <div className="BoxNote">
//                 {allRegister.length > 0 && (
//                     <>
//                         {allRegister.map((row, i) => (
//                             <Card onClick={(e) => {
//                                 e.stopPropagation();
//                                 navigateToEventList(row.eventId);
//                             }}
//                                 sx={{ border: "solid 2px lightgrey", width: 200, display: 'flex', padding: "10px", flexDirection: "column" }}>
//                                 {row.Name},
//                                 {row.Email},
//                                 {row.MobileNumber},
//                                 {row.Profession},
//                                 {row.Company},
//                                 {row.LookingFor},
//                                 {row.OfferThis}
//                             </Card>

//                         ))
//                         }
//                     </>
//                 )}
//                 {allRegister.length < 1 && <p className="no-text">No Register found</p>}
//                 <button onClick={navigateToNewRegistration}>Add New Register</button>
//             </div>
//         </div>
//     )
// }




