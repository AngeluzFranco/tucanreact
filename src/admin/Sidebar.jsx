import React from 'react';
import { Users, Users2, Calendar } from 'lucide-react';
import '../assets/Sidebar.css'; // Asegúrate de que la ruta sea correcta

function Sidebar({ selectedMenu, setSelectedMenu }) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <h2 className="sidebar-title">Dashboard</h2>
        <nav>
          <button
            className={`menu-item ${selectedMenu === 'equipos' ? 'selected' : ''}`}
            onClick={() => setSelectedMenu('equipos')}
          >
            <Users2 size={20} />
            Equipos
          </button>
          <button
            className={`menu-item ${selectedMenu === 'usuarios' ? 'selected' : ''}`}
            onClick={() => setSelectedMenu('usuarios')}
          >
            <Users size={20} />
            Usuarios
          </button>
          <button
            className={`menu-item ${selectedMenu === 'eventos' ? 'selected' : ''}`}
            onClick={() => setSelectedMenu('eventos')}
          >
            <Calendar size={20} />
            Eventos
          </button>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;