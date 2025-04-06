import { Outlet } from 'react-router-dom'
import SlidebarAdmin from '../components/slidebar/slidebaradmin/SlidebarAdmin'
import './EntrenadorLayout.css'

const AdminLayout = () => {
  return (
    <div className="layout-container">
      <SlidebarAdmin />
      <div className="content-area">
        <Outlet /> {/* Esto renderizará dashboard, calendario o estadísticas */}
      </div>
    </div>
  )
};

export default AdminLayout;