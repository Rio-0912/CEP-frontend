// auth.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const history = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
            const userId = localStorage.getItem('userId');
            const authority = localStorage.getItem('authority');
            const departmentId = localStorage.getItem('departmentId');

            if ((userId && authority) || departmentId) {
                // User is authenticated
                setAuthenticated(true);
            } else {
                // Redirect to the login page if any of the required credentials is missing
                history('/');
            }
        };

        checkAuthentication();
    }, [history]);

    if (!authenticated) {
        // Display a loading spinner or some other indicator while checking authentication
        return null;
    }

    let welcome = localStorage.getItem('authority');

    // Return JSX or null based on your needs
    return (
        <div>
           Welcome {welcome}
        </div>
    );
};

export default Auth;
