import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add } from "lodash";

export const PublicVacDestAdd = () => {
    const navigate = useNavigate();

    const [destination, setDestination] = useState({
        geolocation: "",
        title: "",
        imageURL: "",
        description: "",
        arrival_date: "",
        departure_date: "",
    });

    const addDestination = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try{
            if(destination.arrival_date > destination.departure_date)
            {
                throw new Error("Arrival Date cannot be before Departure Date");
            }
            const response = await axios.post(`${BACKEND_API_URL}/publicdestination/`);
            if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occured while adding the destination!");
			} else {
				navigate("/public-destination");
			}
        } catch (error) {
			toast.error((error as {message: string}).message);
            console.log(error);
        }
        
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/public-destination`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addDestination}>
						<TextField
							id="geolocation"
							label="Location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, geolocation: event.target.value })}
						/>
						<TextField
							id="title"
							label="Title"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, title: event.target.value })}
						/>

                        <TextField
							id="imageURL"
							label="Image Link"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, imageURL: event.target.value })}
						/>

                        <TextField
							id="description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, description: event.target.value })}
						/>

                        <TextField
							id="arrival_date"
							label="Arrival Date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, arrival_date: event.target.value })}
						/>

                        <TextField
							id="departure_date"
							label="Departure Date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, departure_date: event.target.value })}
						/>

						<ToastContainer />

						<Button type="submit">Add Destiantion</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
};