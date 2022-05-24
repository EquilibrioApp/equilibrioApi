import { useEffect, useState } from 'react';
import inicioApi from '../api/inicioApi';
import { SearchDoctorByPC } from '../interfaces/appInterfaces';
import { Alert } from 'react-native';


export const useDoctorPCSearch = () => {

    const [isLoading, setisLoading] = useState(true);
    const [doctorsList, setDoctorsList] = useState<SearchDoctorByPC[]>();
    const [postalCode, setPostalCode] = useState('Init');


    console.log(postalCode, ' Prueba Postal code en el Hook');

    const loadDoctors = async() => {

        try {
            setisLoading(true);
            const resp = await inicioApi.get<SearchDoctorByPC[]>(`/doctor/find/${postalCode}`);
            console.log(resp.data);
            setDoctorsList([...resp.data]);
            setisLoading(false);
        } catch (error) {
            Alert.alert('El Código Postal introducido no fue encontrado');
            // throw new Error("Error al obtener los datos del especialista por medio del CP.")
        }
    }

    useEffect(() => {
        if(postalCode !== 'Init'){
            loadDoctors();
        }
    }, [postalCode])   

    return{ 
        isLoading,
        doctorsList,
        setPostalCode
    }
}