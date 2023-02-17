import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import { BiPhone } from "react-icons/bi";
import { BiEnvelope } from "react-icons/bi";
import { BiUserCircle } from "react-icons/bi";
import { HiBuildingOffice } from "react-icons/hi2";
import { MdLocalOffer } from "react-icons/md";
import { FcBusinessContact } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri"
import { rgbToHex } from '@mui/material';
import { Link } from 'react-router-dom';



export default function AddRegistration() {

    const navigate = useNavigate()
    const [allRegister, setAllRegister] = useState([]);

    const getAllRegister = () => {
        axios.get('http://localhost:2023/registration').then((response) => {
            console.log(response.data);
            setAllRegister(response.data);
        });
    };

    const handleRemove = (idToDelete) => {
        axios
            .delete(`http://localhost:2023/registration/${idToDelete}`, {
                data: {
                    id: parseInt(idToDelete),
                },
            })
            .then((response) => {
                console.log(response);
                getAllRegister();
            })
    };

    const handleEdit = (id) => {
        navigate(`/edit?editRegister=${id}`);
    };

    useEffect(() => {
        getAllRegister();
    }, []);


    return (
        <div>
            <h3>Attendence</h3>
            <div className="BoxNote">
                {allRegister.map((row, i) => (
                    <Card sx={{ border: "solid 2px lightgrey", width: 200, display: 'flex', padding: "10px", flexDirection: "column" }}>
                        <p><BiUserCircle /> {row.Name}</p>
                        <p>{row.Profession}, {row.Company}</p>
                        <p><BiPhone /> {row.MobileNumber}</p>
                        <p><BiEnvelope /> {row.Email}</p>
                        <p>Offers:  {row.OfferThis}</p>
                        <p>Requires: {row.LookingFor}</p>
                        <div className='Boxnote1'>
                            <p><Button onClick={() => handleEdit(row.Id)}><CiEdit /></Button><span className='space' /><Button onClick={() => handleRemove(row.Id)}><RiDeleteBinLine /></Button></p>
                        </div>
                    </Card>
                ))
                }
            </div>
        </div>
    )
}




