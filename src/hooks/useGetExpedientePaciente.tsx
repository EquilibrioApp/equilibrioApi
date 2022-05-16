import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import inicioApi from '../api/inicioApi';
import { User } from '../interfaces/appInterfaces';


export const useGetExpediente = () => {

    const [isLoading, setisLoading] = useState(true);
    const [user, setUser] = useState<User>(); 


    const loadPatient = async() => {

        try {
            setisLoading(true);
            const idUsuario = await AsyncStorage.getItem('id');
            const resp = await inicioApi.get<User>(`/patient/${idUsuario}`);
            console.log(resp.data);
            setUser(resp.data);
            setisLoading(false);
        } catch (error) {
            throw new Error("Error al obtener los datos del Paciente.")
        }
    }

    useEffect(() => {
        loadPatient();
    }, [])   

    return{ 
        isLoading,
        user
    }
}