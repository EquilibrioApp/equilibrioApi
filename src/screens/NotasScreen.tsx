import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import inicioApi from '../api/inicioApi';
import {AvancesCard} from '../components/AvancesCard';
import {useAddNote} from '../hooks/useAddNote';
import {useForm} from '../hooks/usForms';
import {Avance as AvancesDto} from '../interfaces/appInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {Styles} from '../theme/StyleTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'NotasScreen'> {}

export const NotasScreen = ({route, navigation}: Props) => {
  const [view, setView] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [avances, setAvances] = useState<AvancesDto[]>([]);
  const {setNote} = useAddNote();

  // const {avances, loadAvances} = useContext(ExpedientesContext);

  const {id} = route.params;
  console.log('Id de route.params: ' + id);

  const {observacion, expedienteId, onChange} = useForm({
    observacion: '',
    expedienteId: id,
  });

  const loadAvances = async (id: string | undefined) => {
    console.log('Id que se recibe en el ExpedientesContext: ' + id);
    const resp = await inicioApi.get<AvancesDto[]>(`/${id}/avance`); //TODO cambiar a expediente del especialist
    console.log('Respuesta de la api loadAvances: ' + resp.data);
    setAvances([...resp.data]);
  };

  const onAddNote = async () => {
    console.log();
    try {
      const resp = await inicioApi.post(`/${expedienteId}/avance`, {
        observacion,
      });

      setView(false);
    } catch (error) {
      console.log('Respuesta dif de 200');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            setView(true);
          }}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
    loadAvances(id);
  }, []);

  // console.log('Expediente ID ya en notas Screen ' + expedienteId);
  console.log('Avances: ' + avances.length);

  return (
    <View style={styles.containerCards}>
      <FlatList
        data={avances}
        keyExtractor={e => e.id}
        renderItem={({item}) => <AvancesCard avances={item} />}
        // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <Modal animationType="fade" visible={view} transparent={true}>
        <View style={styles.containerModalNotas}>
          <View style={styles.subcontainerModalNotas}>
            <View style={styles.headerContainerModalNotas}>
              <TouchableOpacity onPress={() => setView(false)}>
                <Image
                  source={require('../assets/Close.png')}
                  style={Styles.btnClose}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                // justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.tituloModalAgregarNota}>Nota del día:</Text>
              <TextInput
                style={styles.inputNota}
                multiline={true}
                placeholder="Introducir una nota..."
                onChangeText={value => onChange(value, 'observacion')}
                value={observacion}
                onSubmitEditing={onAddNote}
              />
              <View style={styles.touchableAgregarNota}>
                <TouchableOpacity activeOpacity={0.8} onPress={onAddNote}>
                  <Text style={styles.touchableAgregarNotaTexto}>
                    Agregar Nota
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
  },
  containerCards: {
    flex: 1,
    alignItems: 'center',
    // flexDirection: 'row'
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
  tituloModalAgregarNota: {
    fontWeight: '100',
    fontSize: 30,
    marginVertical: 30,
  },
  containerModalNotas: {
    flex: 1,
    backgroundColor: 'rgba(1,1,1, 0.5)',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 10,
    // marginTop: 22
  },
  subcontainerModalNotas: {
    height: '70%',
    width: '90%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 30,
    // flexWrap: 'wrap',
  },
  headerContainerModalNotas: {
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
    width: '100%',
    paddingHorizontal: 10,
  },
  touchableAgregarNota: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
  },
  touchableAgregarNotaTexto: {
    fontWeight: '100',
    fontSize: 26,
  },
});
