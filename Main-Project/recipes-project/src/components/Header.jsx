import { useContext } from 'react'
import { Link } from 'react-router-dom';

// CSS styling
import '../general-css/styles.css';
import styles from '../modules/Header.module.css';
import user from '../modules/User.module.css';

import AuthContext from '../contexts/authContext';
import logo from '../images/logo.png';

export default function Header() {

    const { isAuthenticated, email } = useContext(AuthContext);

    return (
        <>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.fullLogo}>
                    <h1 >
                        Cook right
                    </h1>
                    <img src={logo} alt="logo" />
                </div>

                {/* If user is authenticated, show navigation for authenticated users */}
                {isAuthenticated &&
                    <div className={styles.navigation}>
                        <h5 className={user['user']}>Welcome {email}</h5>
                        <Link to="/">Home</Link>
                        <Link to="/recipes">Recipes</Link>
                        <Link to='/logout'>Logout</Link>
                    </div>
                }

                {/* If user is not authenticated, show navigation for non-authenticated users */}
                {!isAuthenticated &&
                    <div className={styles.navigation}>
                        <Link to="/">Home</Link>
                        <Link to="/recipes">Recipes</Link>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </div>
                }
            </header>
        </>
    )
};