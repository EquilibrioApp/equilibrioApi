import {Picker} from '@react-native-picker/picker';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Use} from 'react-native-svg';
import inicioApi from '../api/inicioApi';
import {useForm} from '../hooks/usForms';
import {Ejercicio, Patient, User} from '../interfaces/appInterfaces';
import {PatientStackParams} from '../navigator/PatientNavigator';

interface Props
  extends StackScreenProps<PatientStackParams, 'ExcerciseRegister'> {}

export const ExcerciseMainScreen = ({route, navigation}: Props) => {
  const [selectedValue, setSelectedValue] = useState('');

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();

  const [user, setUser] = useState<Patient>();
  const [ejercicio, setEjercicio] = useState<Ejercicio[]>([]);

  const {exercises, expedienteId, onChange} = useForm({
    exercises: '',
    // time: minutes,
    expedienteId:'',
  });

  // const loadPatient = async (UserId: string) => {
  //   try {
  //     const resp = await inicioApi.get<Patient>(`/patient/${UserId}`);
  //     console.log('Exp: '+resp.data.nutriCodigo.id);
  //     setUser(resp.data);
  //     return resp.data.nutriCodigo.id
  //   } catch (error) {
  //     throw new Error('Error al obtener los datos del Paciente.');
  //   }
  // };

  const addExercises = async () => {
    try {
      const time = minutes;
      console.log( time);
      const {UserId} = route.params;
      const respEx = await inicioApi.get<Patient>(`/patient/${UserId}`);
      console.log('Exp: '+respEx.data.nutriCodigo.id);
      const expediente = respEx.data.nutriCodigo.id;
      setUser(respEx.data);
      console.log('expediente: '+ expedienteId)
      onChange(expediente,'expedienteId');
      // onChange(minutes, 'time')
      console.log('time: '+time);
      const resp = await inicioApi.post<Ejercicio>(`/ejercicio`, {exercises, time, expediente});
      console.log(resp.status);
    } catch (error) {
      throw new Error('Error al registrar los datos del ejercicio.');
    }
  }

  const startTimer = () => {
    setCustomInterval(
      setInterval(() => {
        changeTime();
      }, 1000),
    );
  };

  const stopTimer = () => {
    if (customInterval) {
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    addExercises()
    stopTimer();
    setSeconds(0);
    setMinutes(2);
  };

  const changeTime = () => {
    setSeconds(prevState => {
      if (prevState + 1 == 60) {
        setMinutes(minutes + 1);
        return 0;
      }
      return prevState + 1;
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={{width: 400, height: 350}}
          source={require('../assets/exercise.png')}
        />
        <Text style={styles.textTimer}>
          {minutes < 10 ? '0' + minutes : minutes}:
          {seconds < 10 ? '0' + seconds : seconds}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startTimer}>
            <Text style={styles.textBotton}>Iniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.textBotton}>Pausar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clear}>
            <Text style={styles.textBotton}>Guardar</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#FE7D56',
            borderRadius: 20,
            marginTop: 20,
          }}>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>{
              setSelectedValue(itemValue);
              onChange(itemValue, 'exercises');
            }}
            itemStyle={{
              backgroundColor: 'grey',
              color: 'blue',
              fontFamily: 'Ebrima',
              fontSize: 17,
            }}>
            <Picker.Item label="Artes Marciales" value="Artes Marciales" />
            <Picker.Item label="Baloncesto" value="Baloncesto" />
            <Picker.Item label="Baile" value="Baile" />
            <Picker.Item label="Bicicleta " value="Bicicleta " />
            <Picker.Item label="Boxeo" value="Boxeo" />
            <Picker.Item label="Caminar " value="Caminar " />
            <Picker.Item label="Correr " value="Correr " />
            <Picker.Item label="Esgrima" value="Esgrima" />
            <Picker.Item label="Fútbol" value="Fútbol" />
            <Picker.Item label="Gym " value="Gym " />
            <Picker.Item label="Karate" value="Karate" />
            <Picker.Item label="Nadar " value="Nadar " />
            <Picker.Item label="Pilates " value="Pilates " />
            <Picker.Item label="Taekwondo" value="Taekwondo" />
            <Picker.Item label="Voleibol" value="Voleibol" />
            <Picker.Item label="Yoga " value="Yoga " />
          </Picker>
        </View>

        {/* <StatusBar style="auto"/> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTimer: {
    fontSize: 80,
  },
  textBotton: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FE7D56',
    padding: 10,
    borderRadius: 20,
  },
  buttonContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});
