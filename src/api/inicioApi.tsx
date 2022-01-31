import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://127.0.0.1:4000/api';

const inicioApi = axios.create({ baseURL });

//Middleware de Axios para no tener que mandar el token cada que sea necesario para la 
//petición
inicioApi.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }
);


export default inicioApi;