import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./slidebar.css";

const SilidebarAdmin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // Configuración de items del menú
  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "🏆",
      label: "Equipos"
    },
    {
      path: "/admin/calendario",
      icon: "📅",
      label: "Calendario"
    },
    {
      path: "/admin/usuarios",
      icon: "👤",
      label: "Usuarios"
    }
  ];
  return (
    <aside className="sidebar-entrenador">
      <header className="sidebar-header">
        <div className="app-logo">
          <h3>Tucaan App</h3>
          <small>Entrenador</small>
        </div>
      </header>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
        <button 
          className="logout-button"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
        >
          <span className="logout-icon">⎋</span>
        </button>
      </footer>
    </aside>
  );
};

export default SilidebarAdmin;