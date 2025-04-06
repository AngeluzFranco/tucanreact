import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import EntrenadorLayout from "./layouts/EntrenadorLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Páginas
import DashboardA from './pages/admin/dashboard/dashboard';
import CalendarioA from './pages/admin/calendario/calendario';
// import UsuariosA from './pages/admin/usuarios/Usuarios';
import EstadisticasA from './pages/admin/estadisticas/Estadisticas';

import Dashboard from './pages/entrenadores/dashboard/dashboard';
import Calendario from './pages/entrenadores/calendario/calendario';
import Estadisticas from './pages/entrenadores/estadisticas/Estadisticas';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas admin*/}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardA />} />
            <Route path="calendario" element={<CalendarioA />} />
            {/* <Route path="usuarios" element={<UsuariosA />} /> */}
            <Route path="estadisticas" element={<EstadisticasA />} />
          </Route>
        </Route>

        {/* Rutas protegidas Entrenador*/}
        <Route element={<ProtectedRoute allowedRoles={['entrenador']} />}>
          <Route path="/entrenador" element={<EntrenadorLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendario" element={<Calendario />} />
            <Route path="estadisticas" element={<Estadisticas />} />
          </Route>
        </Route>

        {/* Redirección para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;