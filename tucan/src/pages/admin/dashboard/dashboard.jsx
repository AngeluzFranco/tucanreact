import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import './dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTeam, setNewTeam] = useState({
    nombre: '',
    ciudad: '',
    logo_url: '',
    num_titulares: 0,
    num_suplentes: 0,
    deporte: '',
    descripcion: ''
  });

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/equipo/api/', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) throw new Error('Error al cargar equipos');
        
        const data = await response.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [user.token]);

  const handleTeamClick = (teamId) => {
    navigate(`/admin/estadisticas/${teamId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/equipo/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(newTeam)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear equipo');
      }

      const createdTeam = await response.json();
      setTeams([...teams, createdTeam]);
      setIsModalOpen(false);
      setNewTeam({
        nombre: '',
        ciudad: '',
        logo_url: '',
        num_titulares: 0,
        num_suplentes: 0,
        deporte: '',
        descripcion: ''
      });

    } catch (err) {
      setError(err.message);
    }
  };

  const filteredTeams = activeFilter === 'Todos' 
    ? teams 
    : teams.filter(team => team.deporte.nombre === activeFilter);

  if (isLoading) return <div className="loading">Cargando equipos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre del Equipo</label>
                <input
                  type="text"
                  name="nombre"
                  value={newTeam.nombre}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={newTeam.ciudad}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Deporte</label>
                <select
                  name="deporte"
                  value={newTeam.deporte}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleccione un deporte</option>
                  <option value="1">Fútbol</option>
                  <option value="2">Baloncesto</option>
                </select>
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