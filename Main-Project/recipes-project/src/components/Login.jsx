import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// CSS modules used
import buttonStyles from '../modules/Buttons.module.css';
import loginStyles from '../modules/Login.module.css';
import blur from '../modules/Blur.module.css';
import nav from '../modules/Nav.module.css';


import Header from "./Header";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useForm from "../hooks/useForm";
import AuthContext from '../contexts/authContext';
import Paths from "../paths/Paths";


export default function Login() {

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();


    // Assigning default values for the useForm hook when logging in

    const defaultValues = {
        email: '',
        password: '',
    }


    const { formData, onChange, onSubmit } = useForm(defaultValues, login);

    // Navigate back to Home component
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
            <Form onSubmit={onSubmit} className={loginStyles.form}>
                <div className={loginStyles['mainDiv']}>
                    <h1 className={loginStyles['form-title']}>Login</h1>
                    <div className={loginStyles['form-elements']}>

                        <Form.Group controlId="formBasicEmail" className={loginStyles['form-input']}>
                            <Form.Label style={{ backgroundColor: 'rgb(201, 214, 208)' }}>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={formData.email} />
                            <Form.Text className="text-muted" style={{ backgroundColor: 'rgb(201, 214, 208)' }}>
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className={loginStyles['form-input']}>
                            <Form.Label style={{ backgroundColor: 'rgb(201, 214, 208)' }}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} value={formData.password} />
                        </Form.Group>
                    </div>

                    <div className={loginStyles['form-buttons']}>
                        <Button type="submit" className={`${buttonStyles.button}`}>
                            Sign in
                        </Button>
                        <Button type="button" onClick={cancelAction} className={`${buttonStyles.button}`} >
                            Cancel
                        </Button>
                    </div>
                    <div className={nav['login-nav']}>
                        You don't have an account?
                        <Link to={'/register'}>Click here!</Link>
                    </div>
                </div>
            </Form>


        </>
    )
}