import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for programmatic navigation


import * as userService from '../services/userService'; // Importing userService for logging out
import AuthContext from "../contexts/authContext"; // Importing AuthContext for accessing logout function
import Paths from "../paths/Paths"; // Importing Paths for defining route paths

export default function Logout() {

    // Accessing logout function from AuthContext
    const { logout } = useContext(AuthContext);

    // Accessing navigate function from useNavigate hook
    const navigate = useNavigate();

    // useEffect hook to perform logout operation when component mounts
    useEffect(() => {
        // Calling logout function from userService to log the user out
        userService.logout()
            .then(
                // If logout is successful, redirect to Home page
                logout(),
                navigate(Paths.Home),
            )
            .catch(
                // If logout fails, still redirect to Home page
                logout(),
                navigate(Paths.Home),
            );
    }, [])

    // Since this component is responsible for performing actions only, it returns null
    return null;
}