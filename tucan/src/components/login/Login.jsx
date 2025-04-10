import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';
import imagenTucan from '../../assets/tucanapp.png';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Configuración de roles y rutas
  const roleConfig = {
    'admin@gmail.com': { 
      role: 'admin', 
      path: '/admin/dashboard',
      name: 'Administrador'
    },
    'entrenador@gmail.com': { 
      role: 'entrenador', 
      path: '/entrenador/dashboard',
      name: 'Entrenador'
    },
    'oficialia@gmail.com': { 
      role: 'oficialia', 
      path: '/oficialia-partes',
      name: 'Oficialía'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciando login..."); // Debug 1
    
    try {
      const userConfig = roleConfig[credentials.email];
      console.log("Config encontrada:", userConfig); // Debug 2
      
      if (!userConfig) throw new Error("Email no reconocido");
      
      const userData = {
        email: credentials.email,
        role: userConfig.role,
        name: userConfig.name
      };
      
      console.log("Datos a guardar:", userData); // Debug 3
      login(userData); // Función de AuthContext
      
      console.log("Redirigiendo a:", userConfig.path); // Debug 4
      navigate(userConfig.path, { replace: true });
      
    } catch (error) {
      console.error("Error en login:", error); // Debug 5
      setError(error.message);
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
            
            <div className="form-footer">
              <a href="/recuperar" className="forgot-link">
              Recuperar contraseña
              </a>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;