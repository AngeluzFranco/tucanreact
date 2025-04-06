import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
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

  const handleTeamClick = () => {
    navigate(`/entrenador/estadisticas`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Nuevo equipo registrado:', newTeam);
    setIsModalOpen(false);
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
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>Equipos Registrados</h1>
        <button
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <span>+</span> Agregar Equipo
        </button>
      </div>

      <div className="filters">
        <button
          className={`filter-tag ${activeFilter === 'Todos' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Todos')}
        >
          Todos
        </button>
        <button
          className={`filter-tag ${activeFilter === 'Fútbol' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Fútbol')}
        >
          ⚽ Fútbol
        </button>
        <button
          className={`filter-tag ${activeFilter === 'Baloncesto' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Baloncesto')}
        >
          🏀 Baloncesto
        </button>
      </div>

      <div className="teams-grid">
        {filteredTeams.map(team => (
          <div
            className="team-card"
            key={team.id}
            onClick={() => handleTeamClick()}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-image">
              <img src={team.image} alt={team.name} />
              <div className={`sport-badge ${team.type.toLowerCase()}`}>
                {team.type === 'Fútbol' ? '⚽' : '🏀'}
              </div>
            </div>
            <div className="card-body">
              <h3>{team.name}</h3>
              <div className="team-stats">
                <div className="stat win">
                  <span>{team.wins}</span> Victorias
                </div>
                <div className="stat loss">
                  <span>{team.losses}</span> Derrotas
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Registrar Nuevo Equipo</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
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
                <div className="form-group">
                  <label>Titulares</label>
                  <input
                    type="number"
                    name="starters"
                    value={newTeam.starters}
                    onChange={handleInputChange}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Suplentes</label>
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
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Registrar Equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
