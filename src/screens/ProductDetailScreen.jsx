import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export default function ProductDetailScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, deleteProduct } = useContext(InventoryContext);

    const product = products.find(p => String(p.id) === String(id));

    if (!product) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Producto no encontrado</h2>
                <Link to="/inventory" className="submit-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Volver al inicio</Link>
            </div>
        );
    }

    const handleDelete = () => {
        const isConfirmed = window.confirm(`¿Estás seguro de que deseas eliminar "${product.name}" de forma permanente?`);
        if (isConfirmed) {
            deleteProduct(id);
            navigate('/inventory');
        }
    };

    return (
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/inventory" style={{ textDecoration: 'none', color: 'var(--brand-color)', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
                ← Volver al Inventario
            </Link>

            {/* AQUÍ ESTÁ EL CAMBIO: Usamos className="detail-card" en lugar de style={{ backgroundColor: '#fff' ... }} */}
            <div className="detail-card">
                <h2 style={{ color: product.quantity > 0 ? 'var(--success-color)' : 'var(--brand-color)', marginBottom: '20px', fontSize: '2rem' }}>
                    {product.name}
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <img
                            src={product.image || 'https://via.placeholder.com/400x300?text=Sin+Imagen'}
                            alt={product.name}
                            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                        />
                    </div>

                    <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Peso:</strong> {product.weight} kg</p>
                            <p style={{ marginBottom: '10px', fontSize: '1.1rem' }}><strong>Cantidad en Stock:</strong> {product.quantity} unidades</p>
                            <p className="product-price" style={{ marginBottom: '10px', fontSize: '1.3rem' }}><strong>Precio unitario:</strong> ${product.price}</p>
                            <p style={{ margin: '20px 0', color: 'var(--text-dark)', lineHeight: '1.6' }}>
                                <strong>Descripción:</strong><br />
                                {product.description || 'No hay descripción disponible para este artículo.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <Link
                                to={`/edit/${product.id}`}
                                className="submit-btn"
                                style={{ textDecoration: 'none', textAlign: 'center', flex: 1 }}
                            >
                                ✏️ Editar
                            </Link>
                            <button
                                onClick={handleDelete}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    flex: 1,
                                    padding: '14px'
                                }}
                            >
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}