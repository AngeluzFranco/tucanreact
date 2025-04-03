import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
//import Layout from "./Layout";
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

//components
import UserList from './admin/UserList';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<div>No tienes permisos para acceder a esta página</div>} />

        <Route element={<ProtectedRoute allowedRoles={['admin', 'usuario2', 'usuario3']} />}>
          <Route path="/admin/userlist" element={<UserList />} />  {/* ✅ Aquí ya no necesitas otro <ProtectedRoute> */}

          {/* Espacio para agregar las rutas de usuario2 y usuario3 */}
          {/* <Route path="/usuario2/dashboard" element={<SomeComponent />} /> */}
          {/* <Route path="/usuario3/dashboard" element={<AnotherComponent />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </AuthProvider>
  );
}

export default App;
