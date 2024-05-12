import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as recipeService from '../services/recipeService';

import Header from "./Header"
import topRecipes from '../modules/TopRecipes.module.css';
import styles from '../modules/Welcome.module.css';
import food from '../images/food.jpg';
import AuthContext from "../contexts/authContext";


export default function Home() {

    // Get the likes object from the AuthContext consisting of recipe ids with their respective likes
    const { likes } = useContext(AuthContext);
    // State to store the new recipes
    const [newRecipes, setNewRecipes] = useState(likes);
    // State to track if the component has rendered
    const [rendered, setRendered] = useState(false);
    
    // Get the navigate function from react-router-dom
    const navigate = useNavigate();
 
    // useEffect to fetch and sort recipes when 'likes' change
    useEffect(() => {
       // Fetch all recipes
       recipeService.getAllRecipes()
           .then(data => {
               // Sort the likes by value and get the top 3
               const sortedLikesArray = Object.entries(likes).sort((a, b) => b[1] - a[1]).slice(0, 3);
               // Get the IDs of the top liked recipes
               const sortedLikeIds = sortedLikesArray.map(([id]) => id);
               
               // Filter recipes based on the top liked IDs
               const filteredRecipes = data.filter(recipe => sortedLikeIds.includes(recipe._id));
 
               // Sort filtered recipes based on their likes
               filteredRecipes.sort((a, b) => {
                   const likesA = sortedLikesArray.find(([id]) => id === a._id)?.[1] || 0;
                   const likesB = sortedLikesArray.find(([id]) => id === b._id)?.[1] || 0;
                   return likesB - likesA;
               });
               
               // Filter again based on the sortedLikeIds to maintain order
               const finalFilteredRecipes = filteredRecipes.filter(recipe => sortedLikeIds.includes(recipe._id));
               
               // Update state with the sorted and filtered recipes
               setNewRecipes(finalFilteredRecipes); 
               // Set rendered to true to indicate component has rendered
               setRendered(true);
           });
   }, [likes]); 
   return (
      <>
         <Header />
         <div className={styles.mainTextContainer}>
            <h2 className={styles.mainText}>
               Welcome to Cook right.
               The best stop for your cooking journey!
            </h2>
         </div>
         <div className={topRecipes['image-container']}>
            <img src={food} alt="food" />
            <div className={topRecipes['top-recipes']}>
               <h2>Most popular recipes</h2>
              {rendered &&  newRecipes.map(recipe => (
                  <div key={recipe._id} className={topRecipes['recipes']}>
                     <div className={topRecipes['items']}>
                        <h4>{recipe.food}</h4>
                        <div className={topRecipes['image']}>
                           <img src={recipe.image} alt="food" />
                        </div>
                        <button onClick={() => navigate(`recipes/${recipe._id}`)}>Show more</button>
                        <div className={topRecipes['likes']}>
                           <h4>{likes[recipe._id]} likes</h4>
                           <i className="fas fa-heart"></i>
                        </div>
                     </div>
                  </div>
               ))}
              
            </div>
         </div>
      </>
   )
}