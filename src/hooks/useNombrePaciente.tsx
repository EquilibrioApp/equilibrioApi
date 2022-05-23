import { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import inicioApi from "../api/inicioApi";
import { Paciente, PatientNamesResponseDto, PatientsNamesDto } from "../interfaces/appInterfaces";

export const useNombrePaciente = () => {


    const [isLoading, setIsLoading] = useState( true )

    const [names, setNames] = useState<PatientsNamesDto[]>([]); 

    useEffect(() => {
        getNombres();
    }, [])
    

    const getNombres = async () => {

        const idEspecialista = await AsyncStorage.getItem('id');
        try {
            const resp = await inicioApi.get<PatientsNamesDto[]>(`/doctor/${idEspecialista}/pacientes`);
            setNames(resp.data);
            setIsLoading(false);
        } catch (error) {
            throw new Error("Error al obtener los nombres de los pacietnes.");
        }
    }
    return {
        isLoading,
        names
    }
}
