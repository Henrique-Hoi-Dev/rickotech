import axios from 'axios';

const api2 = axios.create({
  baseURL: `http://localhost:3434`,
});

export default api2;
