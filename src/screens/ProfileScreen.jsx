import React, { useState } from 'react';

export default function ProfileScreen() {
    const [isEditing, setIsEditing] = useState(false);

    // ESTADO INICIAL: Tus datos reales por defecto
    const [profile, setProfile] = useState({
        name: 'Santiago Lago',
        email: 'santiago.lago4@gmail.com',
        github: 'https://github.com/Wander-96',
        photo: 'https://github.com/Wander-96.png' // <-- TRUCO SENIOR: Trae tu foto directamente de GitHub
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfile({ ...profile, photo: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <div className="detail-card">
                <h2 style={{ color: 'var(--brand-color)', marginBottom: '25px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
                    Mi Perfil
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
                    <img
                        src={profile.photo}
                        alt={`Perfil de ${profile.name}`}
                        style={{ width: '130px', height: '130px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--brand-color)', marginBottom: '15px' }}
                    />
                    {isEditing && (
                        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ border: '1px dashed var(--border-color)', padding: '10px', cursor: 'pointer', maxWidth: '250px' }} />
                    )}
                </div>

                <div className="inventory-form" style={{ boxShadow: 'none', padding: 0, backgroundColor: 'transparent' }}>
                    <div className="form-group">
                        <label>Nombre Completo</label>
                        {isEditing ? (
                            <input type="text" name="name" value={profile.name} onChange={handleChange} />
                        ) : (
                            <p style={{ padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '6px', color: 'var(--text-dark)' }}>{profile.name}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Correo Electrónico</label>
                        {isEditing ? (
                            <input type="email" name="email" value={profile.email} onChange={handleChange} />
                        ) : (
                            <p style={{ padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '6px', color: 'var(--text-dark)' }}>{profile.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Enlace de GitHub</label>
                        {isEditing ? (
                            <input type="text" name="github" value={profile.github} onChange={handleChange} />
                        ) : (
                            <p style={{ padding: '12px', backgroundColor: 'var(--bg-light)', borderRadius: '6px', color: 'var(--text-dark)' }}>
                                {/* Hacemos que el link sea clickeable para mayor profesionalismo */}
                                <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                                    {profile.github}
                                </a>
                            </p>
                        )}
                    </div>

                    <button onClick={toggleEdit} className="submit-btn" style={{ marginTop: '10px', backgroundColor: isEditing ? 'var(--success-color)' : 'var(--brand-color)' }}>
                        {isEditing ? '💾 Guardar Cambios' : '✏️ Editar Perfil'}
                    </button>
                </div>
            </div>
        </div>
    );
}