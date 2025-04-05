import React from 'react';
import './Estadisticas.css';
import { FaChartBar, FaInfoCircle, FaUsers, FaHistory, FaPencilAlt } from 'react-icons/fa';

function TigresFC() {
  return (
    <div className="app-container">

      <div className="sidebar">
        <div className="sidebar-header">Tucanaap</div>
        <div className="sidebar-menu">
          <div className="menu-item active">
            <span className="menu-icon">⚽</span>
            <span className="menu-text">Equipos</span>
          </div>
          <div className="menu-item">
            <span className="menu-icon">📅</span>
            <span className="menu-text">Calendario</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Team Container */}
        <div className="team-container">
          {/* Team Header */}
          <div className="team-header">
            <div className="logo-placeholder">
              <img src="https://w7.pngwing.com/pngs/910/708/png-transparent-tigres-de-la-uanl-hd-logo.png" alt="Tigres FC Logo" />
            </div>
            <h1 className="team-name">Tigres FC</h1>
          </div>

          {/* Stats Tabs */}
          <div className="stats-tabs">
            <div className="tab active">
              <FaChartBar className="tab-icon" />
              <span>Estadísticas Generales</span>
            </div>
          </div>

          {/* Stats Cards */}
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

          {/* Side-by-Side Sections */}
          <div className="side-by-side-sections">
            {/* Team Info Section */}
            <div className="section team-info-section">
              <div className="section-header">
                <FaInfoCircle className="section-icon" />
                <h2>Información del Equipo</h2>
              </div>
              
              <div className="team-info-grid">
                <div className="info-item">
                  <div className="info-label">Nombre:</div>
                  <div className="info-value">Tigres FC</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Ciudad:</div>
                  <div className="info-value">Monterrey</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Deporte:</div>
                  <div className="info-value">Fútbol</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Fundación:</div>
                  <div className="info-value">2015</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Titulares:</div>
                  <div className="info-value">11</div>
                </div>
                <div className="info-item">
                  <div className="info-label">Suplentes:</div>
                  <div className="info-value">7</div>
                </div>
              </div>

              <button className="edit-button">
                <FaPencilAlt /> EDITAR INFORMACIÓN Y LOGO
              </button>
            </div>

            {/* Players Section */}
            <div className="section players-section">
              <div className="section-header">
                <FaUsers className="section-icon" />
                <h2>Jugadores (5)</h2>
              </div>
              
              <div className="players-list">
                <div className="player-item">
                  <div className="player-info">
                    <div className="player-name">Luis Torres</div>
                    <div className="player-number">19</div>
                    <div className="player-position">Delantero</div>
                  </div>
                  <div className="player-rating">
                    <span className="rating-tag good">90 / 100</span>
                  </div>
                </div>
                
                <div className="player-item">
                  <div className="player-info">
                    <div className="player-name">Pedro Ramírez</div>
                    <div className="player-number">8</div>
                    <div className="player-position">Mediocampista</div>
                  </div>
                  <div className="player-rating">
                    <span className="rating-tag good">85 / 100</span>
                  </div>
                </div>
                
                <div className="player-item">
                  <div className="player-info">
                    <div className="player-name">Carlos Sánchez</div>
                    <div className="player-number">5</div>
                    <div className="player-position">Defensa</div>
                  </div>
                  <div className="player-rating">
                    <span className="rating-tag good">88 / 100</span>
                  </div>
                </div>
                
                <div className="player-item">
                  <div className="player-info">
                    <div className="player-name">Juan Pérez</div>
                    <div className="player-number">1</div>
                    <div className="player-position">Portero</div>
                  </div>
                  <div className="player-rating">
                    <span className="rating-tag good">92 / 100</span>
                  </div>
                </div>
              </div>

              <button className="edit-button">
                <FaUsers /> EDITAR JUGADORES
              </button>
            </div>
          </div>

          {/* Recent Matches Section */}
          <div className="section">
            <div className="section-header">
              <FaHistory className="section-icon" />
              <h2>Últimos Partidos</h2>
            </div>
            
            <div className="matches-list">
              {[
                { opponent: "Leones FC", date: "14/3/2024", homeScore: 3, awayScore: 1 },
                { opponent: "Toros United", date: "7/2/2024", homeScore: 2, awayScore: 1 },
                { opponent: "Águilas SC", date: "29/1/2024", homeScore: 0, awayScore: 0 },
              ].map((match, index) => {
                const isWin = match.homeScore > match.awayScore;
                const isLoss = match.homeScore < match.awayScore;
                const isTie = match.homeScore === match.awayScore;

                const resultClass = isWin
                  ? "win"
                  : isLoss
                  ? "loss"
                  : "tie";

                const resultText = isWin
                  ? "Ganó"
                  : isLoss
                  ? "Perdió"
                  : "Empató";

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
                        <img src="https://logo-marque.com/wp-content/uploads/2020/08/Los-Angeles-Lakers-Logo.png" alt={`${match.opponent} Logo`} />
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

export default TigresFC;