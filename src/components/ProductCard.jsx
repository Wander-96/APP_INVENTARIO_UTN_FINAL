import React from 'react';
import { Link } from 'react-router';

export default function ProductCard({ product }) {
    const subtotal = Number(product.price) * Number(product.quantity);

    return (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
                <div className="card-image-container">
                    <img
                        src={product.image || 'https://via.placeholder.com/300x200?text=Sin+Imagen'}
                        alt={product.name}
                        className="card-image"
                    />
                </div>

                <div className="card-content">
                    {/* APLICAMOS EL COLOR CONDICIONAL AQUÍ */}
                    <h3 className="card-title" style={{ color: product.quantity > 0 ? '#00a884' : '#54628A' }}>
                        {product.name}
                    </h3>

                    <div className="card-details">
                        <p><strong>Peso:</strong> {product.weight} kg</p>
                        <p><strong>Cantidad:</strong> {product.quantity} u.</p>
                        <p><strong>Precio unitario:</strong> ${product.price}</p>
                    </div>

                    <div className="card-footer">
                        <div>
                            <span style={{ fontSize: '0.8rem', color: '#888' }}>Subtotal:</span>
                            <br />
                            <span className="product-price" style={{ fontSize: '1.3rem' }}>
                                ${subtotal}
                            </span>
                        </div>
                        <span className="view-more">Ver +</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}