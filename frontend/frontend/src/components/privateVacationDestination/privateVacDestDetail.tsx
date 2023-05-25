import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BACKEND_API_URL } from "../../constants";
import { PrivateVacationDestination } from "../../models/PrivateVacationDestination";

export const PrivateVacDestDetail = () => {
    const {destinationId} = useParams();
    console.log(destinationId);
    const [destination, setDestination] = useState<PrivateVacationDestination>();

    useEffect(() =>{
        const fetchDestination = async () => {
            const response = await fetch(`${BACKEND_API_URL}/privatedestination/${destinationId}/`);
            const destination = await response.json();
            setDestination(destination);
            console.log(destination);
        };
        fetchDestination();
    }, [destinationId]);

    return(
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/private-destination/bucket-list`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}>Destination Details</h1>
                <p style={{textAlign:"left"}}>Location: {destination?.geolocation}</p>
                <p style={{textAlign:"left"}}>Title: {destination?.title}</p>
                <p style={{textAlign:"left"}}>Image: <a href={destination?.imageURL}>Link</a></p>
                <p style={{textAlign:"left"}}>Description: {destination?.description}</p>
                <p style={{textAlign:"left"}}>Arrival Date: {destination?.arrival_date}</p>
                <p style={{textAlign:"left"}}>Departure Date: {destination?.departure_date}</p>

            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/private-destination/bucket-list`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/private-destination/bucket-list`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
    
};