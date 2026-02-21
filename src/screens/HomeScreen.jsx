import React, { useContext } from 'react';
import { Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
    // Obtenemos todo del contexto, incluyendo el searchTerm de la Navbar
    const { products, totalWeight, totalValue, totalQuantity, searchTerm } = useContext(InventoryContext);

    // Filtramos en tiempo real
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="home-screen">
            {/* Panel de Estadísticas */}
            <div className="stats-panel">
                <p>Tipos de Artículos: <strong>{products.length}</strong></p>
                <p>Unidades Totales: <strong>{totalQuantity}</strong></p>
                <p>Peso Total: <strong>{totalWeight.toFixed(2)} kg</strong></p>
                <p>Valor en Stock: <strong>${totalValue.toLocaleString()}</strong></p>
            </div>

            {/* Botón a la derecha */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Link
                    to="/add"
                    className="submit-btn"
                    style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}
                >
                    + Agregar Nuevo Producto
                </Link>
            </div>

            {/* Grilla Cuadrada */}
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-dark)' }}>
                        <h3>No se encontraron productos para "{searchTerm}"</h3>
                    </div>
                )}
            </div>
        </div>
    );
}