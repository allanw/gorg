import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { FaBeer } from 'react-icons/fa';

const LoggedIn = () => {
  const [drinks, setDrinks] = useState([]);

  const { getTokenSilently, loading, user, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getDrinks = async () => {
      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch("https://gorg.herokuapp.com/api/drinks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
	console.log(responseData)

        setDrinks(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getDrinks();
  }, []);

  const vote = (type) => {
    alert(type);
  }

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        {isAuthenticated && <span className="btn btn-primary float-right" onClick={() => logout()}>Log out</span>}
        <h1>Gorg</h1>
        <p>
          Hi, {user.firstname}! 
        </p>
        <div className="row">
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
