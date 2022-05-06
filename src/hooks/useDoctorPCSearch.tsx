import { useEffect, useState } from 'react';
import inicioApi from '../api/inicioApi';
import { SearchDoctorByPC } from '../interfaces/appInterfaces';




export const useDoctorPCSearch = (pc: string) => {

    const [isLoading, setisLoading] = useState(true);
    const [doctorsList, setDoctorsList] = useState<SearchDoctorByPC[]>([]);


    const loadDoctors = async() => {

        try {
            setisLoading(true);
            const resp = await inicioApi.get<SearchDoctorByPC[]>(`/doctor/find/${pc}`);
            console.log(resp.data);
            setDoctorsList([...resp.data]);
            setisLoading(false);
        } catch (error) {
            throw new Error("Error al obtener los datos del especialista por medio del CP.")
        }
    }

    useEffect(() => {
      loadDoctors();
    }, [])   

    return{ 
        isLoading,
        doctorsList
    }
}