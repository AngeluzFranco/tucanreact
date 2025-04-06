import React from 'react';
import './Estadisticas.css';
import { FaChartBar, FaInfoCircle, FaUsers, FaHistory, FaPencilAlt } from 'react-icons/fa';

export default function Estadisticas() {
  const matches = [
    { opponent: "Leones FC", date: "14/3/2024", homeScore: 3, awayScore: 1 },
    { opponent: "Toros United", date: "7/2/2024", homeScore: 2, awayScore: 1 },
    { opponent: "Águilas SC", date: "29/1/2024", homeScore: 0, awayScore: 0 }
  ];

  const players = [
    { name: "Luis Torres", number: 19, position: "Delantero", rating: 90 },
    { name: "Pedro Ramírez", number: 8, position: "Mediocampista", rating: 85 },
    { name: "Carlos Sánchez", number: 5, position: "Defensa", rating: 88 },
    { name: "Juan Pérez", number: 1, position: "Portero", rating: 92 }
  ];

  return (
    <div className="app-container">
      
      <div className="main-content">
        <div className="team-container">
          <div className="team-header">
            <div className="logo-placeholder">
              <img src="https://w7.pngwing.com/pngs/910/708/png-transparent-tigres-de-la-uanl-hd-logo.png" alt="Tigres FC Logo" />
            </div>
            <h1 className="team-name">Tigres FC</h1>
          </div>

          <div className="stats-tabs">
            <div className="tab active">
              <FaChartBar className="tab-icon" />
              <span>Estadísticas Generales</span>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-value green">12</div>
              <div className="stat-label">Victorias</div>
            </div>
            <div className="stat-card">
              <div className="stat-value red">8</div>
              <div className="stat-label">Derrotas</div>
            </div>
            <div className="stat-card">
              <div className="stat-value blue">2</div>
              <div className="stat-label">Empates</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">54.5%</div>
              <div className="stat-label">Efectividad</div>
            </div>
          </div>

          <div className="side-by-side-sections">
            <div className="section team-info-section">
              <div className="section-header">
                <FaInfoCircle className="section-icon" />
                <h2>Información del Equipo</h2>
              </div>

              <div className="team-info-grid">
                <div className="info-item"><div className="info-label">Nombre:</div><div className="info-value">Tigres FC</div></div>
                <div className="info-item"><div className="info-label">Ciudad:</div><div className="info-value">Monterrey</div></div>
                <div className="info-item"><div className="info-label">Deporte:</div><div className="info-value">Fútbol</div></div>
                <div className="info-item"><div className="info-label">Fundación:</div><div className="info-value">2015</div></div>
                <div className="info-item"><div className="info-label">Titulares:</div><div className="info-value">11</div></div>
                <div className="info-item"><div className="info-label">Suplentes:</div><div className="info-value">7</div></div>
              </div>

              <button className="edit-button">
                <FaPencilAlt /> EDITAR INFORMACIÓN Y LOGO
              </button>
            </div>

            <div className="section players-section">
              <div className="section-header">
                <FaUsers className="section-icon" />
                <h2>Jugadores ({players.length})</h2>
              </div>

              <div className="players-list">
                {players.map((player, index) => (
                  <div className="player-item" key={index}>
                    <div className="player-info">
                      <div className="player-name">{player.name}</div>
                      <div className="player-number">{player.number}</div>
                      <div className="player-position">{player.position}</div>
                    </div>
                    <div className="player-rating">
                      <span className="rating-tag good">{player.rating} / 100</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="edit-button">
                <FaUsers /> EDITAR JUGADORES
              </button>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <FaHistory className="section-icon" />
              <h2>Últimos Partidos</h2>
            </div>

            <div className="matches-list">
              {matches.map((match, index) => {
                const isWin = match.homeScore > match.awayScore;
                const isLoss = match.homeScore < match.awayScore;
                const isTie = match.homeScore === match.awayScore;

                const resultClass = isWin ? "win" : isLoss ? "loss" : "tie";
                const resultText = isWin ? "Ganó" : isLoss ? "Perdió" : "Empató";

                return (
                  <div className="match-card" key={index}>
                    <div className="team">
                      <div className="match-logo">
                        <img
                          src="https://w7.pngwing.com/pngs/910/708/png-transparent-tigres-de-la-uanl-hd-logo.png"
                          alt="Tigres FC Logo"
                        />
                      </div>
                      <div className="match-team">Tigres FC</div>
                    </div>
                    <div className="vs">VS</div>
                    <div className="team">
                      <div className="match-logo">
                        <img
                          src="https://logo-marque.com/wp-content/uploads/2020/08/Los-Angeles-Lakers-Logo.png"
                          alt={`${match.opponent} Logo`}
                        />
                      </div>
                      <div className="match-team">{match.opponent}</div>
                    </div>
                    <div className={`match-result ${resultClass}`}>
                      {match.homeScore} - {match.awayScore}
                    </div>
                    <div className="match-date">{match.date}</div>
                    <div className={`match-outcome ${resultClass}`}>{resultText}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}