import React from 'react';
import { Card } from 'react-bootstrap';
import './CarCard.css';

const CarCard = ({ car }) => {
  const defaultImage = '/car-placeholder.png';

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <Card className="car-card h-100 shadow-sm">
      <div className="car-image-container">
        <Card.Img
          variant="top"
          src={car.image_url || defaultImage}
          alt={`${car.make} ${car.model}`}
          onError={handleImageError}
          className="car-image"
        />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="car-title">
          {car.make} {car.model}
        </Card.Title>
        <div className="car-details">
          <div className="detail-item">
            <span className="detail-label">Año:</span>
            <span className="detail-value">{car.year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Matrícula:</span>
            <span className="detail-value">{car.plate}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Kilometraje:</span>
            <span className="detail-value">
              {car.kilometerage ? `${car.kilometerage.toLocaleString()} km` : 'N/A'}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarCard;