import React, { useState } from 'react';
import './dashboard.css';

const TeamDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: '',
    city: '',
    logo: '',
    starters: '',
    substitutes: '',
    sport: '',
    description: ''
  });
  
  const teams = [
    {
      id: 1,
      name: 'Halcones Basketball',
      type: 'Baloncesto',
      wins: 8,
      losses: 6,
      image: '/basketball-net.jpg'
    },
    {
      id: 2,
      name: 'Real Madrid FC',
      type: 'Fútbol',
      wins: 15,
      losses: 2,
      image: '/soccer-stadium.jpg'
    },
    {
      id: 3,
      name: 'Lakers Club',
      type: 'Baloncesto',
      wins: 10,
      losses: 5,
      image: '/basketball-court.jpg'
    },
    {
      id: 4,
      name: 'Real Madrid FC',
      type: 'Fútbol',
      wins: 15,
      losses: 2,
      image: '/soccer-stadium.jpg'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({
      ...newTeam,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New team data:', newTeam);
    // Close the modal
    setIsModalOpen(false);
    // Reset the form
    setNewTeam({
      name: '',
      city: '',
      logo: '',
      starters: '',
      substitutes: '',
      sport: '',
      description: ''
    });
  };

  const filteredTeams = activeFilter === 'Todos' 
    ? teams 
    : teams.filter(team => team.type === activeFilter);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">Tucaap</div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span className="icon">🏆</span>
            Equipos
          </div>
          <div className="menu-item">
            <span className="icon">📅</span>
            Calendario
          </div>
        </div>
      </div>
      
      <div className="main-content">
    
        
        <div className="content">
          <div className="page-header">
            <h1 className="page-title">Equipos Registrados</h1>
            <button className="add-team-btn" onClick={() => setIsModalOpen(true)}>
              + Agregar Equipo
            </button>
          </div>
          
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${activeFilter === 'Todos' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Todos')}
            >
              Todos
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Fútbol' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Fútbol')}
            >
              <span className="sport-icon">⚽</span> Fútbol
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'Baloncesto' ? 'active' : ''}`}
              onClick={() => setActiveFilter('Baloncesto')}
            >
              <span className="sport-icon">🏀</span> Baloncesto
            </button>
          </div>
          
          <div className="team-cards">
            {filteredTeams.map(team => (
              <div className="team-card" key={team.id}>
                <div className="team-image">
                  <img src={team.image} alt={team.name} />
                </div>
                <div className="team-info">
                  <h3>{team.name}</h3>
                  <div className={`team-type ${team.type.toLowerCase()}`}>
                    {team.type === 'Fútbol' ? <span className="sport-icon">⚽</span> : <span className="sport-icon">🏀</span>}
                    {team.type}
                  </div>
                  <div className="team-stats">
                    <div className="stat wins">
                      {team.wins} Victorias
                    </div>
                    <div className="stat losses">
                      {team.losses} Derrotas
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add Team Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Registrar Nuevo Equipo</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre del Equipo</label>
                <input 
                  type="text" 
                  name="name" 
                  value={newTeam.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Ciudad</label>
                <input 
                  type="text" 
                  name="city" 
                  value={newTeam.city} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Logo (URL)</label>
                <input 
                  type="url" 
                  name="logo" 
                  value={newTeam.logo} 
                  onChange={handleInputChange} 
                  placeholder="https://example.com/logo.jpg" 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group half">
                  <label>Número de Titulares</label>
                  <input 
                    type="number" 
                    name="starters" 
                    value={newTeam.starters} 
                    onChange={handleInputChange} 
                    min="1" 
                  />
                </div>
                
                <div className="form-group half">
                  <label>Número de Suplentes</label>
                  <input 
                    type="number" 
                    name="substitutes" 
                    value={newTeam.substitutes} 
                    onChange={handleInputChange} 
                    min="0" 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Deporte</label>
                <select 
                  name="sport" 
                  value={newTeam.sport} 
                  onChange={handleInputChange} 
                  required
                >
                  <option value="">Seleccione un deporte</option>
                  <option value="Fútbol">Fútbol</option>
                  <option value="Baloncesto">Baloncesto</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Descripción</label>
                <textarea 
                  name="description" 
                  value={newTeam.description} 
                  onChange={handleInputChange} 
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="register-btn">
                  Registrar Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;