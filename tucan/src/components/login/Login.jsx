import React, { useState, useContext } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import imagenTucan from '../../assets/tucanapp.png';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8000/api/users/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Credenciales incorrectas');
      }

      const data = await response.json();
      const userData = {
        token: data.access,
        email: credentials.email,
        role: data.rol,
        username: data.username
      };

      localStorage.setItem('auth', JSON.stringify(userData));
      setUser(userData);

      const redirectPath = {
        'admin': '/admin/dashboard',
        'entrenador': '/entrenador/dashboard'
      }[data.rol] || '/';

      navigate(redirectPath);

    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(credentials);
    } catch (error) {
      setError(error.message || 'Error al iniciar sesión');
      console.error("Error de login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="welcome-panel">
        <img src={imagenTucan} alt="Logo Tucaan App" className="logo-image" />
        <p className="welcome-text">Gestión de equipos y entrenadores</p>
      </div>

      <div className="form-panel">
        <div className="form-container">
          <h2 className="form-title">Iniciar Sesión</h2>
          
          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="ejemplo@dominio.com"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ingresa tu contraseña"
                  required
                  autoComplete="current-password"
                  minLength="6"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>

            <div className="form-footer">
              <a href="#recovery" className="forgot-link">
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