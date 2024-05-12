// Base URL for the user-related endpoints
const baseUrl = "http://localhost:3030/users";

// Function to register a new user
export const register = async (formData) => {
    // Extracting necessary information from the formData
    const info = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
    };

    // Options for the fetch request
    const opt = {
        method: 'POST', // HTTP POST method for registering a new user
        headers: {
            'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(info) // Converting info object to JSON string
    };

    // Making the POST request to register a new user
    const response = await fetch(`${baseUrl}/register`, opt);

    // Checking if the response is not ok (HTTP status code other than 200-299)
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }

    // Parsing the response body as JSON
    const data = await response.json();

    // Returning the parsed data
    return data;
};

// Function to login a user
export const login = async (formData) => {
    // Options for the fetch request
    const opt = {
        method: 'POST', // HTTP POST method for logging in
        headers: {
            'Content-Type': 'application/json', // Setting content type to JSON
        },
        body: JSON.stringify(formData) // Converting formData object to JSON string
    };

    // Making the POST request to login
    const response = await fetch(`${baseUrl}/login`, opt);

    // Checking if the response is not ok
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }

    // Parsing the response body as JSON
    const data = await response.json();

    // Returning the parsed data
    return data;
};

// Function to logout a user
export const logout = async () => {
    // Getting the access token from localStorage
    const token = localStorage.getItem('accessToken');

    // Defining headers for the request
    // If token exists, include it in the headers, otherwise, exclude it
    const headers = token ? { 'Content-Type': 'application/json', 'X-Authorization': token } : { 'Content-Type': 'application/json' };

    // Options for the fetch request
    const opt = {
        method: 'GET', // Using HTTP GET method for logging out
        headers, // Including headers in the request
    };

    // Making the GET request to logout
    const response = await fetch(`${baseUrl}/logout`, opt);

    // Checking if the response is not ok
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }
};