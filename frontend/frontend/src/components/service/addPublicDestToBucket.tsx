import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { PrivateVacationDestination } from "../../models/PrivateVacationDestination";
import { PublicVacationDestination } from "../../models/PublicVacationDestination";

export const AddPublicDestToBucket = (destination:PublicVacationDestination) => {
    return axios.post(`${BACKEND_API_URL}/privatedestination/`, {...destination, added_by:localStorage.getItem("user_id")});
};
