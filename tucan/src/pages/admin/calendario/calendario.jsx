import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './calendario.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faUsers, faCalendar, faMapMarkerAlt, faBasketball, faFutbol, faEllipsisV, faPlus, faPencilAlt, faTrashAlt, faTimes, faSearch, faBell } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Calendario = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    sport: '',
    team1: '',
    team2: ''
  });

  const initialEvents = [
    {
      id: 'evento1',
      title: 'Torneo de Baloncesto',
      date: '9 de diciembre de 2023',
      time: '18:00',
      location: 'Polideportivo Central',
      sport: 'Baloncesto',
      team1: 'Halcones Basketball',
      team2: 'Lakers Club',
      status: 'upcoming'
    },
    {
      id: 'evento2',
      title: 'Partido de Liga',
      date: '14 de diciembre de 2023',
      time: '15:00',
      location: 'Estadio Principal',
      sport: 'Fútbol',
      team1: 'Real Madrid FC',
      team2: 'Tigres FC',
      status: 'upcoming'
    },
  ];

  const [events, setEvents] = useState(initialEvents);

  const toggleDropdown = (id, e) => {
    if (e) e.stopPropagation();
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const handleEditClick = (event, e) => {
    if (e) e.stopPropagation();
    setEditingEvent({ ...event });
    setShowEditModal(true);
    setOpenDropdownId(null);
  };

  const handleDeleteClick = (eventId, e) => {
    if (e) e.stopPropagation();
    setOpenDropdownId(null);

    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setEvents(events.filter(event => event.id !== eventId));

        Swal.fire(
          '¡Eliminado!',
          'El evento ha sido eliminado.',
          'success'
        );
      }
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEvents(events.map(event =>
      event.id === editingEvent.id ? editingEvent : event
    ));
    setShowEditModal(false);
  };

  const handleAddEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveNewEvent = () => {
    const newEventWithId = {
      ...newEvent,
      id: `evento${events.length + 1}`,
      status: 'upcoming'
    };
    setEvents([...events, newEventWithId]);
    setShowAddModal(false);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      sport: '',
      team1: '',
      team2: ''
    });
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar" style={{
        width: '250px',
        backgroundColor: '#1e40af',
        color: 'white',
        padding: '1.5rem',
        position: 'fixed',
        height: '100vh',
        zIndex: 40
      }}>
        <div className="brand mb-8">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Tucaap</h2>
        </div>
        <div className="sidebar-menu">
          <button className="nav-button active">
            <FontAwesomeIcon icon={faTrophy} />
            <span>Equipos</span>
          </button>
          <button className="nav-button">
            <FontAwesomeIcon icon={faUsers} />
            <span>Usuarios</span>
          </button>
          <button className="nav-button">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Eventos</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>Eventos Deportivos</h1>
            
            <div className="user-section">
              <div className="notification-container">
                <FontAwesomeIcon icon={faBell} size="lg" />
                <div className="notification-badge">3</div>
              </div>
              <div className="user-profile">
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="User" 
                  className="user-avatar"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="main-area">
          <div className="content-container">
            {/* Próximos Eventos */}
            <div className="section-header">
              <FontAwesomeIcon icon={faCalendar} style={{ color: '#3b82f6', fontSize: '1.25rem' }} />
              <h2 className="section-title">Próximos Eventos</h2>
              <button 
                className="nav-button" 
                onClick={() => setShowAddModal(true)}
                style={{
                  marginLeft: 'auto',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem'
                }}
              >
                <FontAwesomeIcon icon={faPlus} /> Agregar Evento
              </button>
            </div>

            <div className="matches-grid">
              {events.filter(event => event.status === 'upcoming').map((event) => (
                <div className="match-card" key={event.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>{event.title}</h3>
                    <div className="dropdown-container" style={{ position: 'relative' }}>
                      <button 
                        className="nav-button" 
                        onClick={(e) => toggleDropdown(event.id, e)}
                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                      {openDropdownId === event.id && (
                        <div 
                          className="custom-dropdown" 
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            borderRadius: '0.5rem',
                            zIndex: 50,
                            minWidth: '120px'
                          }}
                        >
                          <button 
                            className="nav-button" 
                            onClick={(e) => handleEditClick(event, e)}
                            style={{ 
                              width: '100%', 
                              justifyContent: 'flex-start',
                              color: '#4b5563',
                              padding: '0.5rem 1rem'
                            }}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '0.5rem' }} />
                            <span>Editar</span>
                          </button>
                          <button 
                            className="nav-button" 
                            onClick={(e) => handleDeleteClick(event.id, e)}
                            style={{ 
                              width: '100%', 
                              justifyContent: 'flex-start',
                              color: '#ef4444',
                              padding: '0.5rem 1rem'
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="match-info">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{event.date} - {event.time}</span>
                  </div>
                  <div className="match-info">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{event.location}</span>
                  </div>
                  <div className="match-info">
                    <FontAwesomeIcon icon={event.sport === 'Baloncesto' ? faBasketball : faFutbol} />
                    <span>{event.sport}</span>
                  </div>

                  <div className="match-teams" style={{ marginTop: '1.5rem' }}>
                    <div className="team-name">{event.team1}</div>
                    <div className="vs-text">vs</div>
                    <div className="team-name">{event.team2}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Eventos Finalizados */}
            <div style={{ marginTop: '3rem' }}>
              <div className="section-header">
                <FontAwesomeIcon icon={faTrophy} style={{ color: '#3b82f6', fontSize: '1.25rem' }} />
                <h2 className="section-title">Eventos Finalizados</h2>
              </div>

              <div className="matches-grid">
                <div className="match-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>Clásico Regional</h3>
                    <div className="dropdown-container" style={{ position: 'relative' }}>
                      <button 
                        className="nav-button" 
                        onClick={(e) => toggleDropdown('evento3', e)}
                        style={{ padding: '0.5rem', borderRadius: '50%' }}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                      {openDropdownId === 'evento3' && (
                        <div 
                          className="custom-dropdown" 
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: 0,
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            borderRadius: '0.5rem',
                            zIndex: 50,
                            minWidth: '120px'
                          }}
                        >
                          <button 
                            className="nav-button" 
                            onClick={(e) => handleEditClick({
                              id: 'evento3',
                              title: 'Clásico Regional',
                              date: '27 de noviembre de 2023',
                              time: '15:00',
                              location: 'Estadio Municipal',
                              sport: 'Fútbol',
                              team1: 'Real Madrid FC',
                              team2: 'Lakers Club',
                              status: 'finished',
                              score1: '2',
                              score2: '1',
                              result: 'victory-1'
                            }, e)}
                            style={{ 
                              width: '100%', 
                              justifyContent: 'flex-start',
                              color: '#4b5563',
                              padding: '0.5rem 1rem'
                            }}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} style={{ marginRight: '0.5rem' }} />
                            <span>Editar</span>
                          </button>
                          <button 
                            className="nav-button" 
                            onClick={(e) => handleDeleteClick('evento3', e)}
                            style={{ 
                              width: '100%', 
                              justifyContent: 'flex-start',
                              color: '#ef4444',
                              padding: '0.5rem 1rem'
                            }}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} style={{ marginRight: '0.5rem' }} />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="match-info">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>27 de noviembre de 2023</span>
                  </div>
                  <div className="match-info">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>Estadio Municipal</span>
                  </div>
                  <div className="match-info">
                    <FontAwesomeIcon icon={faFutbol} />
                    <span>Fútbol</span>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span className="team-name">Real Madrid FC</span>
                      <span style={{ 
                        backgroundColor: '#dbeafe',
                        color: '#1d4ed8',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}>2 - Victoria</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span className="team-name">Lakers Club</span>
                      <span style={{ color: '#6b7280' }}>1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddModal && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }} onClick={() => setShowAddModal(false)}>
            <div className="match-card" style={{
              width: '100%',
              maxWidth: '600px',
              margin: '0 1rem',
              transform: 'none'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Agregar Nuevo Evento</h3>
                <button onClick={() => setShowAddModal(false)} style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <form>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Nombre del Evento</label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    name="title"
                    value={newEvent.title}
                    onChange={handleAddEventChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Equipo Local</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="team1"
                      value={newEvent.team1}
                      onChange={handleAddEventChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Equipo Visitante</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="team2"
                      value={newEvent.team2}
                      onChange={handleAddEventChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Fecha</label>
                    <input
                      type="date"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="date"
                      value={newEvent.date}
                      onChange={handleAddEventChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Hora</label>
                    <input
                      type="time"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="time"
                      value={newEvent.time}
                      onChange={handleAddEventChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Ubicación</label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    name="location"
                    value={newEvent.location}
                    onChange={handleAddEventChange}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Deporte</label>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      backgroundColor: 'white'
                    }}
                    name="sport"
                    value={newEvent.sport}
                    onChange={handleAddEventChange}
                    required
                  >
                    <option value="">Seleccionar deporte...</option>
                    <option value="Fútbol">Fútbol</option>
                    <option value="Baloncesto">Baloncesto</option>
                    <option value="Voleibol">Voleibol</option>
                  </select>
                </div>

                <div style={{ 
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem'
                }}>
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#374151',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button"
                    onClick={handleSaveNewEvent}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Guardar Evento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && editingEvent && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }} onClick={() => setShowEditModal(false)}>
            <div className="match-card" style={{
              width: '100%',
              maxWidth: '600px',
              margin: '0 1rem',
              transform: 'none'
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Editar Evento</h3>
                <button onClick={() => setShowEditModal(false)} style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              
              <form onSubmit={handleSaveEdit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Título del Evento</label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    name="title"
                    value={editingEvent.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Fecha</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="date"
                      value={editingEvent.date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Hora</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="time"
                      value={editingEvent.time}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Ubicación</label>
                  <input
                    type="text"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    name="location"
                    value={editingEvent.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>Deporte</label>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      backgroundColor: 'white'
                    }}
                    name="sport"
                    value={editingEvent.sport}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="Fútbol">Fútbol</option>
                    <option value="Baloncesto">Baloncesto</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Equipo 1</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="team1"
                      value={editingEvent.team1}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '0.5rem',
                      fontWeight: '500',
                      color: '#374151'
                    }}>Equipo 2</label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        fontSize: '1rem'
                      }}
                      name="team2"
                      value={editingEvent.team2}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>

                {editingEvent.status === 'finished' && (
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>Puntuación Equipo 1</label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                        name="score1"
                        value={editingEvent.score1 || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        color: '#374151'
                      }}>Puntuación Equipo 2</label>
                      <input
                        type="text"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          fontSize: '1rem'
                        }}
                        name="score2"
                        value={editingEvent.score2 || ''}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                )}

                <div style={{ 
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem'
                }}>
                  <button 
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      color: '#374151',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      backgroundColor: '#2563eb',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendario;