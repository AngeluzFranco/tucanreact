import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Componentes
import Calendario from './pages/entrenadores/calendario';
import Dashboard from './pages/entrenadores/dashboard';
import Estadisticas from './pages/entrenadores/estadisticas';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
            <Route path="/entrenador/dashboard" element={<Dashboard />} />
            <Route path="/entrenador/calendario" element={<Calendario />} />
            <Route path="/entrenador/estadisticas" element={<Estadisticas />} />
          </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
