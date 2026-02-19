import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { InventoryContext } from '../context/InventoryContext';

export default function EditProductScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, updateProduct } = useContext(InventoryContext);

    const [formData, setFormData] = useState({
        name: '', weight: '', price: '', quantity: '', description: '', image: ''
    });

    useEffect(() => {
        const productToEdit = products.find(p => String(p.id) === String(id));
        if (productToEdit) {
            setFormData(productToEdit);
        }
    }, [id, products]);

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

        updateProduct(id, formData);
        navigate(`/product/${id}`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>
                <Link to={`/product/${id}`} style={{ textDecoration: 'none', color: '#54628A', fontWeight: 'bold' }}>
                    ← Cancelar y Volver al Detalle
                </Link>
            </div>

            <div className="inventory-form">
                <h2 style={{ color: '#54628A', marginBottom: '20px' }}>Editar Artículo</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Peso (kg)</label>
                            <input type="number" name="weight" min="0" step="0.01" value={formData.weight} onChange={handleChange} required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Cantidad</label>
                            <input type="number" name="quantity" min="0" step="1" value={formData.quantity} onChange={handleChange} required />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ flex: 1 }}>
                            <label>Precio ($)</label>
                            <input type="number" name="price" min="0" step="0.01" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label>Cambiar Foto</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ border: 'none', padding: '10px 0' }} />
                        </div>
                    </div>

                    {formData.image && (
                        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                            <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }}></textarea>
                    </div>

                    <button type="submit" className="submit-btn" style={{ marginTop: '10px' }}>Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}