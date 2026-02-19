import React, { useContext, useState } from 'react'; // <-- Importamos useState
import { Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
    const { products, totalWeight, totalValue, totalQuantity } = useContext(InventoryContext);

    // NUEVO: Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // NUEVO: Lógica de filtrado en tiempo real
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-screen">
            <h2 style={{ color: '#54628A', marginBottom: '20px' }}>Dashboard de Inventario</h2>

            <div className="stats-panel">
                <p>Tipos de Artículos: <strong>{products.length}</strong></p>
                <p>Unidades Totales: <strong>{totalQuantity}</strong></p>
                <p>Peso Total: <strong>{totalWeight.toFixed(2)} kg</strong></p>
                <p>Valor en Stock: <strong>${totalValue.toLocaleString()}</strong></p>
            </div>

            {/* BARRA DE ACCIÓN: Buscador a la izquierda, Botón a la derecha */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap', /* Para que en celulares bajen de línea si no caben */
                gap: '15px'
            }}>

                {/* 1. Buscador */}
                <div style={{ flex: '1 1 300px' }}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar producto por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '12px 15px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* 2. Botón de Agregar (Movido a la derecha) */}
                <Link
                    to="/add"
                    className="submit-btn"
                    style={{
                        textDecoration: 'none',
                        display: 'inline-block',
                        textAlign: 'center',
                        whiteSpace: 'nowrap' /* Evita que el texto del botón se parta en dos líneas */
                    }}
                >
                    + Agregar Nuevo Producto
                </Link>
            </div>

            <div className="product-list">
                {/* RENDERIZADO CONDICIONAL: Mostramos los filtrados, o un mensaje si no hay coincidencias */}
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                        <h3>No se encontraron productos que coincidan con "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
}