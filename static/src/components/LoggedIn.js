import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { FaBeer } from 'react-icons/fa';

const LoggedIn = () => {
  const [drinks, setDrinks] = useState([]);
  const [drinks2, setDrinks2] = useState([]);

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

        setDrinks(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getDrinks();
  }, []);

  const vote = async (name, type, index) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const formData = new FormData();

      formData.append('name', 'Old Fashioned')

      const response = await fetch(
        `https://gorg.herokuapp.com/api/drinks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        } 
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
        console.log(response);
        setDrinks2({
          ...drinks2,
          ['name']: ['testing'],
        });
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

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
          {drinks.map(function (drink, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{drink.name}</div>
                  <div className="card-body">{drink.name}</div>
                  <div className="card-footer">
                    <a onClick={() => vote(drink.id, "Upvoted", index)}
                      className="btn btn-default float-left">
                      <FaBeer />{drinks2['name']}
                    </a>
                    <small className="text-muted"></small>
                    <a onClick={() => vote(drink.id, "Downvoted", index)}
                      className="btn btn-default float-right">
                      <FaBeer />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
