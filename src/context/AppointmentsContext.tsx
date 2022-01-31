import React, {createContext, useState, useEffect} from 'react';
import calendarApi from '../api/calendarApi';
import inicioApi from '../api/inicioApi';
import { AppointmentsDto, Cita } from '../interfaces/appInterfaces';

type AppointmentsContextProps = {
    loadAppointments: ( iCalUID: string ) => Promise<AppointmentsDto[]>;//TODO Pendiente
    addAppointment: ( summary: string, atendees: string ) => Promise<void>;
    updateAppointment: ( idCita: string, fechaInicio: string, fechaTermino: string) => Promise<void>;
    deleteAppointment: ( idCita: string) => Promise<void>;
    loadAppointmentById: (idCita: string) => Promise<AppointmentsDto>;
  
}

export const AppointmentsContext = createContext({});

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
  const loadAppointmentById = async(idCita: string): Promise<Cita> => {
    const resp = await inicioApi.get<Cita>(`calendar/cita/${ idCita }`); /* Manda el Id que reciba de la cita requerida */
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
