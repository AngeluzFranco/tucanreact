// components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "Administrador" },
    { id: 2, name: "María García", email: "maria.garcia@example.com", role: "Entrenador" },
    { id: 3, name: "Carlos López", email: "carlos.lopez@example.com", role: "Usuario" },
    { id: 4, name: "Ana Martínez", email: "ana.martinez@example.com", role: "Entrenador" }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'Administrador': return 'badge-admin';
      case 'Entrenador': return 'badge-coach';
      default: return 'badge-user';
    }
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
      toast.error('Por favor complete todos los campos');
      return;
    }
    
    if (newUser.password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const user = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      ...newUser
    };
    
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', password: '', role: '' });
    toast.success('Usuario agregado correctamente');
  };

  const handleEditUser = () => {
    if (!currentUser.name || !currentUser.email || !currentUser.role) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    setUsers(users.map(u => u.id === currentUser.id ? currentUser : u));
    setShowEditModal(false);
    toast.success('Usuario actualizado correctamente');
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(u => u.id !== currentUser.id));
    setShowDeleteModal(false);
    toast.success('Usuario eliminado correctamente');
  };

  return (
    <div className="content w-100">
      <header className="d-flex justify-content-end bg-white p-1 mb-4 rounded shadow">
        <div className="d-flex align-items-center gap-3">
          <Button variant="light" className="position-relative p-2">
            <i className="fas fa-bell"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">3</span>
          </Button>
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" 
            className="rounded-circle header-profile" 
            alt="Profile"
          />
          <span>Admin</span>
        </div>
      </header>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Usuarios</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus me-1"></i> AGREGAR
        </Button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <Table hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <Badge className={getRoleBadgeClass(user.role)}>{user.role}</Badge>
                    </td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        onClick={() => {
                          setCurrentUser(user);
                          setShowEditModal(true);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="ms-2"
                        onClick={() => {
                          setCurrentUser(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal Agregar */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control 
                type="text" 
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                required 
              />
            </Form.Group>
            {/* Otros campos similares */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleAddUser}>Guardar Usuario</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Editar */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        {/* Similar al modal de agregar pero con currentUser */}
      </Modal>

      {/* Modal Eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="bottom-end" />
    </div>
  );
}

export default UserManagement;