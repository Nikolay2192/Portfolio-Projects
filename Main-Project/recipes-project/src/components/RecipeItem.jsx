import { useNavigate } from "react-router-dom";

// CSS styling
import button from '../modules/Buttons.module.css';
import styleRecipes from '../modules/Recipes.module.css';


export default function RecipeItem({
    // Taking values/functions from the Recipes component as props
    recipe,
    likes,
}) {
    // Function to navigate towards a specific recipe deppending on the id that the server gives
    function redirect() {
        navigate(`/recipes/${recipe._id}`);
    }
    const navigate = useNavigate();


    return (
        <div key={recipe._id} className={styleRecipes['flex-item']} >
            <div className={styleRecipes['image-container']}>
                <img src={recipe.image} alt="food" />
            </div>
            <div className={styleRecipes['food']}>
                <h3>{recipe.food}</h3>
            </div>
            <button className={button['more-information-button']} onClick={redirect}> More information </button>
            <div className={styleRecipes['flex-likes-div']}>
                <h5>{likes || 0} likes</h5>
                <i className="fas fa-heart"></i>
            </div>
        </div>
    )

}