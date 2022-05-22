import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import inicioApi from '../api/inicioApi';
import {useForm} from '../hooks/usForms';
import {Patient} from '../interfaces/appInterfaces';
import {Avance} from '../interfaces/PatientsInterfaces';
import {PatientStackParams} from '../navigator/PatientNavigator';

interface Props
  extends StackScreenProps<PatientStackParams, 'MetaAvancesScreen'> {}

export const MetaAvancesScreen = ({route, navigation}: Props) => {
  const {UserId} = route.params;

  const [user, setUser] = useState<Patient>();
  const [avance, setAvance] = useState<Avance[]>([]);

  const loadExpediente = async (UserId: string) => {
    try {
      const resp = await inicioApi.get<Patient>(`/patient/${UserId}`);
      console.log('Exp: ' + resp.data);
      setUser(resp.data);
      const respAvance = await inicioApi.get<Avance[]>(
        `/${resp.data.nutriCodigo.id}/avance`,
      );
      console.log('Avance' + respAvance.data);
      setAvance(respAvance.data);
      return respAvance;
    } catch (error) {
      throw new Error('Error al obtener los datos del Paciente.');
    }
  };

  useEffect(() => {
    loadExpediente(UserId);
  }, []);

  return (
    <>
      <FlatList
        data={avance}
        keyExtractor={e => e.id}
        renderItem={({item}) => (
          <View style={styles.expedienteCard}>
            <Text style={styles.expedienteName}>
              {'Fecha: ' + item.createdAt}
            </Text>
            <Text style={styles.expedienteName}>{'Peso: ' + item.peso.peso+ 'kg'}</Text>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    alignItems: 'center',
  },
  datePickerStyle: {
    width: 230,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
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
  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginTop: 22
  },
  subcontainerModal: {
    height: '90%',
    width: '95%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
  headerContainerModal: {
    // height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    // alignItems: 'center',
  },
  inputNota: {
    borderWidth: 0.3,
    borderRadius: 10,
    // height: 200,
    width: '90%',
    paddingHorizontal: 10,
  },
  touchableCrearExpediente: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    // marginVertical: 10,
  },
  touchableCrearExpedienteTexto: {
    fontWeight: '100',
    fontSize: 26,
    color: '#24FF00',
    // margin: 10,
  },
  title: {
    color: '#000',
    fontSize: 20,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
  titleT: {
    color: '#000',
    fontSize: 40,
    // fontWeight: 'bold',
    marginVertical: 10,
    // marginHorizontal: 40,
    fontWeight: '100',
  },
});
