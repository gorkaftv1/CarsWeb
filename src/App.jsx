import React, { useState, useRef } from 'react';
import CarList from './components/CarList';
import CarForm from './components/CarForm';
import './App.css';

function App() {
  const carListRef = useRef(null);

  const handleCarAdded = (newCar) => {
    // Refrescar la lista de autos después de agregar uno
    if (carListRef.current && carListRef.current.refreshCars) {
      carListRef.current.refreshCars();
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            <span className="icon">🚗</span>
            Cars API
            <span className="icon">🚗</span>
          </h1>
          <p className="app-description">
            Sistema de gestión y visualización de vehículos
          </p>
        </div>
      </header>

      <main className="app-main">
        <CarForm onCarAdded={handleCarAdded} />
        <CarList ref={carListRef} />
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Cars API - Autor gorkaftv1</p>
        </div>
      </footer>
    </div>
  );
}

export default App;