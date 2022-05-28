import { StackScreenProps } from '@react-navigation/stack';
import React, {useContext, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SearchPatient} from '../components/SearchPatient';
import {ExpedientesContext} from '../context/ExpedientesContext';
import { ExpedienteDto } from '../interfaces/appInterfaces';
import { ExpedientesStackParams } from '../navigator/ExpedientesNavigator';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'SearchScreen'> {}

export const SearchPatientScreen = ({navigation}: Props) => {
  const {expediente, loadExpediente} = useContext(ExpedientesContext);
  const [term, setTerm] = useState('');
  const [expedientesFiltrados, setExpedientesFiltrados] = useState<ExpedienteDto[]>([]);


  useEffect(() => {
    
    if (term.length === 0) {
      return setExpedientesFiltrados([]);
    }

    setExpedientesFiltrados(
      expediente.filter(expedienteMapeado => expedienteMapeado.nombre.includes( term ))
    );

  }, [term]);



  return (
    <View style={styles.container}>
      <SearchPatient 
      onDebounce={ ( value ) => setTerm(value)}
      />

      <FlatList
        data={expedientesFiltrados}
        keyExtractor={e => e.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('MenuExpedienteScreen', {
                id: item.id,
                nombre: item.nombre,
                birthDate: item.birthDate,
                sexo: item.sexo,
                alturaPaciente: item.alturaPaciente, //TODO VER ID DEL ESPECIALISTA
              })
            }>
            <View style={styles.expedienteCard}>
              <Text style={styles.expedienteName}>{item.nombre}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} 
        />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    alignItems: 'center',
    padding: 10,
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
  expedienteName: {
    fontSize: 20,
    marginHorizontal: 20,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
});
