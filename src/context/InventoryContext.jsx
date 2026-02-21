import React, { createContext, useState, useEffect } from 'react';
import { initialInventory } from '../data/initialInventory';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedData = localStorage.getItem('inventario_pareja');
        return savedData ? JSON.parse(savedData) : initialInventory;
    });

    // NUEVO ESTADO GLOBAL: El buscador ahora vive aquí
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        localStorage.setItem('inventario_pareja', JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts((prev) =>
            prev.map((p) => (String(p.id) === String(id) ? { ...updatedProduct, id: p.id } : p))
        );
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    };

    const totalWeight = products.reduce((acc, p) => acc + (Number(p.weight) * Number(p.quantity)), 0);
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);
    const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity), 0);

    return (
        <InventoryContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            totalWeight,
            totalValue,
            totalQuantity,
            searchTerm,     // <-- Exponemos la palabra buscada
            setSearchTerm,  // <-- Exponemos la función para actualizarla
            brandColor: '#54628A'
        }}>
            {children}
        </InventoryContext.Provider>
    );
};