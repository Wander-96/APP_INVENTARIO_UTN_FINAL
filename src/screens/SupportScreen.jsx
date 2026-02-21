import React from 'react';

export default function SupportScreen() {
    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <div className="detail-card" style={{ textAlign: 'center', padding: '50px 30px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎧</div>
                <h2 style={{ color: 'var(--brand-color)', marginBottom: '15px' }}>
                    Centro de Soporte
                </h2>
                <p style={{ color: 'var(--text-dark)', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    ¿Tienes dudas sobre cómo usar la aplicación o encontraste algún error?
                    Estamos aquí para ayudarte. Contáctanos por tu canal preferido.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Botón de WhatsApp (Verde) */}
                    <a
                        href="https://wa.me/5491100000000" /* Reemplaza los ceros por tu número real si quieres */
                        target="_blank"
                        rel="noopener noreferrer"
                        className="submit-btn"
                        style={{ textDecoration: 'none', backgroundColor: '#25D366', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    >
                        📱 Escribir por WhatsApp
                    </a>

                    {/* Botón de Email (Usa el color de la marca) */}
                    <a
                        href="mailto:soporte@straskapp.com"
                        className="submit-btn"
                        style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    >
                        ✉️ Enviar un Correo
                    </a>
                </div>
            </div>
        </div>
    );
}