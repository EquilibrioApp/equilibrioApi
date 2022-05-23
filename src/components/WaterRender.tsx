import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import inicioApi from '../api/inicioApi';
import {Patient} from '../interfaces/appInterfaces';
import {Avance, Peso} from '../interfaces/PatientsInterfaces';
import {Use} from 'react-native-svg';

interface Props {
  children: (value: any) => JSX.Element;
  setGlassOfWater: (value: number) => void;
  setLittersOfWatter: (value: string) => void;
}

interface fetchState {
  peso: number;
  sexo: string;
}

const [avance, setAvance] = useState<Peso>();
// let avance1?:string;

export const WaterRender = ({
  children,
  setGlassOfWater,
  setLittersOfWatter,
}: Props) => {
  const [user, setUser] = useState<Patient>();
  

  const loadExpediente = async () => {
    try {
      const UserId = await AsyncStorage.getItem('id');
      console.log(UserId);
      const resp = await inicioApi.get<Patient>(`/patient/${UserId}`);
      // console.log('Exp: ' + resp.data);
      setUser(resp.data);
      const respAvance = await inicioApi.get<Avance[]>(
        `/${resp.data.nutriCodigo.id}/avance`,
      );
      // console.log('Avance' + respAvance.data[0].peso.peso);
      setAvance(respAvance.data[0].peso);
    } catch (error) {
      throw new Error('Error al obtener los datos del Paciente.');
    }
  };

  // avance1=avance?.peso;

  const {peso, sexo} = useFetch();
  const startNumVasos =
    sexo === 'M' ? (peso * 0.033) / 0.25 : (peso * 0.033) / 0.25;

  const {numVasos, setNumVasos, vasos} = useGlassesHandler(
    Math.round(startNumVasos),
    children,
  );

  useEffect(() => {
    const numGlasses =
      sexo === 'M' ? (peso * 0.033) / 0.25 : (peso * 0.033) / 0.25;

    setLittersOfWatter(
      sexo === 'M' ? (peso * 0.033).toFixed(1) : (peso * 0.033).toFixed(1),
    );
    setGlassOfWater(Math.round(numGlasses));
    setNumVasos(Math.round(numGlasses));
    loadExpediente();
  }, [peso]);

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      {vasos}
    </View>
  );
};

function useFetch() {
  const [state, setState] = useState<fetchState>({
    peso: 0,
    sexo: '',
  });

  useEffect(() => {
    setState({peso: 80, sexo: 'H'});
  }, []);

  return state;
}

function useGlassesHandler(
  startGlasses: number,
  children: (value: any) => JSX.Element,
) {
  const [numVasos, setNumVasos] = useState(8);
  console.log(numVasos);

  const vasos = [];

  function glassesCounter(cuentaVasos: boolean) {
    const newGlassesQuantity = cuentaVasos ? numVasos + 1 : numVasos - 1;
    setNumVasos(newGlassesQuantity);
  }
  console.log('numVasos', numVasos);
  for (let i = 0; i < startGlasses; i++) {
    vasos.push(children(glassesCounter));
  }

  console.log(vasos.length);

  return {numVasos, setNumVasos, vasos};
}
