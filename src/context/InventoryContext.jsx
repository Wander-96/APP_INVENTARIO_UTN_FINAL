import React, { createContext, useState, useEffect } from 'react';
import { initialInventory } from '../data/initialInventory';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    // 1. Estado del Inventario
    const [products, setProducts] = useState(() => {
        const savedData = localStorage.getItem('inventario_pareja');
        return savedData ? JSON.parse(savedData) : initialInventory;
    });

    // 2. Estado Global del Buscador
    const [searchTerm, setSearchTerm] = useState('');

    // 3. NUEVO: Estado Global del Perfil
    const [profile, setProfile] = useState(() => {
        const savedProfile = localStorage.getItem('straskapp_profile');
        return savedProfile ? JSON.parse(savedProfile) : {
            name: 'Santiago Lago',
            email: 'santiago.lago4@gmail.com',
            github: 'https://github.com/Wander-96',
            photo: 'https://github.com/Wander-96.png'
        };
    });

    // Guardado automático en LocalStorage
    useEffect(() => {
        localStorage.setItem('inventario_pareja', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        localStorage.setItem('straskapp_profile', JSON.stringify(profile));
    }, [profile]);

    // Funciones del Inventario
    const addProduct = (newProduct) => setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
    const updateProduct = (id, updatedProduct) => {
        setProducts((prev) => prev.map((p) => (String(p.id) === String(id) ? { ...updatedProduct, id: p.id } : p)));
    };
    const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));

    // Cálculos
    const totalWeight = products.reduce((acc, p) => acc + (Number(p.weight) * Number(p.quantity)), 0);
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);
    const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity), 0);

    return (
        <InventoryContext.Provider value={{
            products, addProduct, updateProduct, deleteProduct,
            totalWeight, totalValue, totalQuantity,
            searchTerm, setSearchTerm,
            profile, setProfile, // <-- Exponemos tu perfil a toda la app
            brandColor: '#54628A'
        }}>
            {children}
        </InventoryContext.Provider>
    );
};