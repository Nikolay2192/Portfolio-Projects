import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// CSS styling
import details from '../modules/Details.module.css';


import * as recipeService from '../services/recipeService';

import Header from "./Header"
import AuthContext from "../contexts/authContext";


export default Meal => {

    const navigate = useNavigate();
    const { isAuthenticated, likes, deleteRecipe, userId, users, updateRecipeLikes, updateUsers, updateTopRecipesAfterDelete, } = useContext(AuthContext);
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [clickDelete, setClickDelete] = useState(false);
    useEffect(() => {

        // Fetch the details of the recipe with the provided id when the component mounts
        recipeService.getOneRecipe(id)
            .then(data => {
                setRecipe(data)

                // Ensure user data structure is updated with recipe info
                Object.keys(users).forEach(userId => {
                    const user = users[userId];
                    if (!user[data._id]) {
                        user[data._id] = {
                            likeColor: 'black',
                            likeClicked: false,
                        };
                    }
                });

            })
            .catch(err => {
                console.log(err);
            })


    }, []);

    function changeColor() {
        // Retrieve the recipe ID and user data
        const recipeId = recipe._id;
        const user = users[userId];
        const item = user[recipeId];

        // Toggle like color and update user's like status
        if (!item.likeClicked && item.likeColor === 'black') {

            updateUsers(userId, recipeId, true, 'red');

        } else {

            updateUsers(userId, recipeId, false, 'black');
        }
        // Update the recipe likes
        updateRecipeLikes(recipeId, userId, item.likeClicked, item.likeColor);
    }
    // Navigate to the edit page for the current recipe
    async function onEditClick() {
        navigate(`/recipes/${id}/edit`);
    }
    // Delete the current recipe and associated likes
    // Navigate back to the recipe list page
    async function onDelete() {
        await deleteRecipe(recipe._id);
        updateTopRecipesAfterDelete(recipe._id);
        navigate('/recipes');
    }

    const userLikes2 = users[userId] || {};
    const userLikesColor = userLikes2[recipe._id] ? userLikes2[recipe._id].likeColor : 'black';


    return (
        <>
            {/* Render the Header component */}
            <Header />

            <div className={details['mainDiv']}>
                {/* Delete confirmation modal */}
                {clickDelete &&
                    <div className={details['delete-backdrop']} onClick={() => setClickDelete(false)}></div>
                }
                {clickDelete &&
                    <div className={details['delete-container']}>
                        <h2>Do you really wish to delete this recipe?</h2>
                        <div className={details['delete-buttons']}>
                            <button onClick={onDelete}>Yes</button>
                            <button onClick={() => setClickDelete(false)}>No</button>
                        </div>
                    </div>
                }

                {/* Recipe Details */}
                <div className={details['package-container']}>
                    <div className={details['div-container']}>
                        <div className={details['image-container']}>
                            {/* Render the recipe image */}
                            <img src={recipe.image} alt="food" />
                        </div>
                        <div className={details['information']}>
                            <div className={details['food-title']}>
                                {/* Render the recipe title */}
                                <h1>{recipe.food}</h1>
                            </div>
                            <ul>
                                <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px' }}>Ingredients</h2>
                                {/* Render the list of ingredients */}
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                            <ul>
                                <h2 style={{ backgroundColor: 'transparent', marginBottom: '5px' }}>Steps</h2>
                                {/* Render the list of steps */}
                                {recipe.steps && recipe.steps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </div>
                        {isAuthenticated && recipe._ownerId === userId && (
                            <div className={details['buttons']}>
                                {/* Render edit and delete buttons for authenticated user */}
                                <button className={details['edit-button']} onClick={onEditClick}>Edit</button>
                                <button className={details['delete-button']} onClick={() => setClickDelete(true)}>Delete</button>
                            </div>
                        )}
                    </div>
                    <div className={details['flex-likes-div']}>
                        {/* Render the number of likes */}
                        <h5 >{likes[recipe._id] || 0} likes</h5>
                        {/* Render the like button with appropriate color */}
                        <i
                            className={`fas fa-heart ${details['like-icon']}`}
                            onClick={changeColor}
                            style={{ color: userLikesColor }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}