import { useEffect, useState } from "react";

import inicioApi from "../api/inicioApi";
import { Paciente, PatientNamesResponseDto } from "../interfaces/appInterfaces";

export const useNombrePaciente = () => {


    const [pacientes, setNames] = useState<Paciente[]>([]); 

    useEffect(() => {
       getNombres();
    }, [])
    

    const getNombres = async () => {
        const resp = await inicioApi.get<PatientNamesResponseDto>('/calendar/pacientes');
        setNames(resp.data.pacientes);
    }
    return {
        pacientes
    }
}
