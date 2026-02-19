import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginScreen() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // No validamos, solo pasamos al inventario
        navigate('/inventory'); 
    };

    return (
        <div style={{ 
            height: '80vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                padding: '40px', 
                borderRadius: '12px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Bienvenido al Inventario</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        style={inputStyle} 
                        onChange={(e) => setUser(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        style={inputStyle} 
                        required 
                    />
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '12px', 
                            backgroundColor: '#00a884', // Verde similar a tu imagen
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem'
};