import axios from 'axios';

let redirectFunction; // Variable para almacenar la función de redirección

export const setRedirectFunction = (func) => {
  redirectFunction = func;
};

const instance = axios.create({
  baseURL: 'http://localhost:8083',  
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Aquí puedes implementar lógica para renovar el token o redirigir a la página de login
        // Ejemplo: history.push('/login');
        redirectFunction('/login'); 
        localStorage.clear()
        console.log('Token expired, redirecting to login page...');
      } catch (error) {
        console.error('Error handling token expiration:', error);
      }
    }
    return Promise.reject(error);
  }
);


export const fetchData = async () => {
    const response = await instance.get('/moodle/courses');
    return response.data;
  };

  export const syncData = async () => {
    await instance.put('/admin/grades');
    return "ok";
  };

  export const syncSpecificData = async (data) => {
    await instance.put('/admin/grades',data);
    return "ok";
  };

export const registerUser = async (username, password) => {
    const response = await instance.post('/admin/registrar', { username, password });
    return response.data;
  };
  
  export const loginUser = async (username, password) => {
    const response = await instance.post('/admin/login', { username, password });
    return response.data;
  };