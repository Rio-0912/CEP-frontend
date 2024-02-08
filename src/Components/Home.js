import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dept from './Dept';
import Auth from '../Middleware/auth';

const Home = (props) => {
  const history = useNavigate();
  let { showAlert } = props;
  const [authenticated, setAuthenticated] = useState(false);
  const [isPrincipal, setIsPrincipal] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = localStorage.getItem('userId');
      const authority = localStorage.getItem('authority');

      if (userId && authority) {
        // User is authenticated, now check if they have the authority of a principal
        try {
          const response = await axios.post('http://localhost:9000/api/auth/checkPrincipal', {
            userId: userId,
            authority: authenticated
          });

          if (response.data.success && response.data.isPrincipal) {
            // User is authenticated and has the authority of a principal
            setAuthenticated(true);
            setIsPrincipal(true);
          } else {
            // Redirect to the login page if the user is not a principal
            history('/');
          }
        } catch (error) {
          console.error('Error checking principal:', error);
          // Handle error, e.g., redirect to login page
          history('/');
        }
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

  return (
    <>
      <div>
        <div className='container my-3'>
          <Auth />
          {isPrincipal ? <div>Principal Access Granted!</div> : null}
          <Dept showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};

export default Home;
