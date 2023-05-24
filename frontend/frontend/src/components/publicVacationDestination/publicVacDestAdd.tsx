import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            if()
        }
    }
};