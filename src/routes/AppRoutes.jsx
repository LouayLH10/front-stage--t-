import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        {/* Ici tu pourras ajouter d'autres routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
