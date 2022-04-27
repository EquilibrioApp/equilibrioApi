
import {StackScreenProps} from '@react-navigation/stack';
import React, {useState} from 'react';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {stylesButton} from '../components/Button';
import {Inputstyles} from '../components/Input';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import {lyricsStyle} from '../theme/LyricsTheme';
import {Styles} from '../theme/StyleTheme';

interface Props extends StackScreenProps<any, any> {}

export const IndicesScreen = ({navigation}: Props) => {
  const [view, setView] = useState(false);

  return (
    <>
      <View style={expedienteStyles.cardPatiente}>
        <Text style={expedienteStyles.label}>Nombre: </Text>
        <Text style={expedienteStyles.label}>Nacimiento: </Text>
        <Text style={expedienteStyles.label}>Peso inicial: </Text>
        <Text style={expedienteStyles.label}>Peso actual: </Text>
      </View>

      <View style={{height: 150, width: 500, marginTop: 25}}>
        <ScrollView style={{left: 33, top: 200, width: 500}} horizontal={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            onPress={() => navigation.navigate('IndicesScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Antropometría</Text>
            <Image
              style={expedienteStyles.image}
              source={require('../assets/expediente/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            onPress={() => navigation.navigate('CitaScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Cita</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Cita.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonOrange}
            onPress={() => navigation.navigate('EquivalenciaScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Equivalencia</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/HojaDeEquivalencia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            onPress={() => navigation.navigate('AvanceScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>AvanceVSMeta</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Metas.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            onPress={() => navigation.navigate('NotasScreen')}>
            <Text style={expedienteStyles.labelSubMenu}>Notas</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Notas.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={expedienteStyles.box}>
        <TouchableOpacity
          style={{
            backgroundColor: '#148AE7',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#FFF',
            height: 45,
            width: '80%',
            marginLeft: 20,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={0.8}
          onPress={() => {
            setView(true);
          }}>
          <Text style={stylesButton.title}>Agregar medidas</Text>
          {/* <Image
              style={{height: 50, width: 50, marginTop: 10}}
              source={require('../assets/expediente/Add.png')}
            /> */}
        </TouchableOpacity>

        {/* Peso 
            cintura 
            cuello 
            cadera 
            biestiloideo
            femoral */}

        <Modal
          animationType="fade"
          onDismiss={() => console.log('close')}
          onShow={() => console.log('slow')}
          transparent
          visible={view}>
          <View style={Styles.container}>
            <View style={Styles.subcontainerExpediente}>
              <View style={Styles.headerContainerExpediente}>
                <TouchableOpacity onPress={() => setView(false)}>
                  <Image
                    source={require('../assets/Close.png')}
                    style={Styles.btnClose}
                  />
                </TouchableOpacity>

              </View>
                <Text style={Inputstyles.title}>Peso(kg):</Text>
                <TextInput
                  style={Inputstyles.text}
                  placeholder=" "
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="black"
                  keyboardType="numeric"
                  {...navigation}
                  maxLength={5}
                   // Inherit any props passed to it; e.g., multiline, numberOfLines below
                />
                <Text style={Inputstyles.title}>Cuello(cm):</Text>
                <TextInput
                  style={Inputstyles.text}
                  placeholder=" "
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="black"
                  keyboardType="numeric"
                  {...navigation}
                  maxLength={4}
                />
                <Text style={Inputstyles.title}>Caderas(cm):</Text>
                <TextInput
                  style={Inputstyles.text}
                  placeholder=" "
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="black"
                  keyboardType="numeric"
                  {...navigation}
                  maxLength={4}
                />
                <Text style={Inputstyles.title}>Biestiloideo(cm):</Text>
                <TextInput
                  style={Inputstyles.text}
                  placeholder=" "
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="black"
                  keyboardType="numeric"
                  {...navigation}
                  maxLength={4}
                />
                <Text style={Inputstyles.title}>Femoral(cm):</Text>
                <TextInput
                  style={Inputstyles.text}
                  placeholder=" "
                  placeholderTextColor="rgba(0, 0, 0, 0.54)"
                  underlineColorAndroid="black"
                  keyboardType="numeric"
                  {...navigation}
                  maxLength={4}
                />

              <Button
                title="Guardar"
                onPress={() => navigation.navigate('IndicesScreen')}
              />
            </View>
          </View>
        </Modal>
        
        <ScrollView horizontal={true}>
          <Text style={lyricsStyle.labelBold}>Estatura:</Text>
          <TextInput
            placeholder=" Altura"
            placeholderTextColor="rgba(0, 0, 0, 0.54)"
            underlineColorAndroid="black"
            keyboardType="numeric"
            {...navigation} // Inherit any props passed to it; e.g., multiline, numberOfLines below
            maxLength={3}
          />
          <Text style={lyricsStyle.labelBold}>cm</Text>
        </ScrollView>
      </ScrollView>
    </>
  );
};

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
});
