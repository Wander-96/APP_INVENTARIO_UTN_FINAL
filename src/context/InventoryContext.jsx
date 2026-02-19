import React, { createContext, useState, useEffect } from 'react';
import { initialInventory } from '../data/initialInventory';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
    // MAGIA SENIOR: Al cargar la app, intentamos leer el disco duro. 
    // Si no hay nada, usamos el initialInventory por defecto.
    const [products, setProducts] = useState(() => {
        const savedData = localStorage.getItem('inventario_pareja');
        return savedData ? JSON.parse(savedData) : initialInventory;
    });

    // MAGIA SENIOR 2: Cada vez que 'products' cambia, lo guardamos en el disco duro.
    useEffect(() => {
        localStorage.setItem('inventario_pareja', JSON.stringify(products));
    }, [products]);

    // CREATE
    const addProduct = (newProduct) => {
        setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
    };

    // UPDATE
    const updateProduct = (id, updatedProduct) => {
        setProducts((prev) =>
            prev.map((p) => (String(p.id) === String(id) ? { ...updatedProduct, id: p.id } : p))
        );
    };

    // DELETE
    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    };

    // Cálculos de Totales
    const totalWeight = products.reduce((acc, p) => acc + (Number(p.weight) * Number(p.quantity)), 0);
    const totalValue = products.reduce((acc, p) => acc + (Number(p.price) * Number(p.quantity)), 0);

    return (
        <InventoryContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            totalWeight,
            totalValue,
            brandColor: '#54628A'
        }}>
            {children}
        </InventoryContext.Provider>
    );
};