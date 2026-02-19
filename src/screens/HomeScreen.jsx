import React, { useContext } from 'react';
import { Link } from 'react-router'; // Importante para que funcione el Link
import { InventoryContext } from '../context/InventoryContext';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
    const { products, totalWeight, totalValue } = useContext(InventoryContext);

    return (
        <div className="home-screen">
            <h2 style={{ color: '#54628A', marginBottom: '20px' }}>Dashboard de Inventario</h2>

            <div className="stats-panel">
                <p>Total Artículos: <strong>{products.length}</strong></p>
                <p>Peso Total: <strong>{totalWeight} kg</strong></p>
                <p>Valor en Stock: <strong>${totalValue}</strong></p>
            </div>

            {/* EL DESAFÍO: Botón para ir a la pantalla de carga */}
            <Link
                to="/add"
                className="submit-btn"
                style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}
            >
                + Agregar Nuevo Producto
            </Link>

            <div className="product-list">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}