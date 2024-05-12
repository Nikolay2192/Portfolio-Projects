import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// CSS styling
import button from '../modules/Buttons.module.css';
import styleRecipes from '../modules/Recipes.module.css';

// Importing services for interacting with recipes
import * as recipeService from '../services/recipeService';

import Header from "./Header"
import AuthContext from "../contexts/authContext";
import RecipeItem from "./RecipeItem";
import Paths from "../paths/Paths";

export default function Recipes() {
    const { isAuthenticated, likes, updateRecipeLikes } = useContext(AuthContext);
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();
    // Fetching all recipes
    useEffect(() => {
        recipeService.getAllRecipes()
            .then(data => {
                setRecipes(data);
            })
            .catch(err => {
                console.error(err);
            })

    }, [])



    // Function to navigate to AddRecipe page
    function onButtonClick() {
        navigate(Paths.AddRecipe);
    }


    return (
        <>
            {/* Header component */}
            <Header />
            {/* Button to add new recipe, visible only for authenticated users */}
            {isAuthenticated &&
                <button className={button['add-button']} onClick={onButtonClick} style={{ marginTop: '10px' }}>
                    + Add recipe +
                </button>
            }
            {/* Container for displaying recipes */}
            <div className={styleRecipes['mainDiv']}>
                <div className={styleRecipes['flexDiv']}>
                    {/* Mapping over recipes array and rendering RecipeItem component for each recipe */}
                    {recipes.map(recipe => (
                        <RecipeItem
                            key={recipe._id}
                            recipe={recipe}
                            likes={likes[recipe._id]}
                            updateRecipeLikes={updateRecipeLikes}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}