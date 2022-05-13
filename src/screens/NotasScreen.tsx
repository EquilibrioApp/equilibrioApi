import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import inicioApi from '../api/inicioApi';
import { AvancesCard } from '../components/AvancesCard';
import {Inputstyles} from '../components/Input';
import {ExpedientesContext} from '../context/ExpedientesContext';
import {useForm} from '../hooks/usForms';
import { Avance } from '../interfaces/appInterfaces';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {lyricsStyle} from '../theme/LyricsTheme';
import {Styles} from '../theme/StyleTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'NotasScreen'> {}

export const NotasScreen = ({route, navigation}: Props) => {
  const [view, setView] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [avances, setAvances] = useState<Avance[]>([]);

  // const {avances, loadAvances} = useContext(ExpedientesContext);

  const {id} = route.params;
  console.log('Id de route.params: ' + id);

  const {idAvance, observacion, createdAt, expedienteId, form, onChange} = useForm({
    idAvance: '',
    observacion: '',
    createdAt: '',
    expedienteId: id,
  });

  const loadAvances = async (id: string | undefined)=> {
    
    console.log('Id que se recibe en el ExpedientesContext: ' + id);
    const resp = await inicioApi.get<Avance[]>(`/${id}/avance`); //TODO cambiar a expediente del especialist
    console.log('Respuesta de la api loadAvances: ' + resp.data);
    setAvances([...resp.data]);
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
    loadAvances(expedienteId);
  }, []);

  console.log('Expediente ID ya en notas Screen ' + expedienteId);
  console.log('Avances: ' + avances.length);

  return (
    <View style={styles.containerCards}>
      <FlatList
        data={avances}
        keyExtractor={e => e.id}
        renderItem={({item}) => (<AvancesCard avances={item}/>)}
        // ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
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
});
