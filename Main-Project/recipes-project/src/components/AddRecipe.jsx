import { useNavigate } from "react-router-dom";
import { useContext } from "react";


// CSS styling
import blur from '../modules/Blur.module.css';
import buttonStyles from '../modules/Buttons.module.css';
import recipe from '../modules/AddRecipe.module.css';


import Header from "./Header";
import useForm from "../hooks/useForm";
import AuthContext from "../contexts/authContext";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Paths from "../paths/Paths";

export default AddRecipe => {

    const { create } = useContext(AuthContext);
    const navigate = useNavigate();

    // Default values for form fields
    const defaultValues = {
        food: '',
        image: '',
        ingredients: [],
        steps: [],
    }
    // Destructuring formData, onChange, onSubmit from useForm hook
    const { formData, onChange, onSubmit } = useForm(defaultValues, create);

    // Function to cancel adding a recipe and navigate to Recipes page
    function cancelAction() {
        navigate(Paths.Recipes);
    }

    return (
        <>
            {/* Blurred background with Header component */}
            <div className={blur['blurred']}>
                <div className={blur['overlay']}>
                    <Header />
                </div>
            </div>

            <Form onSubmit={onSubmit} className={recipe['form']}>
                <div className={recipe['mainDiv']}>
                    <h1 className={recipe['form-title']}>Add recipe</h1>
                    <div className={recipe['form-elements']}>

                        {/* Input field for food name */}
                        <Form.Group className={recipe['form-input']}>
                            <Form.Label className={recipe['form-item']} >Name</Form.Label>
                            <Form.Control type="text" placeholder="Food name" name='food' onChange={onChange} value={formData.food} />
                        </Form.Group>

                        {/* Input field for image URL */}
                        <Form.Group className={recipe['form-input']}>
                            <Form.Label className={recipe['form-item']} >Image</Form.Label>
                            <Form.Control type="text" placeholder="Paste image URL here" accept="image/*" name='image' onChange={onChange} value={formData.image} />
                        </Form.Group>

                        {/* Textarea for ingredients */}
                        <Form.Group className={recipe['form-input']} controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={recipe['form-item']} >Ingredients</Form.Label>
                            <Form.Control as="textarea" rows={3} name="ingredients" onChange={onChange} value={formData.ingredients} />
                        </Form.Group>

                        {/* Textarea for steps */}
                        <Form.Group className={recipe['form-input']} controlId="exampleForm.ControlTextarea1">
                            <Form.Label className={recipe['form-item']}  >Steps</Form.Label>
                            <Form.Control as="textarea" rows={3} name="steps" onChange={onChange} value={formData.steps} />
                        </Form.Group>

                    </div>

                    {/* Buttons for adding recipe and canceling */}
                    <div className={recipe['form-buttons']} style={{ backgroundColor: 'transparent' }}>
                        <Button type="submit" className={`${buttonStyles.button}`}>
                            Add recipe
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