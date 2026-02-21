import React, { useContext } from 'react';
import { Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export default function InventoriesScreen() {
    const { products, totalValue } = useContext(InventoryContext);

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'var(--brand-color)', marginBottom: '30px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
                Mis Inventarios
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                {/* Tarjeta de Inventario Principal */}
                <Link to="/inventory" className="product-card-link">
                    <div className="product-card" style={{ padding: '40px 20px', textAlign: 'center', justifyContent: 'center', aspectRatio: 'auto', minHeight: '250px' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '15px' }}>📦</div>
                        <h3 style={{ color: 'var(--brand-color)', fontSize: '1.5rem', marginBottom: '10px' }}>
                            Inventario Principal
                        </h3>
                        <p style={{ color: 'var(--text-dark)', marginBottom: '15px' }}>
                            {products.length} tipos de artículos
                        </p>
                        <span style={{ display: 'inline-block', backgroundColor: 'var(--bg-light)', padding: '8px 15px', borderRadius: '20px', color: 'var(--success-color)', fontWeight: 'bold' }}>
                            Valor Total: ${totalValue.toLocaleString()}
                        </span>
                    </div>
                </Link>

                {/* Tarjeta decorativa para añadir nuevos en el futuro */}
                <div className="product-card" style={{ padding: '40px 20px', textAlign: 'center', justifyContent: 'center', aspectRatio: 'auto', minHeight: '250px', border: '2px dashed var(--border-color)', backgroundColor: 'transparent', cursor: 'not-allowed', opacity: '0.6' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '15px', color: 'var(--text-dark)' }}>+</div>
                    <h3 style={{ color: 'var(--text-dark)', fontSize: '1.2rem' }}>
                        Crear Nuevo Inventario
                    </h3>
                    <p style={{ fontSize: '0.85rem', marginTop: '10px' }}>(Próximamente)</p>
                </div>
            </div>
        </div>
    );
}