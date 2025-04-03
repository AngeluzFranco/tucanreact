import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Sidebar from './Sidebar';
import UserTable from './UserTable';
import Swal from 'sweetalert2';
import '../assets/UserList.css';

function UserL() {
  const [selectedMenu, setSelectedMenu] = useState('usuarios');
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@gmail.com', username: 'admin', role: 'Administrador' },
    { id: 2, email: 'coach1@gmail.com', username: 'coach1', role: 'Entrenador' },
    { id: 3, email: 'coach2@gmail.com', username: 'coach2', role: 'Entrenador' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    username: '',
    role: 'Entrenador' // Valor por defecto
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación simple
    if (!newUser.email || !newUser.password || !newUser.username) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios!',
      });
      return;
    }


    const userToAdd = {
      id: users.length + 1,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role
    };

    // Agregar a la lista
    setUsers([...users, userToAdd]);
    
    // Cerrar modal y resetear formulario
    setIsModalOpen(false);
    setNewUser({
      email: '',
      password: '',
      username: '',
      role: 'Entrenador'
    });

    // Mostrar notificación de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Usuario creado!',
      text: 'El usuario ha sido agregado correctamente.',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="app">
      <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} />
      <div className="main-content">
        <div className="header">
          <h1>Usuarios</h1>
          <button className="add-button" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={20} />
            AGREGAR
          </button>
        </div>
        <UserTable users={users} />

        {/* Modal para agregar usuario */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Agregar Nuevo Usuario</h2>
                <button onClick={() => setIsModalOpen(false)} className="close-button">
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nombre de Usuario</label>
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="role-select"
                  >
                    <option value="">Selecciona un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Entrenador">Entrenador</option>
                    <option value="Atleta">Dueño</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="cancel-button">
                    Cancelar
                  </button>
                  <button type="submit" className="submit-button">
                    Crear Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserL;