import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (login: string, senha: string): Promise<string> => {
  const response = await instance.post('/login', { login, senha });
  const token = response.data.token;
  localStorage.setItem('token', token);
  return token;
};

export default instance;
