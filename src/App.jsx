import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router';
import { InventoryContext, InventoryProvider } from './context/InventoryContext'; // <-- Importamos Provider aquí

// Pantallas
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

import './App.css';

// ÍCONOS MINIMALISTAS (SVG)
const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const IconBell = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconUser = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconSearch = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

function AppContent() {
  const { searchTerm, setSearchTerm } = useContext(InventoryContext);

  // ESTADOS DE LA INTERFAZ
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // EFECTO MODO OSCURO
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

      {/* ================= NAVBAR SUPERIOR ================= */}
      <nav className="navbar">
        {/* Izquierda: Menú y Logo */}
        <div className="nav-left">
          <button className="icon-btn" onClick={() => setIsSidebarOpen(true)}>
            <IconMenu />
          </button>

          {/* CAMBIO SENIOR: Ahora el contenedor del logo es un Link a /inventory */}
          <Link to="/inventory" className="brand-container" style={{ textDecoration: 'none' }}>
            {/* LÓGICA SENIOR: Alternamos el logo según el modo activo */}
            <img
              src={isDarkMode ? "/logo-straska-negro.png" : "/logo-straska-blanco.png"}
              alt="Straskapp Logo"
              className="nav-logo"
            />
            <span className="brand-name">Straskapp</span>
          </Link>
        </div>

        {/* Derecha: Toggle, Perfil, Notificaciones y Búsqueda */}
        <div className="nav-right">
          {/* Toggle de Tema */}
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Alternar tema">
            <span style={{ fontSize: '1rem', marginRight: '6px' }}>{isDarkMode ? '🌙' : '☀️'}</span>
            <div className={`toggle-track ${isDarkMode ? 'dark' : ''}`}>
              <div className={`toggle-thumb ${isDarkMode ? 'active' : ''}`}></div>
            </div>
          </button>

          <div className="nav-icons">
            <div className="profile-circle"><IconUser /></div>

            <button className="icon-btn notification-btn">
              <IconBell />
              <span className="notification-dot"></span>
            </button>

            <div className="search-container">
              <button className="icon-btn" onClick={() => setShowSearch(!showSearch)}>
                <IconSearch />
              </button>
              {/* Input desplegable */}
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

      {/* ================= SIDEBAR (MENÚ LATERAL) ================= */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}>
        <aside className="sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            {/* Agregamos la fuente Cinzel para mantener el diseño consistente */}
            <h3 style={{ color: 'var(--brand-color)', fontFamily: "'Cinzel', serif" }}>STRASKAPP</h3>
            <button className="icon-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>
          <ul className="sidebar-links">
            <li><Link to="/inventory" onClick={() => setIsSidebarOpen(false)}>📦 Inventarios</Link></li>
            <li><Link to="#" onClick={() => setIsSidebarOpen(false)}>👤 Perfil</Link></li>
            <li><Link to="#" onClick={() => setIsSidebarOpen(false)}>🎧 Contacto y Soporte</Link></li>
          </ul>
        </aside>
      </div>

      {/* ================= CONTENIDO PRINCIPAL ================= */}
      <main className="app-container">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/inventory" element={<HomeScreen />} />
          <Route path="/add" element={<AddProductScreen />} />
          <Route path="/product/:id" element={<ProductDetailScreen />} />
          <Route path="/edit/:id" element={<EditProductScreen />} />
          <Route path="*" element={<div style={{ textAlign: 'center', width: '100%' }}><h2>404 - No encontrado</h2></div>} />
        </Routes>
      </main>
    </div>
  );
}

// Envolvemos todo en el Provider en el punto más alto
export default function App() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}