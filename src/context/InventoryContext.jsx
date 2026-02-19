import React, { createContext, useState, useEffect } from 'react';
import { initialInventory } from '../data/initialInventory';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedData = localStorage.getItem('inventario_pareja');
        return savedData ? JSON.parse(savedData) : initialInventory;
    });

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

    // LÓGICA DE CÁLCULOS
    const totalWeight = products.reduce((acc, p) => acc + (Number(p.weight) * Number(p.quantity)), 0);
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);

    // NUEVO: Suma de todas las unidades individuales
    const totalQuantity = products.reduce((acc, p) => acc + Number(p.quantity), 0);

    return (
        <InventoryContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            totalWeight,
            totalValue,
            totalQuantity, // <-- Exponemos la nueva variable
            brandColor: '#54628A'
        }}>
            {children}
        </InventoryContext.Provider>
    );
};