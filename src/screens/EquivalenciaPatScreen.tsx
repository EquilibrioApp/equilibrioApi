import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {Styles} from '../theme/StyleTheme';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useForm} from '../hooks/usForms';
import inicioApi from '../api/inicioApi';
import {EquivalenciaDoctor, Patient} from '../interfaces/appInterfaces';

interface Props
  extends StackScreenProps<any, any> {}

export const EquivalenciaPatScreen = ({navigation, route}: Props) => {
  const [view, setView] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubGroup, setSelectedSubGroup] = useState('');
  const [selectedMeasure, setSelectedMeasure] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const [equivalencia, setEquivalencia] = useState<EquivalenciaDoctor[]>([]);
  const [equivalenciaDoctor, setEquivalenciaDoctor] = useState<EquivalenciaDoctor[]>([]);

  const {nombre, grupoAlimencio, subgrupo, medida, racion, form, onChange} =
    useForm({
      nombre: '',
      grupoAlimencio: '',
      subgrupo: '',
      medida: '',
      racion: '',
    });

  const AddEquivalencia = async () => {
    if (nombre.length !== 0) {
      console.log('Lenght of Alimento: ' + nombre.length);
      console.log({nombre, grupoAlimencio, subgrupo, medida, racion});

      const id = AsyncStorage.getItem('id');
      const respEx = await inicioApi.get<EquivalenciaDoctor[]>(
        `/equivalencia/${id}`,
      );
      setEquivalencia(respEx.data);
      console.log(respEx.data);
      const resp = await inicioApi.post<EquivalenciaDoctor>(
        `/expediente/equivalencia`,
        {equivalencia},
      );
      console.log(resp.status);
    } else {
      Alert.alert('El campo Nombre debe estar lleno.');
    }
  };

  const loadEquivalencia = async () => {
    const user = await AsyncStorage.getItem('id');
    console.log('user: ' + user);
    const respUser = await inicioApi.get<Patient>(`/patient/${user}`);
    console.log('Exp: ' + respUser.data.nutriCodigo.id);
    const id =respUser.data.nutriCodigo.id;
    const resp = await inicioApi.get<EquivalenciaDoctor[]>(
      `/expediente/equivalencia/expediente/${id}`,
    ); //TODO cambiar a expediente del especialist
    console.log('Equivalencia: ' + JSON.stringify(resp.data));
    setEquivalencia([...resp.data]);
  };

  const loadEquivalenciaDoctor = async () => {
    const user = await AsyncStorage.getItem('id');
    console.log('user: ' + user);
    const respUser = await inicioApi.get<Patient>(`/patient/${user}`);
    console.log('Exp: ' + respUser.data.nutriCodigo.id);
    const idEspecialista =respUser.data.nutriCodigo.doctor.id;
    const resp = await inicioApi.get<EquivalenciaDoctor[]>(
      `/equivalencia/doctor/${idEspecialista}`,
    ); //TODO cambiar a expediente del especialist
    console.log('Equivalencia: ' + JSON.stringify(resp.data));
    setEquivalenciaDoctor([...resp.data]);
  };

  useEffect(() => {
    loadEquivalencia();
    loadEquivalenciaDoctor();
  }, [view]);

  return (
    <View style={styles.container}>

      <FlatList
        data={equivalencia}
        keyExtractor={e => e.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>}
          >
            <View style={styles.expedienteCard}>
              <Text style={styles.expedienteName}>
                {'Grupo alimenticio: ' + item.grupoAlimencio}
              </Text>
              <Text style={styles.expedienteName}>
                {'Alimento: ' + item.nombre}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <FlatList
        data={equivalenciaDoctor}
        keyExtractor={e => e.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>}
          >
            <View style={styles.expedienteCard}>
              <Text style={styles.expedienteName}>
                {'Grupo alimenticio: ' + item.grupoAlimencio}
              </Text>
              <Text style={styles.expedienteName}>
                {'Alimento: ' + item.nombre}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expedienteName: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
  expedienteCard: {
    marginHorizontal: 10,
    backgroundColor: '#F5F5F8',
    height: 90,
    width: 350,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '96%',
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalComplianceTittle: {
    marginBottom: 50,
    color: 'dodgerblue',
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 28,
  },
  modalComplianceSubTittle: {
    // marginBottom: 20,
    fontWeight: '100',
    textAlign: 'justify',
    marginBottom: 10,
    fontSize: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 30,
    alignItems: 'center',
  },
  checkbox: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  continueButton: {
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#F5F5F5',
  },
  inputNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    width: '40%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 5,
  },
  inputNotaNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: 'black',
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  tituloModalAgregarNota: {
    fontWeight: '100',
    fontSize: 30,
    marginVertical: 10,
  },
  headerContainerModal: {
    // height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginTop: 15,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
});