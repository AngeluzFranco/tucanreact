import { Outlet } from 'react-router-dom'
import SidebarEntrenador from '../components/slidebar/SidebarEntrenador/SidebarEntrenador'
import './EntrenadorLayout.css'

const EntrenadorLayout = () => {
  return (
    <div className="layout-container">
      <SidebarEntrenador />
      <div className="content-area">
        <Outlet /> {/* Esto renderizará dashboard, calendario o estadísticas */}
      </div>
    </div>
  )
}

export default EntrenadorLayout