import React, {createContext, useState, useEffect} from 'react';
import inicioApi from '../api/inicioApi';
import { AppointmentsDto, Cita } from '../interfaces/appInterfaces';

type AppointmentsContextProps = {
    appointments: Cita[],
    loadAppointments: ( ) => Promise<void>;//TODO Pendiente
    addAppointment: ( correo: string, fechaInicio: string, fechaTermino: string ) => Promise<void>;
    updateAppointment: ( idCita: string, correo: string, fechaInicio: string, fechaTermino: string) => Promise<void>;
    deleteAppointment: ( idCita: string) => Promise<void>;
    loadAppointmentById: (id: string) => Promise<Cita>;
  
}

export const AppointmentsContext = createContext({} as AppointmentsContextProps);

export const AppointmentsProvider = ({children}: any) => {

  const [appointments, setAppointments] = useState<Cita[]>([]);

  useEffect(() => {
    loadAppointments();
  }, [])
  
  
  const loadAppointments = async() => {

    const resp = await inicioApi.get<AppointmentsDto>('calendar/listar');
    // setAppointments([...appointments, ...resp.data.citas]);
    setAppointments([...resp.data.citas]);
    console.log(resp.data.citas);

  }
  const addAppointment = async( summary: string, atendees: string ) => {

  }
  const updateAppointment = async( idCita: string, fechaInicio: string, fechaTermino: string) => {

  }
  const deleteAppointment = async( idCita: string) => {

  }
  const loadAppointmentById = async(id: string): Promise<Cita> => {
    const resp = await inicioApi.get<Cita>(`calendar/cita/${ id }`); /* Manda el Id que reciba de la cita requerida */
    return resp.data;
  }


  return(
      <AppointmentsContext.Provider value={{
        appointments,
        loadAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        loadAppointmentById
      }}>
        {children}
      </AppointmentsContext.Provider>
  )
    
}
