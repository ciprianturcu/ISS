import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    Button
} from "@mui/material";

import { useEffect, useState } from "react";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { PublicVacationDestination } from "../../models/PublicVacationDestination";
import { PrivateVacationDestination } from "../../models/PrivateVacationDestination";
import { toast } from "react-toastify";
import axios from "axios";
import { AddPublicDestToBucket } from "../service/addPublicDestToBucket";

export const PrivateVacDestShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [destinations_public, setDestinations] = useState([]);

    const fetchPublicDestinations =async () => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/publicdestination/`
        );
        console.log(response);
        const results = await response.json();
        console.log(results);
        setDestinations(results);
        setLoading(false);

    };


    const [destination, setDestination] = useState({
        geolocation: "",
        title: "",
        imageURL: "",
        description: "",
        arrival_date: "",
        departure_date: "",
        added_by: localStorage.getItem("user_id"),
    });

    // const [destination, setDestination] = useState<PrivateVacationDestination>();

    const navigate = useNavigate();
    const handleClick=async (destination:PublicVacationDestination)=>{ 
        try{
        const response= AddPublicDestToBucket(destination);
        if((await response).status==200){ 
            navigate("/private-destination/bucket-list");
            toast.success("Public destination added to bucket!");}
        else if((await response).status==400)
            throw new Error("Public destination already exists in bucket!");
        else
            toast.error("Something went wrong!");
     } catch (error) {
        toast.error((error as {message: string}).message);
        console.log(error);
    }
       
    };


    useEffect(() => {
        fetchPublicDestinations();
    }, []);
    // console.log(destinations);
    return(
        <Container>
        <h1 style={{marginTop:"65px"}}>All Public Destinations</h1>
        {loading && <CircularProgress />}

        {!loading && destinations_public.length == 0 && <div>No public destinations found!</div>}

        {!loading && destinations_public.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Location</TableCell>
                            <TableCell align="center">Title</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Arrival Date</TableCell>
                            <TableCell align="center">Departure Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {destinations_public.map((publicVacDest:PublicVacationDestination, index) => (
                            <TableRow key={publicVacDest.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{publicVacDest.geolocation}</TableCell>
                                <TableCell align="center">{publicVacDest.title}</TableCell>
                                <TableCell align="center"><a href={`${publicVacDest.imageURL}`}>Link</a></TableCell>
                                <TableCell align="center">{publicVacDest.description}</TableCell>
                                <TableCell align="center">{publicVacDest.arrival_date}</TableCell>
                                <TableCell align="center">{publicVacDest.departure_date}</TableCell>
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/public-destination/${publicVacDest.id}`}>
											<Tooltip title="View destination details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>
                                        <IconButton 
                                            onClick={handleClick.bind(null, publicVacDest)}
											component={Link}
											sx={{ mr: 3 }}
											to={`/private-destination/show-public`}
                                            >
											<Tooltip title="Add public destination to bucket list" arrow>
                                                <AddCircleIcon color="primary" />
											</Tooltip>
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            </>
        )}
    </Container>
    );

};