import React, { useState } from 'react';
import apiService from '../services/apiService';
import './CarForm.css';

function CarForm({ onCarAdded }) {
  const [formData, setFormData] = useState({
    plate: '',
    make: '',
    model: '',
    year: '',
    kilometerage: '',
    image_url: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validar campos requeridos
  const validateForm = () => {
    const newErrors = {};

    if (!formData.plate.trim()) {
      newErrors.plate = 'La matrícula es requerida';
    }
    if (!formData.make.trim()) {
      newErrors.make = 'La marca es requerida';
    }
    if (!formData.model.trim()) {
      newErrors.model = 'El modelo es requerido';
    }
    if (!formData.year.trim()) {
      newErrors.year = 'El año es requerido';
    } else if (isNaN(formData.year) || formData.year < 1900 || formData.year > new Date().getFullYear()) {
      newErrors.year = 'Ingresa un año válido';
    }
    if (!formData.kilometerage.trim()) {
      newErrors.kilometerage = 'El kilometraje es requerido';
    } else if (isNaN(formData.kilometerage) || formData.kilometerage < 0) {
      newErrors.kilometerage = 'Ingresa un kilometraje válido';
    }
    if (!formData.image_url.trim() && formData.image_url.length > 2048) {
  newErrors.image_url = 'La URL de la imagen es requerida y no puede exceder los 2048 caracteres';
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const newCar = await apiService.createCar({
        ...formData,
        year: parseInt(formData.year),
        kilometerage: parseInt(formData.kilometerage)
      });

      setSuccessMessage('¡Vehículo agregado exitosamente!');
      setFormData({
        plate: '',
        make: '',
        model: '',
        year: '',
        kilometerage: '',
        image_url: ''
      });

      if (onCarAdded) {
        onCarAdded(newCar);
      }

      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({
        submit: error.message || 'Error al agregar el vehículo'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="car-form-container">
      <div className="form-card">
        <h2 className="form-title">➕ Agregar Nuevo Vehículo</h2>

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {errors.submit && (
          <div className="alert alert-error">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-group">
            <label htmlFor="plate">Matrícula *</label>
            <input
              type="text"
              id="plate"
              name="plate"
              value={formData.plate}
              onChange={handleChange}
              placeholder="ABC-1234"
              className={errors.plate ? 'input-error' : ''}
            />
            {errors.plate && <span className="error-message">{errors.plate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="make">Marca *</label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Toyota"
              className={errors.make ? 'input-error' : ''}
            />
            {errors.make && <span className="error-message">{errors.make}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="model">Modelo *</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Corolla"
              className={errors.model ? 'input-error' : ''}
            />
            {errors.model && <span className="error-message">{errors.model}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="year">Año *</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder={new Date().getFullYear().toString()}
              className={errors.year ? 'input-error' : ''}
            />
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="kilometerage">Kilometraje *</label>
            <input
              type="number"
              id="kilometerage"
              name="kilometerage"
              value={formData.kilometerage}
              onChange={handleChange}
              placeholder="50000"
              className={errors.kilometerage ? 'input-error' : ''}
            />
            {errors.kilometerage && <span className="error-message">{errors.kilometerage}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image_url">URL Imagen *</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              className={errors.image_url ? 'input-error' : ''}
            />
            {errors.image_url && <span className="error-message">{errors.image_url}</span>}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Agregando...' : '✅ Agregar'}
          </button>
        </form>

        {formData.image_url && /^https?:\/\/.+/.test(formData.image_url) && (
          <div className="image-preview">
            <img src={formData.image_url} alt="Vista previa" onError={(e) => {
              e.target.style.display = 'none';
            }} />
          </div>
        )}

        <p className="form-note">* Los campos marcados con asterisco son obligatorios</p>
      </div>
    </div>
  );
}

export default CarForm;
