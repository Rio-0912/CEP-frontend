// auth.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const navigate = useNavigate('');
    const [authenticated, setAuthenticated] = useState(false);
    const [welcome, setWelcome] = useState('');

    useEffect(() => {
        const checkAuthentication = async () => {
            const userId = localStorage.getItem('userId');
            const authority = localStorage.getItem('authority');
            const departmentId = localStorage.getItem('departmentId');

            if ((userId && authority)) {

                setAuthenticated(true);
                console.log(welcome);
                setWelcome(localStorage.getItem('authority'));
            } else if (departmentId) {
                setAuthenticated(true);

                setWelcome('HOD');
            }
            else {
                navigate('/');
            }
        };



        checkAuthentication();
    }, [navigate, welcome]);

    if (!authenticated) {
        return null;
    }

    return (
        <div>
            Welcome {welcome}
        </div>
    );
};

export default Auth;
