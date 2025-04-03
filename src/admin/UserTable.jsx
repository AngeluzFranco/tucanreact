import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PencilLine, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import '../assets/UserTable.css';

// Configuración del modal (solo en el lado del cliente)
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

function UserTable({ users, onUpdateUser, onDeleteUser }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    email: '',
    role: ''
  });

  // Manejo del estado del modal
  useEffect(() => {
    if (isEditModalOpen || isDeleteModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [isEditModalOpen, isDeleteModalOpen]);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setUpdatedUserData({
      name: user.name || '',
      email: user.email || '',
      role: user.role || ''
    });
    setEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const closeModals = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedUser(null);
    setUpdatedUserData({
      name: '',
      email: '',
      role: ''
    });
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: '¡Éxito!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      timer: 3000,
      timerProgressBar: true,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Entendido',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateUser = async () => {
    if (!updatedUserData.name || !updatedUserData.email || !updatedUserData.role) {
      showErrorAlert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUserData.email)) {
      showErrorAlert('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      await onUpdateUser(selectedUser.id, updatedUserData);
      showSuccessAlert('Usuario actualizado correctamente');
      closeModals();
    } catch (error) {
      showErrorAlert(error.message || 'Ocurrió un error al actualizar el usuario');
    }
  };

  const handleDeleteUser = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      html: `Vas a eliminar al usuario:<br><b>${selectedUser?.name}</b><br>(${selectedUser?.email})`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await onDeleteUser(selectedUser.id);
        showSuccessAlert(`Usuario "${selectedUser.name}" eliminado correctamente`);
        closeModals();
      } catch (error) {
        showErrorAlert(error.message || 'Ocurrió un error al eliminar el usuario');
      }
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="actions">
                <button 
                  className="edit-button" 
                  onClick={() => openEditModal(user)}
                  aria-label={`Editar usuario ${user.name}`}
                >
                  <PencilLine size={20} />
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => openDeleteModal(user)}
                  aria-label={`Eliminar usuario ${user.name}`}
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Edición */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeModals}
        contentLabel="Formulario de edición de usuario"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={true}
        shouldFocusAfterRender={true}
        shouldReturnFocusAfterClose={true}
      >
        <h2>Editar Usuario</h2>
        <div className="form-group">
          <label htmlFor="edit-name">Nombre: <span className="required">*</span></label>
          <input
            id="edit-name"
            type="text"
            name="name"
            value={updatedUserData.name || ''}
            onChange={handleInputChange}
            aria-required="true"
            placeholder="Ingrese el nombre completo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-email">Correo: <span className="required">*</span></label>
          <input
            id="edit-email"
            type="email"
            name="email"
            value={updatedUserData.email || ''}
            onChange={handleInputChange}
            aria-required="true"
            placeholder="ejemplo@dominio.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit-role">Rol: <span className="required">*</span></label>
          <select
            id="edit-role"
            name="role"
            value={updatedUserData.role || ''}
            onChange={handleInputChange}
            aria-required="true"
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
            <option value="editor">Dueño</option>
          </select>
        </div>
        <div className="modal-actions">
          <button 
            className="cancel-button" 
            onClick={closeModals}
            aria-label="Cancelar edición"
          >
            Cancelar
          </button>
          <button 
            className="save-button" 
            onClick={handleUpdateUser}
            aria-label="Guardar cambios"
          >
            Guardar Cambios
          </button>
        </div>
      </Modal>

      {/* Modal de Eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeModals}
        contentLabel="Confirmación de eliminación de usuario"
        className="modal"
        overlayClassName="modal-overlay"
        ariaHideApp={true}
        shouldFocusAfterRender={true}
        shouldReturnFocusAfterClose={true}
      >
        <h2>Eliminar Usuario</h2>
        <p>¿Estás seguro de que deseas eliminar a <b>{selectedUser?.name}</b> ({selectedUser?.email})?</p>
        <p>Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button 
            className="cancel-button" 
            onClick={closeModals}
            aria-label="Cancelar eliminación"
          >
            Cancelar
          </button>
          <button 
            className="confirm-delete" 
            onClick={handleDeleteUser}
            aria-label="Confirmar eliminación"
          >
            Confirmar Eliminación
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default UserTable;