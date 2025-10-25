import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import CarCard from './CarCard';
import Pagination from './Pagination';
import apiService from '../services/apiService';
import './CarList.css';

const CARS_PER_PAGE = 12;

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAllCars();
      setCars(response.data || []);
    } catch (err) {
      setError('Error al cargar los vehículos. Por favor, verifica que la API esté funcionando.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calcular los coches a mostrar en la página actual
  const indexOfLastCar = currentPage * CARS_PER_PAGE;
  const indexOfFirstCar = indexOfLastCar - CARS_PER_PAGE;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / CARS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p className="loading-text">Cargando vehículos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="error-alert">
          <Alert.Heading>¡Oops! Algo salió mal</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  if (cars.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info" className="info-alert">
          <Alert.Heading>No hay vehículos disponibles</Alert.Heading>
          <p>Aún no se han registrado vehículos en la base de datos.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="car-list-container">
      <div className="list-header">
        <h2 className="list-title">Catálogo de Vehículos</h2>
        <p className="list-subtitle">
          Mostrando {indexOfFirstCar + 1} - {Math.min(indexOfLastCar, cars.length)} de {cars.length} vehículos
        </p>
      </div>

      <Row className="g-4">
        {currentCars.map((car) => (
          <Col key={car.id} xs={12} sm={6} md={4} lg={3}>
            <CarCard car={car} />
          </Col>
        ))}
      </Row>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Container>
  );
};

export default CarList;