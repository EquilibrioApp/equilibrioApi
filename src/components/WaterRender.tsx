import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

interface Props {
  children: ( value: any ) => JSX.Element,
  setGlassOfWater: ( value: number ) => void,
  setLittersOfWatter: ( value: string ) => void,
}

interface fetchState {
  peso: number;
  sexo: string;
}
export const WaterRender = ({children, setGlassOfWater, setLittersOfWatter}: Props) => {

  const {peso, sexo} = useFetch();
  const startNumVasos = sexo === 'M' ? (peso * 0.033) / 0.25 : (peso * 0.033) / 0.25;
  
  const {numVasos, setNumVasos ,vasos} = useGlassesHandler( Math.round(startNumVasos), children);

  useEffect(() => {
   const numGlasses = sexo === 'M' ? (peso * 0.033) / 0.25 : (peso * 0.033) / 0.25;

    setLittersOfWatter((sexo === 'M') ? ((peso * 0.033)).toFixed(1) : ((peso * 0.033)).toFixed(1))
    setGlassOfWater(Math.round(numGlasses));
    setNumVasos(Math.round(numGlasses));

  }, [peso]);
  

  return(
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>{vasos}</View>
  ) 
};


function useFetch() {
  const [state, setState] = useState<fetchState>({
    peso: 0,
    sexo: '',
  });

  useEffect(() => {

    
    setState({peso: 105, sexo: 'H'});
  }, []);

  return state;
}

function useGlassesHandler(startGlasses: number, children: (value: any) => JSX.Element) {
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
