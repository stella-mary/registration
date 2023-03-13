import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate, useNavigation, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function EventList(title, text, url) {


    const navigate = useNavigate()
    const [allRegisterTable, setAllRegisterTable] = useState([]);
    const [searchParam] = useSearchParams()
    const eventId = searchParam.get("event")
    const registerId = searchParam.get("register")


    const getAllRegisterTable = () => {
        axios.get(`http://localhost:2024/register/all/${eventId}`).then((response) => {
            console.log(response.data);
            setAllRegisterTable(response.data);
        });
    };

    const handleDelete = (e, registerId) => {
        e.stopPropagation();
        // setAnchorEl(null)
        axios
            .delete(`http://localhost:2024/register/${registerId}`).then((response) => {
                console.log(response);
                getAllRegisterTable();
            })
    };

    const handleEdit = (e, registerId) => {
        e.stopPropagation();
        navigate(`/EditRegistration?register=${registerId}`);
    };

    useEffect(() => {
        getAllRegisterTable();
    }, []);


    return (
        <div className='App4'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, minHeight: 250, marginTop: 0, marginBottom: 0 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className='tableColor'>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Mobile Number</TableCell>
                            <TableCell align="center">Profession</TableCell>
                            <TableCell align="center">Company</TableCell>
                            <TableCell align="center">LookingFor</TableCell>
                            <TableCell align="center">OfferThis</TableCell>
                            <TableCell align="center">Edit</TableCell>
                            <TableCell align="center">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allRegisterTable.map((row) => (
                            <TableRow
                                key={row.Name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.Name}
                                </TableCell>
                                <TableCell align="center">{row.Email}</TableCell>
                                <TableCell align="center">{row.MobileNumber}</TableCell>
                                <TableCell align="center">{row.Profession}</TableCell>
                                <TableCell align="center">{row.Company}</TableCell>
                                <TableCell align="center">{row.LookingFor}</TableCell>
                                <TableCell align="center">{row.OfferThis}</TableCell>
                                <TableCell align="center" onClick={(e) => handleEdit(e, row.registerId)}><EditIcon /></TableCell>
                                <TableCell align="center" onClick={(e) => handleDelete(e, row.registerId)}><DeleteIcon /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

}

