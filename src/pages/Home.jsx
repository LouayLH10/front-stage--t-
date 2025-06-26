import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const { name, email } = location.state || {};

  if (!name || !email) {
    // Pas d'infos : revenir au login
    return <p>loading ...</p>;
  }

  return (
    <div className="container">
      <h2>Bienvenue {name}</h2>
      <p>Email : {email}</p>
    </div>
  );
}

export default Home;
