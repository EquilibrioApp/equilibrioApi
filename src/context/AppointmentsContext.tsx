import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import inicioApi from '../api/inicioApi';
import { AppointmentsDto } from '../interfaces/appInterfaces';

type AppointmentsContextProps = {
    appointments: AppointmentsDto[],
    loadAppointments: (  ) => Promise<void>;//TODO Pendiente
    addAppointment: ( correoEspecialista: string, correoPaciente: string ) => Promise<void>;
    updateAppointment: ( start: string, end: string, id_agenda: string ) => Promise<void>;
    loadAppointmentById: ( id_agenda: string ) => Promise<AppointmentsDto>;
    deleteAppointment: ( id_agenda: string ) => Promise<void>;
  
}

export const AppointmentsContext = createContext({} as AppointmentsContextProps);

export const AppointmentsProvider = ({ children }: any) => {

  const [appointments, setAppointments] = useState<AppointmentsDto[]>([]);

  useEffect(() => {
    loadAppointments();
  }, [])
  
  
  const loadAppointments = async(  ) => {

    const idEspecialista = await AsyncStorage.getItem('id');

    try {
      const resp = await inicioApi.get<AppointmentsDto[]>('agenda/123569');
      setAppointments([...appointments, ...resp.data]);
      console.log(resp.data);
    } catch (error) {
      throw new Error("Error al obtener las citas del especialista en cuestion.");
    }

  }
  const addAppointment = async( correoEspecialista: string, correoPaciente: string ) => {

  }
  const updateAppointment = async( start: string, end: string, id_agenda: string ) => {

  }
  const deleteAppointment = async( id_agenda: string ) => {

  }
  const loadAppointmentById = async( id_agenda: string ) => {
    throw new Error ( 'Not implemented' );
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
