import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router';
import { InventoryContext, InventoryProvider } from './context/InventoryContext';

// Pantallas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import InventoriesScreen from './screens/InventoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SupportScreen from './screens/SupportScreen';

import './App.css';

// ÍCONOS MINIMALISTAS (SVG)
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconBell = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconSearch = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

function AppContent() {
  // Lógica Senior: Traemos 'profile' del contexto
  const { searchTerm, setSearchTerm, profile } = useContext(InventoryContext);

  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // NUEVO: Estado para mostrar las notificaciones
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="app-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}>
            <IconMenu />
          </button>

          <Link to="/inventories" className="brand-container" style={{ textDecoration: 'none' }}>
            <img
              src={isDarkMode ? "/logo-straska-negro.png" : "/logo-straska-blanco.png"}
              alt="Straskapp Logo"
              className="nav-logo"
            />
            <span className="brand-name">Straskapp</span>
          </Link>
        </div>

        <div className="nav-right">
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Alternar tema">
            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{isDarkMode ? '🌙' : '☀️'}</span>
            <div className={`toggle-track ${isDarkMode ? 'dark' : ''}`}>
              <div className={`toggle-thumb ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </button>

          <div className="nav-icons">
            {/* LÓGICA SENIOR: Mostramos la foto del usuario en vez de un icono genérico */}
            <Link to="/profile" className="profile-circle" style={{ textDecoration: 'none', padding: 0, border: 'none' }}>
              <img
                src={profile.photo}
                alt="Mi Perfil"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            </Link>

            {/* MENÚ DE NOTIFICACIONES */}
            <div style={{ position: 'relative' }}>
              <button className="icon-btn notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
                <IconBell />
                {/* Dejé el puntito rojo para invitar al usuario a hacer clic */}
                <span className="notification-dot"></span>
              </button>

              {/* Caja Desplegable (Dropdown) */}
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  backgroundColor: 'var(--white)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--card-shadow)',
                  width: '260px',
                  padding: '15px',
                  zIndex: 1000,
                  color: 'var(--text-dark)'
                }}>
                  <h4 style={{ marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', color: 'var(--brand-color)' }}>
                    Notificaciones
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center', padding: '15px 0' }}>
                    No tienes nuevas notificaciones.
                  </p>
                </div>
              )}
            </div>

            <div className="search-container">
              <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
                <IconSearch />
              </button>
              <input
                type="text"
                className={`nav-search-input ${showSearch ? 'active' : ''}`}
                placeholder="Buscar producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Menú lateral (Sin cambios) */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}>
        <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <h3 style={{ color: 'var(--brand-color)', fontFamily: "'Cinzel', serif" }}>STRASKAPP</h3>
            <button className="icon-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>
          <ul className="sidebar-links">
            <li><Link to="/inventories" onClick={() => setIsSidebarOpen(false)}>📦 Inventarios</Link></li>
            <li><Link to="/profile" onClick={() => setIsSidebarOpen(false)}>👤 Perfil</Link></li>
            <li><Link to="/support" onClick={() => setIsSidebarOpen(false)}>🎧 Contacto y Soporte</Link></li>
          </ul>
        </aside>
      </div>

      <main className="app-container">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/inventories" element={<InventoriesScreen />} />
          <Route path="/inventory" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/support" element={<SupportScreen />} />
          <Route path="/add" element={<AddProductScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/edit/:id" element={<EditProductScreen />} />
          <Route path="*" element={<div style={{ textAlign: 'center', width: '100%' }}><h2>404 - No encontrado</h2></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}