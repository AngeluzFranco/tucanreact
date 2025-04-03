import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError('Todos los campos son requeridos');
      return;
    }
  
    const user = await login({ email, password });
  
    if (user) {
      // 🔹 Definir `rolePaths` dentro de la función antes de usarlo
      const rolePaths = {
        admin: '/admin/UserList',
        usuario2: '/usuario2/dashboard', // Ajusta estas rutas según tu aplicación
        usuario3: '/usuario3/dashboard',
      };
  
      const path = rolePaths[user.role] || '/login';
      navigate(path, { replace: true });
    } else {
      setError('Credenciales incorrectas');
    }
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
                  placeholder="usuario1@example.com"
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
                  placeholder="123456"
                  required
                />
              </div>
            </div>

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>

            <div className="login-hint">
              <p>Usuarios de prueba:</p>
              <ul>
                <li>usuario1@example.com</li>
                <li>usuario2@example.com</li>
                <li>usuario3@example.com</li>
              </ul>
              <p>Contraseña para todos: 123456</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;