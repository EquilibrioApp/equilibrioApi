import {NumericLiteral} from '@babel/types';
import React, {createContext, useEffect, useState} from 'react';
import inicioApi from '../api/inicioApi';
import {ExpedienteDto} from '../interfaces/appInterfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ExpedientesContextProps = {
  expediente: ExpedienteDto[];//| undefined;
  loadExpediente: () => Promise<void>; //Cargar productos
  addExpediente: (
    nombre: string,
    sexo: string,
    altura: number,
    birthDate: Date,
    doctor: string,
  ) => Promise<void>;
  updateExpediente: (
    id: string,
    nombre: string,
    sexo: string,
    altura: number,
    birthDate: Date,
    doctor: string,
  ) => Promise<void>;
  loadExpedienteById: (id: string) => Promise<ExpedienteDto[]>;
  addMeta: (
    expediente: string,
    pesoIncial: number,
    pesoMeta: number,
    fechaMeta: Date,
  ) => Promise<void>;
  addEjercicio: (exercises: string, expediente: string) => Promise<void>;
  addRegistros: (
    preguntaUno: boolean,
    preguntaDos: string,
    preguntaTres: number,
    preguntaCuatro: boolean,
    preguntaCinco: boolean,
    preguntaSeis: boolean,
    preguntaSiete: number,
    preguntaOcho: number,
    preguntaNueve: number,
    preguntaDiez: number,
    preguntaOnce: number,
    preguntaDoce: number,
    expediente: string,
  ) => Promise<void>;
  addAvance: (
    id: string,
    observacion: string,
    expediente: string,
  ) => Promise<void>;
  addPeso: (avanceId: string, peso: number) => Promise<void>;
  addIndices: (
    avanceId: string,
    masaCorporal: number,
    masaGrasal: number,
    masaOsea: number,
    masaResidual: number,
    masaMuscular: number,
  ) => Promise<void>;
  addCircunferencia: (
    avanceId: string,
    femoral: number,
    biestiloideo: number,
    cuello: number,
    cintura: number,
    cadera: number,
    brazo: number,
    pierna: number,
  ) => Promise<void>;
  addPliegues: (
    avanceId: string,
    tricipital: number,
    pectoral: number,
    bicipital: number,
    suprailiaca: number,
    subescular: number,
    pantorrillaMedia: number,
    abdominal: number,
    musloMedio: number,
    midaxilar: number,
  ) => Promise<void>;
};

export const ExpedientesContext = createContext({} as ExpedientesContextProps);

export const ExpedientesProvider = ({children}: any) => {

  // const token = AsyncStorage.getItem('id', data.);

  const [expediente, setExpediente] = useState<ExpedienteDto[]>([]);

  useEffect(() => {
    loadExpediente();
  }, [])

  const loadExpediente = async () => {
    const resp = await inicioApi.get<ExpedienteDto[]>('/expediente') //TODO cambiar a expediente del especialist
    setExpediente([...resp.data]);
    // setExpediente(expediente);
    // console.log(expediente);
  };

  const addExpediente = async (
    nombre: string,
    sexo: string,
    altura: number,
    birthDate: Date,
    doctor: string,
  ) => {};

  const updateExpediente = async (
    id: string,
    nombre: string,
    sexo: string,
    altura: number,
    birthDate: Date,
    doctor: string,
  ) => {};

  const loadExpedienteById = async (id: string) => {
    throw new Error('Not implemented');
  };

  const addMeta = async (
    expediente: string,
    pesoIncial: number,
    pesoMeta: number,
    fechaMeta: Date,
  ) => {};

  const addEjercicio = async (exercises: string, expediente: string) => {};

  const addRegistros = async (
    preguntaUno: boolean,
    preguntaDos: string,
    preguntaTres: number,
    preguntaCuatro: boolean,
    preguntaCinco: boolean,
    preguntaSeis: boolean,
    preguntaSiete: number,
    preguntaOcho: number,
    preguntaNueve: number,
    preguntaDiez: number,
    preguntaOnce: number,
    preguntaDoce: number,
    expediente: string,
  ) => {};

  const addAvance = async (
    id: string,
    observacion: string,
    expediente: string,
  ) => {};

  const addPeso = async (avanceId: string, peso: number) => {};

  const addIndices = async (
    avanceId: string,
    masaCorporal: number,
    masaGrasal: number,
    masaOsea: number,
    masaResidual: number,
    masaMuscular: number,
  ) => {};

  const addCircunferencia = async (
    avanceId: string,
    femoral: number,
    biestiloideo: number,
    cuello: number,
    cintura: number,
    cadera: number,
    brazo: number,
    pierna: number,
  ) => {};

  const addPliegues = async (
    avanceId: string,
    tricipital: number,
    pectoral: number,
    bicipital: number,
    suprailiaca: number,
    subescular: number,
    pantorrillaMedia: number,
    abdominal: number,
    musloMedio: number,
    midaxilar: number,
  ) => {};

  return (
    <ExpedientesContext.Provider
      value={{
        expediente,
        loadExpediente,
        addExpediente,
        updateExpediente,
        loadExpedienteById,
        addMeta,
        addEjercicio,
        addRegistros,
        addAvance,
        addPeso,
        addIndices,
        addCircunferencia,
        addPliegues,
      }}>
      {children}
    </ExpedientesContext.Provider>
  );
};
