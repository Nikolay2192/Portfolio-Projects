import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Used modules
import blur from '../modules/Blur.module.css';
import buttonStyles from '../modules/Buttons.module.css';
import recipe from '../modules/AddRecipe.module.css';


import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useForm from "../hooks/useForm";
import AuthContext from "../contexts/authContext";


import * as recipeService from '../services/recipeService';

// Edit Component

export default AddRecipe => {

    const navigate = useNavigate();
    
    const [recipeData, setRecipeData] = useState({});
    const { editRecipe } = useContext(AuthContext);
    const { id } = useParams();
    const { formData, onChange, onSubmit, updateFormData } = useForm(recipeData, editRecipe);
    
    

    useEffect(() => {
        // Editing the recipe with the concrete id
        recipeService.getOneRecipe(id)
            .then(data => {
                const updatedData = {
                    ...data,
                    ingredients: data.ingredients.join('\n'),
                    steps: data.steps.join('\n')
                };
                updateFormData(updatedData);
                setRecipeData(data);
            })
    }, [])

    // Navigating away from the Edit and going back to the component
    function cancelAction() {
        navigate(`/recipes/${id}`);
    }

    return (
        <>
            <div className={blur['blurred']}>
                <div className={blur['overlay']}>
                    <Header />
                </div>
            </div>


                <Form onSubmit={onSubmit} className={recipe['form']}>
                    <div className={recipe['mainDiv']}>
                        <h1 className={recipe['form-title']}>Edit recipe</h1>
                        <div className={recipe['form-elements']}>

                            <Form.Group className={recipe['form-input']}>
                                <Form.Label className={recipe['form-item']} >Name</Form.Label>
                                <Form.Control type="text" placeholder="Food name"   value={formData.food || ''} onChange={onChange} name="food" />
                            </Form.Group>

                            <Form.Group className={recipe['form-input']}>
                                <Form.Label className={recipe['form-item']} >Image</Form.Label>
                                <Form.Control type="text" placeholder="Image" accept="image/*" value={formData.image || ''} onChange={onChange} name="image" />

                            </Form.Group>

                            <Form.Group className={recipe['form-input']} controlId="exampleForm.ControlTextarea1">
                                <Form.Label className={recipe['form-item']} >Ingredients</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formData.ingredients || ''} onChange={onChange} name="ingredients" />
                            </Form.Group>
                            <Form.Group className={recipe['form-input']} controlId="exampleForm.ControlTextarea1">
                                <Form.Label className={recipe['form-item']} >Steps</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formData.steps || ''} onChange={onChange} name="steps" />
                            </Form.Group>

                        </div>

                        <div className={recipe['form-buttons']} style={{ backgroundColor: 'transparent' }}>
                            <Button type="submit" className={`${buttonStyles.button}`}>
                                Edit recipe
                            </Button>
                            <Button type="button" onClick={cancelAction} className={`${buttonStyles.button}`} >
                                Cancel
                            </Button>
                        </div>

                    </div>
                </Form>
        </>
    )
};