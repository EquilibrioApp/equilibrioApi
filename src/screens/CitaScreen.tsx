import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import inicioApi from '../api/inicioApi';
import { RegistrosCard } from '../components/RegistrosCard';
import {Ejercicio, Registro} from '../interfaces/appInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {lyricsStyle} from '../theme/LyricsTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'CitaScreen'> {}
//TODO Jaime la parte de la cita aqui plox

export const CitaScreen = ({route, navigation}: Props) => {
  const [ejercicio, setEjercicio] = useState<Ejercicio[]>([]);
  const [preguntas, setPreguntas] = useState<Registro[]>([]);

  const loadRegistro = async () => {
    const {id} = route.params;
    console.log('idExpediente: ' + id);
    const resp = await inicioApi.get<Registro[]>(`/registro/expediente/${id}`); //TODO cambiar a expediente del especialist
    console.log('Registro: ' + JSON.stringify(resp.data));
    setPreguntas([...resp.data]);
  };

  const loadEjercicio = async () => {
    const {id} = route.params;
    console.log('idExpediente: ' + id);
    const resp = await inicioApi.get<Ejercicio[]>(`/ejercicio/expediente/${id}`); //TODO cambiar a expediente del especialist
    console.log('Ejercicio: ' + JSON.stringify(resp.data));
    setEjercicio([...resp.data]);
  };

  useEffect(() => {
    loadRegistro();
    loadEjercicio();
  }, []);

  return (
    <>
      <Text style={lyricsStyle.labelBold}> Registro cuestionario </Text>
      <FlatList
        data={preguntas}
        keyExtractor={e => e.id}
        renderItem={({item}) => <RegistrosCard preguntas={item} />}
        // renderItem={({item}) => (
        //   <TouchableOpacity
        //     activeOpacity={0.8}
        //     // onPress={() =>}
        //   >
        //     <View style={styles.expedienteCard}>
        //       <Text style={styles.expedienteName}>
        //         {'Registro fecha : ' + item.createdAt}
        //       </Text>
        //     </View>
        //   </TouchableOpacity>
        // )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      


      <Text style={lyricsStyle.labelBold}> Registro ejercicio</Text>
      <FlatList
        data={ejercicio}
        keyExtractor={e => e.id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            // onPress={() =>}
          >
            <View style={styles.expedienteCard}>
              <Text style={styles.expedienteName}>
                {'Fecha: ' + item.createdAt}
              </Text>
              <Text style={styles.expedienteName}>
                {'Ejercicio: ' + item.exercises + 'Tiempo: ' + item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </>
  );
};

// <ScrollView>
//           <ScrollView horizontal={true} >
//             <Text style={lyricsStyle.labelBold}>Estatura:</Text>
//             <TextInput
//               keyboardType="numeric"
//               {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
//               editable
//               maxLength={3}
//               style={expedienteStyles.textInputStyle}
//             />
//             <Text style={lyricsStyle.labelBold}>cm</Text>
//           </ScrollView>
//         </ScrollView>
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
