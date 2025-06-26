import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../ui/ui.css';
import axios from 'axios';
// Import du hook de navigation
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setname] = React.useState('');
  const [password_confirmation, setpassword_confirmation] = React.useState('');
  
  // ✅ useNavigate ici, dans le composant
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, password, name, password_confirmation };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', data);
      console.log('Inscription réussie:', response.data);
      
      // ✅ Redirection après succès
      navigate('/login', {
        state: { message: 'Inscription réussie ! Veuillez vous connecter.' }
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.response?.data || error.message);
      console.log(data);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-3 fw-bold">Register</h5>
              <form onSubmit={handleRegister}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingName">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingEmail">Email address</label>
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
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPasswordConfirmation"
                    placeholder="Confirm Password"
                    value={password_confirmation}
                    onChange={(e) => setpassword_confirmation(e.target.value)}
                    required
                  />
                  <label htmlFor="floatingPasswordConfirmation">Confirm Password</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-success btn-login text-uppercase fw-bold" type="submit">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
