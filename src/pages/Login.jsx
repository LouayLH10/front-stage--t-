import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../ui/ui.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Connexion email/mot de passe
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);

      // Redirection vers /home avec les infos utilisateur
      navigate('/', {
        state: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  // Réception des données de la fenêtre Google (via postMessage)
  useEffect(() => {
    const listener = (event) => {
      if (event.origin !== 'http://127.0.0.1:8000') return;

      const { name, email, token } = event.data;

      if (token && name && email) {
        localStorage.setItem('token', token);

        // Redirection vers /home avec les infos Google
        navigate('/', {
          state: {
            name,
            email,
          },
        });
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [navigate]);

  // Lancer connexion Google
  const handleGoogleLogin = () => {
    window.open(
      'http://127.0.0.1:8000/auth/google',
      '_blank',
      'width=500,height=600'
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-3 fw-bold">Login</h5>

              <form onSubmit={handleLogin}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="rememberPasswordCheck" />
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <div className="text-center mb-3">
                  <a href="/register">Don't have an account? Register</a>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                    Sign in
                  </button>
                </div>
              </form>

              <hr className="my-4" />

              <div className="d-grid mb-2">
                <button
                  onClick={handleGoogleLogin}
                  className="btn btn-google btn-login text-uppercase fw-bold"
                >
                  <i className="fab fa-google me-2"></i> Sign in with Google
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
