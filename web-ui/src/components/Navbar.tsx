import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, Home, LogIn } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Activity size={24} color="var(--primary)" />
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Sentinel UI</span>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Home size={18} /> Home
        </Link>
        <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/login" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <LogIn size={18} /> Login
        </Link>
      </div>
    </nav>
  );
}
