import { useEffect, useState } from "react";

import inicioApi from "../api/inicioApi";
import { Paciente, PatientNamesResponseDto } from "../interfaces/appInterfaces";

export const useAddNote = () => {
    
    const [note, setNote] = useState(); 

    useEffect(() => {
       postNote();
    }, [])
    

    const postNote = async () => {
        console.log('Note: ' + note);
        // const resp = await inicioApi.post('/calendar/pacientes', note);
        // if (resp.status === 200) {
        //     console.log(resp.data)
        // }
    }
    return {
        setNote
    }
}