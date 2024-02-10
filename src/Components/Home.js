import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Dept from './Dept';
import Auth from '../Middleware/auth';
const Home = (props) => {
  const history = useNavigate();
  let { showAlert } = props;
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = localStorage.getItem('userId');
      const authority = localStorage.getItem('authority');

      if (userId && authority) {
        try {
          const response = await axios.post('http://localhost:9000/api/auth/checkPrincipal', {
            userId: userId,
            authority: authenticated,
          });
console.log('i am here ');
          if (response.data.success && response.data.isPrincipal) {
            setAuthenticated(true);
            console.log('i am here authetication rtye');
          } else {
            history('/');
          }
        } catch (error) {
          console.error('Error checking principal:', error);
          history('/');
        }
      } else {
        history('/');
      }
    };

    checkAuthentication();
  }, [history, authenticated]);

  if (!authenticated) {
    history('/');
    return null;
  }

  return (
    <>
      <div>
        <div className='container my-3'>
          <Auth />
          <Dept showAlert={showAlert} />
        </div>
      </div>
    </>
  );
};

export default Home;