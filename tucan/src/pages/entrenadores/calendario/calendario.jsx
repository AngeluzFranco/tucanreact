import React, { useState } from 'react';
import { Calendar, Trophy, Clock } from 'lucide-react';
import './calendario.css';

const initialMatches = [
  {
    id: 1,
    homeTeam: "Tigres FC",
    awayTeam: "Leones FC",
    date: "2024-03-20",
    time: "19:30",
    type: "local"
  },
  {
    id: 2,
    homeTeam: "Águilas FC",
    awayTeam: "Tigres FC",
    date: "2024-03-23",
    time: "20:00",
    type: "away"
  },
  {
    id: 3,
    homeTeam: "Tigres FC",
    awayTeam: "Panteras United",
    date: "2024-03-27",
    time: "18:45",
    type: "local"
  }
];

export default function Calendario() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [matches] = useState(initialMatches);

  const handleMatchClick = (matchId) => {
    console.log('Match clicked:', matchId);
  };

  return (
    <div className="app-container">
      

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            {/* Puedes agregar búsqueda, notificaciones, etc. aquí */}
          </div>
        </header>

        <main className="main-area">
          {activeTab === 'calendar' && (
            <div className="content-container">
              <div className="section-header">
                <Calendar size={24} color="#2563eb" />
                <h2 className="section-title">Próximos Partidos</h2>
              </div>

              <div className="matches-grid">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    onClick={() => handleMatchClick(match.id)}
                    className="match-card"
                  >
                    <div className="match-teams">
                      <span className="team-name">{match.homeTeam}</span>
                      <span className="vs-text">VS</span>
                      <span className="team-name">{match.awayTeam}</span>
                    </div>
                    
                    <div className="match-info">
                      <Clock size={16} />
                      <span>{match.date} - {match.time}</span>
                    </div>
                    
                    <span className={`match-type ${match.type}`}>
                      {match.type === 'local' ? 'Local' : 'Visitante'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Puedes agregar más contenido basado en la pestaña activa */}
        </main>
      </div>
    </div>
  );
}
