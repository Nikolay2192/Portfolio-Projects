import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// CSS styling
import buttonStyles from '../modules/Buttons.module.css';
import registerStyles from '../modules/Register.module.css';
import blur from '../modules/Blur.module.css';
import nav from '../modules/Nav.module.css';


import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Paths from "../paths/Paths";
import useForm from "../hooks/useForm";
import AuthContext from "../contexts/authContext";



export default function Register() {

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    // Assigning default values for the useForm hook when registering

    const defaultValues = {
        username: '',
        email: '',
        password: '',
    }

    // { formData, onChange, onSubmit } - These are the values/functions that i get after the useForm hook is used

    const { formData, onChange, onSubmit } = useForm(defaultValues, register);

    // Cancel the registering and redirecting to the Home page
    function cancelAction() {
        navigate(Paths.Home);
    }

    return (
        <>
            <div className={blur['blurred']}>
                <div className={blur['overlay']}>
                    <Header />
                </div>
            </div>
            <Form onSubmit={onSubmit} className={registerStyles.form}>
                <div className={registerStyles['mainDiv']}>
                    <h1 className={registerStyles['form-title']}>Register</h1>
                    <div className={registerStyles['form-elements']}>
                        {/* Input for username */}
                        <Form.Group controlId="username" className={registerStyles['form-input']}>
                            <Form.Label >Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={onChange} />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                        {/* Input for email */}
                        <Form.Group controlId="formBasicEmail" className={registerStyles['form-input']}>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={onChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        {/* Input for password */}
                        <Form.Group controlId="formBasicPassword" className={registerStyles['form-input']}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={onChange} />
                        </Form.Group>
                    </div>

                    <div className={registerStyles['form-buttons']}>
                        <Button type="submit" className={`${buttonStyles.button}`}>
                            Create Profile
                        </Button>
                        <Button type="button" onClick={cancelAction} className={`${buttonStyles.button}`} >
                            Cancel
                        </Button>
                    </div>
                    <div className={nav['register-nav']}>
                        You have an account?
                        <Link to={'/login'} >Click here!</Link>
                    </div>
                </div>
            </Form>
        </>
    )
}