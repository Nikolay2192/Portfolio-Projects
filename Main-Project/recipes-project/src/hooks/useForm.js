// Custom useForm hook for any type of form

import { useState } from 'react';



export default function useForm(defaultValues, submitHandler) {

    const [formData, setFormData] = useState(defaultValues);

    

    function onChange(e) {
        const { name, value } = e.target;


        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));



    }

    function onSubmit(e) {
        e.preventDefault();
        if (formData.ingredients && formData.steps && typeof formData.ingredients === 'string' && typeof formData.steps === 'string') {
            // Split the ingredients string and the steps string into arrays
            const ingredientsArray = formData.ingredients.split('\n').map(item => item.trim());
            const stepsArray = formData.steps.split('\n').map(item => item.trim());
    
            // Create a new object with the ingredients and steps arrays
            const updatedFormData = {
                ...formData,
                ingredients: ingredientsArray,
                steps: stepsArray,
            };
    
            // Call the submitHandler with the updated form data
            submitHandler(updatedFormData);
        } else {
            // If either ingredients or steps is not defined, submit the form data as it is.
            submitHandler(formData);
        }
    
    }
       function updateFormData(newData) {
        setFormData(prevState => ({
            ...prevState,
            ...newData,
        }));
    }


    return { formData, onChange, onSubmit, updateFormData };

}