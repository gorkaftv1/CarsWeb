import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiService = {
    getCars : async () => {
        try {
            const response = await axios.get(`${API_URL}/cars`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cars:', error);
            throw error;
        }
    },

    getCarById : async (id) => {
        try {
            const response = await axios.get(`${API_URL}/cars/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching car with id ${id}:`, error);
            throw error;
        }
    },

    createCar : async (carData) => {
        try {
            const response = await axios.post(`${API_URL}/cars`, carData);
            return response.data;
        } catch (error) {
            console.error('Error creating car:', error);
            throw error;
        }
    },

    deleteCar : async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/cars/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting car with id ${id}:`, error);
            throw error;
        }
    },

    updateCar : async (id, carData) => {
        try {
            const response = await axios.put(`${API_URL}/cars/${id}`, carData);
            return response.data;
        } catch (error) {
            console.error(`Error updating car with id ${id}:`, error);
            throw error;
        }
    },

    getCarsByMake : async (make) => {
        try {
            const response = await axios.get(`${API_URL}/cars/make/${make}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching cars by make ${make}:`, error);
            throw error;
        }
    },

    healthCheck : async () => {
        try {
            const response = await axios.get(`${API_URL}/health`);
            return response.data;
        } catch (error) {
            console.error('Error performing health check:', error);
            throw error;
        }
    }
}

export default apiService;