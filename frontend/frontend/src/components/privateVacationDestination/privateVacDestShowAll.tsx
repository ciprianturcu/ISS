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
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { PrivateVacationDestination } from "../../models/PrivateVacationDestination";
import { PublicVacationDestination } from "../../models/PublicVacationDestination";

export const PrivateVacDestShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [destinations, setDestinations] = useState([]);

    const fetchPublicDestinations =async () => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/publicdestination/`
        );
        const {count, next, previous, results} = await response.json();
        setDestinations(results);
        setLoading(false);

    }

    const fetchPrivateDestinations =async () => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/privatedestination/`
        );
        const {count, next, previous, results} = await response.json();
        setDestinations(results);
        setLoading(false);

    }

    useEffect(() => {
        fetchPublicDestinations();
        /*fetchPrivateDestinations();*/
    }, []);

    return(
        <Container>
        <h1 style={{marginTop:"65px"}}>All Public Destinations</h1>
        {loading && <CircularProgress />}

            {!loading && destinations.length == 0 && <div>No public destinations found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/public-destination/add-bucket-list`}>
                        <Tooltip title="Add public destination to bucket list" arrow>
                            <AddCircleIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && destinations.length > 0 && (
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
                        {destinations.map((publicVacDest:PublicVacationDestination, index) => (
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
											component={Link}
											sx={{ mr: 3 }}
											to={`/public-destination/add-bucket-list`}>
											<Tooltip title="Add public destination to bucket list" arrow>
												<ReadMoreIcon color="primary" />
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