// api.js
import axios from "axios";

// Define a URL base da API
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Configuração do Axios
const instance = axios.create({
  baseURL,
  // Outras configurações, se necessário
});

export default instance;
