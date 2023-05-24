import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PrivatePublicVacDestAdd = () => {
    const navigate = useNavigate();

    const [destination, setDestination] = useState({
        geolocation: "",
        title: "",
        imageURL: "",
        description: "",
        arrival_date: "",
        departure_date: "",
        added_by: "",
    });

    const addDestinationFromBucketList = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
       // try{
       //     if()
       // }
    }


};