import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://localhost:3000';

const inicioApi = axios.create({ baseURL });

//Middleware de Axios para no tener que mandar el token cada que sea necesario para la 
//petición
inicioApi.interceptors.request.use(

    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);


export default inicioApi;