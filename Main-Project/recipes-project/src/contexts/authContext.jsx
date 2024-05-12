// Importing necessary dependencies from React
import { useNavigate } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';

// Importing services for user and recipe operations
import * as userService from '../services/userService';
import * as recipeService from '../services/recipeService';

// Importing Paths for navigation
import Paths from '../paths/Paths';

// Creating an authentication context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // State variables for authentication, recipes, likes, likeColor, likeClicked, users
  const [auth, setAuth] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [likeColor, setLikeColor] = useState('black');
  const [likeClicked, setLikeClicked] = useState(false);
  const [users, setUsers] = useState({});

  // Function to update users' likeClicked and likeColor properties
  const updateUsers = (userId, itemId, likeClicked, likeColor) => {
    setUsers(prevUsers => {
      const updatedUser = { ...prevUsers[userId] };
      updatedUser[itemId] = {
        ...updatedUser[itemId],
        likeClicked: likeClicked,
        likeColor: likeColor
      };
      const updatedUsers = { ...prevUsers, [userId]: updatedUser };
      return updatedUsers;
    });
  };

  // Function to register a user
  async function register(formData) {
    const data = await userService.register(formData);
    const user = data._id;
    localStorage.setItem('accessToken', data.accessToken);
    setAuth(data);
    setUsers(prevUsers => ({
      ...prevUsers,
      [user]: {}
    }));
    navigate(Paths.Home);
  }

  // Function to log in a user
  async function login(formData) {
    const data = await userService.login(formData);
    localStorage.setItem('accessToken', data.accessToken);
    setAuth(data);
    navigate(Paths.Home);
  }

  // Function to log out a user
  async function logout() {
    setAuth({});
    localStorage.removeItem('accessToken');
  }

  // Function to create a new recipe
  async function create(formData) {
    const newRecipe = await recipeService.create(formData);
    setLikes(prevLikes => ({
      ...prevLikes,
      [newRecipe._id]: 0,
    }))
    setRecipes(prevrecipes => [...prevrecipes, newRecipe]);
    navigate(Paths.Recipes);
  }

  // Function to delete a recipe
  async function deleteRecipe(id) {
    await recipeService.deleteRecipe(id);
    setRecipes(prevrecipes => prevrecipes.filter(recipe => recipe._id !== id));
    navigate(Paths.Recipes);
  }

  // Function to edit a recipe
  async function editRecipe(recipe) {
    await recipeService.editRecipe(recipe._id, recipe);
    navigate(Paths.Recipes);
  }

  // Function to update the top 3 recipes after one of them is deleted
  const updateTopRecipesAfterDelete = (recipeId) => {
    const updatedLikes = { ...likes };
    delete updatedLikes[recipeId];
    setLikes(updatedLikes);
  };

  // Function to update recipe likes
  function updateRecipeLikes(recipeId, userId, likeClicked, likeColor) {
    setLikes(prevLikes => {
        const currentLikes = prevLikes[recipeId] || 0;
        const user = users[userId];
        const recipeItem = user[recipeId];
        const updatedLikes = currentLikes + (recipeItem.likeClicked ? -1 : 1);
        setLikeClicked(!likeClicked);
        setLikeColor(likeColor === 'black' ? 'red' : 'black');
        return {
            ...prevLikes,
            [recipeId]: updatedLikes,
        };
    });
  }

  // useEffect hook to fetch recipes and initialize likes
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await recipeService.getAllRecipes();
        setRecipes(data);
        const initialLikes = {};
        data.forEach(recipe => {
          initialLikes[recipe._id] = 0;
        });
        setLikes(initialLikes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  // Context values
  const values = {
    isAuthenticated: !!auth.accessToken,
    username: auth.username || auth.email,
    email: auth.email,
    userId: auth._id,
    likes,
    users,
    recipes,
    register,
    login,
    logout,
    create,
    updateRecipeLikes,
    deleteRecipe,
    editRecipe,
    updateUsers,
    updateTopRecipesAfterDelete,
  }

  // Providing context values to children components
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

// Setting display name for AuthContext
AuthContext.displayName = 'AuthContext';

// Exporting AuthContext as default
export default AuthContext;