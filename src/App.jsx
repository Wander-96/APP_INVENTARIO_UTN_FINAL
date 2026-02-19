import React from 'react';
import { Routes, Route } from 'react-router';
import { InventoryProvider } from './context/InventoryContext';

// Importación de Pantallas (Screens)
import LoginScreen from './screens/LoginScreen'; // <-- Nueva
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

import './App.css';

function App() {
  return (
    <InventoryProvider>
      <div className="app-container">
        <header style={{ width: '100%', marginBottom: '20px' }}>
          <h1 className="main-title">Gestión de Inventario</h1>
        </header>

        <Routes>
          {/* 1. La PUERTA de entrada es el Login */}
          <Route path="/" element={<LoginScreen />} />

          {/* 2. El DASHBOARD ahora está en /inventory */}
          <Route path="/inventory" element={<HomeScreen />} />

          {/* 3. Formulario de Carga */}
          <Route path="/add" element={<AddProductScreen />} />

          {/* 4. Detalle con parámetro :id */}
          <Route path="/product/:id" element={<ProductDetailScreen />} />

          {/* 5. Edición con parámetro :id */}
          <Route path="/edit/:id" element={<EditProductScreen />} />

          {/* 6. Manejo de errores 404 */}
          <Route path="*" element={<div className="app-container"><h2>404 - No encontrado</h2></div>} />
        </Routes>
      </div>
    </InventoryProvider>
  );
}

export default App;