import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Usuarios predefinidos
  const predefinedUsers = {
    'usuario1@example.com': { password: '123456', role: 'admin', name: 'Usuario Administrador' },
    'usuario2@example.com': { password: '123456', role: 'usuario2', name: 'Usuario2' },
    'usuario3@example.com': { password: '123456', role: 'usuario3', name: 'Usuario3' }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (credentials) => {
    const userData = predefinedUsers[credentials.email];
    if (userData && credentials.password === userData.password) {
      const authenticatedUser = {
        email: credentials.email,
        role: userData.role,
        name: userData.name
      };
      setUser(authenticatedUser);
      localStorage.setItem('user', JSON.stringify(authenticatedUser));
      return authenticatedUser;
    }
    return null;
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};