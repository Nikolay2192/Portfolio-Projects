// Base URL for the recipe-related endpoints
const baseUrl = 'http://localhost:3030/data';

// Function to create a new recipe
export const create = async (formData) => {
    // Extracting necessary information from the formData
    const formInfo = {
        food: formData.food,
        image: formData.image,
        ingredients: formData.ingredients,
        steps: formData.steps,
        likes: formData.likes,
    };

    // Getting the access token from localStorage
    const token = localStorage.getItem('accessToken');

    // Options for the fetch request
    const opt = {
        method: 'POST', // HTTP POST method for creating a new recipe
        headers: {
            'Content-Type': 'application/json', // Setting content type to JSON
            'X-Authorization': token // Including authorization token in the headers
        },
        body: JSON.stringify(formInfo) // Converting formInfo object to JSON string
    };

    // Making the POST request to create a new recipe
    const response = await fetch(`${baseUrl}/recipes`, opt);

    // Checking if the response is not ok
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }

    // Parsing the response body as JSON
    const data = await response.json();

    // Returning the parsed data
    return data;
};

// Function to delete a recipe
export const deleteRecipe = async (id) => {
    // Getting the access token from localStorage
    const token = localStorage.getItem('accessToken');

    // Options for the fetch request
    const opt = {
        method: 'DELETE', // HTTP DELETE method for deleting a recipe
        headers: {
            'Content-Type': 'application/json', // Setting content type to JSON
            'X-Authorization': token // Including authorization token in the headers
        },
    };

    // Making the DELETE request to delete a recipe
    const response = await fetch(`${baseUrl}/recipes/${id}`, opt);

    // Parsing the response body as JSON
    await response.json();
};

// Function to edit a recipe
export const editRecipe = async (id, updatedRecipe) => {
    // Getting the access token from localStorage
    const token = localStorage.getItem('accessToken');

    // Options for the fetch request
    const opt = {
        method: 'PUT', // HTTP PUT method for updating a recipe
        headers: {
            'Content-Type': 'application/json', // Setting content type to JSON
            'X-Authorization': token // Including authorization token in the headers
        },
        body: JSON.stringify(updatedRecipe), // Converting updatedRecipe object to JSON string
    };

    // Making the PUT request to edit a recipe
    const response = await fetch(`${baseUrl}/recipes/${id}`, opt);

    // Parsing the response body as JSON
    await response.json();
};

// Function to get all recipes
export const getAllRecipes = async () => {
    // Making a GET request to fetch all recipes
    const response = await fetch(`${baseUrl}/recipes`);

    // Checking if the response is not ok
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }

    // Parsing the response body as JSON
    const data = await response.json();

    // Returning the parsed data
    return data;
};

// Function to get a single recipe by ID
export const getOneRecipe = async (id) => {
    // Making a GET request to fetch a single recipe by ID
    const response = await fetch(`${baseUrl}/recipes/${id}`);

    // Checking if the response is not ok
    if (!response.ok) {
        throw new Error('Failed to fetch'); // Throwing an error if request fails
    }

    // Parsing the response body as JSON
    const data = await response.json();

    // Returning the parsed data
    return data;
};