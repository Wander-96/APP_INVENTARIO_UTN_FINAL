import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export default function AddProductScreen() {
    const { addProduct } = useContext(InventoryContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', weight: '', price: '', quantity: 1, description: '', image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setFormData({ ...formData, image: reader.result });
        if (file) reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Number(formData.price) < 0 || Number(formData.weight) < 0 || Number(formData.quantity) < 0) {
            alert("Error: Los valores numéricos no pueden ser negativos.");
            return;
        }

        addProduct(formData);
        navigate('/inventory');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
                <Link to="/inventory" style={{ textDecoration: 'none', color: 'var(--brand-color)', fontWeight: 'bold' }}>
                    ← Volver al Inventario
                </Link>
            </div>

            <div className="inventory-form">
                <h2 style={{ color: 'var(--brand-color)', marginBottom: '25px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
                    Cargar Nuevo Artículo
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* Diseño en Columna Única (Mucho más limpio y profesional) */}
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Cantidad inicial</label>
                        <input type="number" id="quantity" name="quantity" min="0" step="1" value={formData.quantity} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="weight">Peso (kg)</label>
                        <input type="number" id="weight" name="weight" min="0" step="0.01" value={formData.weight} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio unitario ($)</label>
                        <input type="number" id="price" name="price" min="0" step="0.01" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Foto del Producto</label>
                        {/* Pequeño ajuste en línea para que el input de archivo se vea mejor */}
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} style={{ border: '1px dashed var(--border-color)', padding: '10px', cursor: 'pointer' }} />
                    </div>

                    {formData.image && (
                        <div style={{ marginBottom: '20px', textAlign: 'center', backgroundColor: 'var(--bg-light)', padding: '10px', borderRadius: '8px' }}>
                            <img src={formData.image} alt="Preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid var(--border-color)' }} />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="description">Descripción detallada</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4"></textarea>
                    </div>

                    <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>Guardar en Inventario</button>
                </form>
            </div>
        </div>
    );
}