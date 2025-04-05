import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('La contraseña es requerida');
      return;
    }

    let userRole = '';
    let redirectPath = '';

    // Solo permitimos admin y oficialia
    const roles = {
      'admin@gmail.com': { role: 'admin', path: '/entrenador/dashboard' },
      'presidente@gmail.com': { role: 'presidente', path: '/presidente-colonia/reparaciones' },
      'oficialia@gmail.com': { role: 'oficialia', path: '/oficialia-partes' },
    };

    if (!roles[email]) {
      setError('Acceso denegado. Usuario no autorizado.');
      return;
    }

    userRole = roles[email].role;
    redirectPath = roles[email].path;

    const userData = {
      email,
      role: userRole,
      name: email.split('@')[0],
    };

    login(userData);
    navigate(redirectPath, { replace: true }); // Evita volver al login con "atrás"
  };

  return (
    <div className="login-container">
      <div className="welcome-panel">
        <h1 className="welcome-title">Bienvenido a nuestro sistema</h1>
      </div>

      <div className="form-panel">
        <div className="form-container">
          <h2 className="form-title">Iniciar Sesión</h2>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="Ingresa tu contraseña"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>

            <div className="forgot-password">
              <a href="#olvide" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
