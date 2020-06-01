import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { FaBeer } from 'react-icons/fa';

const LoggedIn = () => {
  const [voted, setVoted] = useState(['']);
  const [products, setProducts] = useState([
    {
      id: 1,
      Name: "Negroni",
      Slug: "negroni",
      Description:
        "Negroni drink",
    },
  ]);

  const { getTokenSilently, loading, user, logout, isAuthenticated } = useAuth0();

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
          {products.map(function (product) {
            return (
              <div className="col-sm-4">
                <div className="card">
                  <div className="card-header">
                    {product.Name}
                    <span className="float-left">{voted}</span>
                  </div>
                  <div className="card-body">{product.Description}</div>
                  <div className="card-footer">
                    <a onClick={() => vote("Upvoted")} className="btn btn-default float-left">
                        <FaBeer />
                    </a>
                    <a onClick={() => vote("Downvoted")} className="btn btn-default float-right">
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
