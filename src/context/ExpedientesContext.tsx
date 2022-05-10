import {NumericLiteral} from '@babel/types';
import React, {createContext, useEffect, useState} from 'react';
import inicioApi from '../api/inicioApi';
import {Avance, ExpedienteDto} from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ExpedientesContextProps = {
  expediente: ExpedienteDto[]; //| undefined;
  avances: Avance[];
  loadExpediente: () => Promise<void>; //Cargar productos
  loadAvances: (id: string) => Promise<void>;
}

export const ExpedientesContext = createContext({} as ExpedientesContextProps);

export const ExpedientesProvider = ({children}: any) => {
  // const token = AsyncStorage.getItem('id', data.);

  const [expediente, setExpediente] = useState<ExpedienteDto[]>([]);
  const [avances, setAvances] = useState<Avance[]>([]);

  useEffect(() => {
    loadExpediente();
    loadAvances('');
  }, []);

  const loadExpediente = async () => {
    const resp = await inicioApi.get<ExpedienteDto[]>('/expediente'); //TODO cambiar a expediente del especialist
    setExpediente([...resp.data]);
    // setExpediente(expediente);
    // console.log(expediente);
  };

  const loadAvances = async (id: string) => {
    const resp = await inicioApi.get<Avance[]>(`/${id}/avance`); //TODO cambiar a expediente del especialist
    setAvances([...resp.data]);
  };

  
  return (
    <ExpedientesContext.Provider
      value={{
        expediente,
        avances,
        loadExpediente,
        loadAvances,
      }}>
      {children}
    </ExpedientesContext.Provider>
  );
};
