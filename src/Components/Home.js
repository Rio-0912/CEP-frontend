import React, { useEffect, useState } from 'react';


import { useNavigate } from 'react-router-dom';

import Dept from './Dept';

const Home = (props) => {
  const history = useNavigate();
  let { showAlert } = props
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

  return (
    <>
      <div >

        <div className='container my-3'>
          <h4>Welcome {welcome}</h4>
          
          <Dept showAlert={showAlert} />
        </div>
      </div>

    </>
  );
};

export default Home;
