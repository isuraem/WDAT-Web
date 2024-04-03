import axios from 'axios';
import { successHandler } from '../interceptors';
import { errorHandler } from '../interceptors';

const BASE_URL = process.env.REACT_APP_REST_API_BASE_URL;


// Init Axios
export const axiosInstance = axios.create({ baseURL: BASE_URL })


//Axios response interceptor
axiosInstance.interceptors.response.use(
    response => successHandler(response.data),
    error => errorHandler(error.response),
)
