import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import { Inputstyles } from '../components/Input';
import { ExpedientesContext } from '../context/ExpedientesContext';
import { useForm } from '../hooks/usForms';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {lyricsStyle} from '../theme/LyricsTheme';
import { Styles } from '../theme/StyleTheme';

interface Props extends StackScreenProps<any, any>{}

export const NotasScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);
  const [isSelected, setSelection] = useState(false);

  const {avances, loadAvances } = useContext(ExpedientesContext);
  
  const{id, observacion, createdAt, expedienteId, form, onChange }= useForm({
    id:'',
    observacion:'',
    createdAt:'',
    expedienteId: ''
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.8} style={{marginRight:20}} onPress={() => {
          setView(true);
        }}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);
  
  return (
    <>
      <FlatList
          data={avances}
          keyExtractor={e => e.id}
          renderItem={({item}) => (
            <TouchableOpacity activeOpacity={0.8} style={{marginRight:20}} onPress={() => {
              setView(true);
        
            }}>
              <Text style={styles.expedienteName}>{item.createdAt}</Text>
              console.log(item.createdAt);
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />

        <Modal
          animationType="fade"
          onDismiss={() => console.log('close')}
          onShow={() => console.log('slow')}
          transparent
          visible={view}>
          <View style={Styles.container}>
            <View style={Styles.subcontainer}>
              <View style={Styles.headerContainer}>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/Logo.png')}
                  style={{
                    width: 80,
                    height: 110,
                    marginVertical: 20,
                  }}
                />
              </View>
              <Text style={Inputstyles.title}>Fecha: {createdAt}</Text>

              <Text style={Inputstyles.title}>Observación {observacion}</Text>

              <Text style={Inputstyles.title}>Altura (cm)</Text>
              
            </View>
          </View>  
        </Modal>
    
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
  container: {
    flex: 1,
    paddingTop: 2,
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
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
});
