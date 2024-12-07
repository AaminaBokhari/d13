import { toast } from 'react-toastify';

export const checkBackendHealth = async () => {
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    toast.error('Cannot connect to server');
    return false;
  }
};

export const testMongoConnection = async () => {
  try {
    const response = await fetch('/api/health/db');
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    toast.error('Cannot connect to database');
    return false;
  }
};