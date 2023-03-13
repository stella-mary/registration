import React, { useEffect, useState, } from 'react';
import { navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
// import './Login.scss'

export default function EditRegistration() {

    const navigate = useNavigate()
    const [searchParam] = useSearchParams();
    const idToEdit = searchParam.get("register");
    const [idToUpdate, setIdToUpdate] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [mobileNumber, setMobileNumber] = useState();
    const [profession, setProfession] = useState();
    const [company, setCompany] = useState();
    const [lookingFor, setLookingFor] = useState();
    const [offerThis, setOfferThis] = useState();

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log("Update Id" + idToEdit)
        axios
            .put("http://localhost:2024/register/", {
                registerId: parseInt(idToEdit),
                Name: name,
                Email: email,
                MobileNumber: mobileNumber,
                Profession: profession,
                Company: company,
                LookingFor: lookingFor,
                OfferThis: offerThis
            })
            .then((response) => {
                console.log("Update Response" + JSON.stringify(response));
                axios.get(`http://localhost:2024/register/eventId/${idToEdit}`).then((response) => {
                    console.log("get ProfileId response" + JSON.stringify(response))
                    navigate(`/registrationTable?event=${response.data.eventId}`)
                });
            });

    }


    useEffect(() => {
        axios.get(`http://localhost:2024/register/${idToEdit}`).then((response) => {
            // setIdToUpdate(response.data.Id)
            console.log("useeffect response" + JSON.stringify(response))
            setName(response.data.Name);
            setEmail(response.data.Email);
            setMobileNumber(response.data.MobileNumber);
            setProfession(response.data.Profession);
            setCompany(response.data.Company);
            setLookingFor(response.data.LookingFor);
            setOfferThis(response.data.OfferThis);
        });
    }, []);

    // useEffect(() => {
    //     // getAllRegister();
    // }, []);

    // const handleUpdate = (e) => {
    //     e.preventDefault()
    //     console.log("Update Id" + idToEdit)
    //     axios
    //         .put("http://localhost:2024/register/", {
    //             registerId: parseInt(idToEdit),
    //             Name: name,
    //             Email: email,
    //             MobileNumber: mobileNumber,
    //             Profession: profession,
    //             Company: company,
    //             LookingFor: lookingFor,
    //             OfferThis: offerThis
    //         })
    //         .then((response) => {
    //             console.log("Update Response" + JSON.stringify(response));
    //             axios.get(`http://localhost:2024/register/eventId/${idToEdit}`).then((response) => {
    //                 console.log("get ProfileId response" + JSON.stringify(response))
    //                 navigate(`/registrationtable?profile=${response.data.profileId}`)
    //             });
    //         })
    // }

    // useEffect(() => {
    //     axios.get(`http://localhost:2024/register/${idToEdit}`).then((response) => {
    //         // setIdToUpdate(response.data.Id)
    //         console.log("useeffect response" + JSON.stringify(response))
    //         setName(response.data.Name);
    //         setEmail(response.data.Email);
    //         setMobileNumber(response.data.MobileNumber);
    //         setProfession(response.data.Profession);
    //         setCompany(response.data.Company);
    //         setLookingFor(response.data.LookingFor);
    //         setOfferThis(response.data.OfferThis);
    //     });
    // }, []);


    return (
        <div className='inner'>
            {/* <div className="formContainer1"> */}
            <div className="formWrapper">
                <form onSubmit={handleUpdate}>
                    <h3>Update Registration</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Mobile Number"
                            name='mobileNumber'
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Profession</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Profession"
                            name='profession'
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Company"
                            name='company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Requires</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Requires"
                            name='lookingFor'
                            value={lookingFor}
                            onChange={(e) => setLookingFor(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Offers</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Offers"
                            name='offerThis'
                            value={offerThis}
                            onChange={(e) => setOfferThis(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="SubmitRegister">
                        Update
                    </button>
                    {/* <p onClick={handleClick} className="forgot-password text-right">
                    Already registered{" "}log in?
                </p> */}
                </form>
            </div>
        </div>
        // </div>
    );
}

//         <div>
//             <h1>Update Registration</h1>
//             <form onSubmit={handleUpdate}>
//                 <div className='Container1'>
//                     <div className="Head">Name</div>
//                     <input type="text"
//                         name='name'
//                         id='name'
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">Email</div>
//                     <input type="text"
//                         name='email'
//                         id='email'
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">MobileNumber</div>
//                     <input type="text"
//                         name='mobileNumber'
//                         id='mobileNumber'
//                         value={mobileNumber}
//                         onChange={(e) => setMobileNumber(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">Profession</div>
//                     <input type="text"
//                         name='profession'
//                         id='profession'
//                         value={profession}
//                         onChange={(e) => setProfession(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">Company</div>
//                     <input type="text"
//                         name='company'
//                         id='company'
//                         value={company}
//                         onChange={(e) => setCompany(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">Looking For</div>
//                     <input type="text"
//                         name='lookingFor'
//                         id='lookingFor'
//                         value={lookingFor}
//                         onChange={(e) => setLookingFor(e.target.value)}
//                     >
//                     </input>
//                     <div className="Head">Offer This</div>
//                     <input type="text"
//                         name='offerThis'
//                         id='offerThis'
//                         value={offerThis}
//                         onChange={(e) => setOfferThis(e.target.value)}
//                     >
//                     </input>
//                     <div className='HeadSubmitHead'>
//                         <button type="submit" className='HeadSubmit'>Update</button>
//                     </div>
//                 </div>
//             </form >
//         </div >
//     )
// }
