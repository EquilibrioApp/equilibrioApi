import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { Inputstyles } from '../components/Input';
import {ExpedientesStackParams} from '../navigator/ExpedientesNavigator';
import {expedienteStyles} from '../theme/ExpedienteTheme';
import { Styles } from '../theme/StyleTheme';

interface Props
  extends StackScreenProps<ExpedientesStackParams, 'MenuExpedienteScreen'> {}

export const MenuExpedienteScreen = ({route, navigation}: Props) => {
  const [view, setView] = useState(false);

  const {id, nombre = '', birthDate, sexo, alturaPaciente} = route.params;

  var Sexo = '';
  if (sexo === 'F') {
    Sexo = 'Femenino';
  } else {
    Sexo = 'Masculino';
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 20}}
          onPress={() => {
            setView(true);
          }}>
          <Text>Registrar Avance</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <>
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

            {/* <Button //TODO BOTON
                title="Guardar"
                onPress={() => navigation.navigate('IndicesScreen')}
              /> */}
          </View>
        </View>
      </Modal>

      <View style={expedienteStyles.cardPatiente}>
        <Text style={expedienteStyles.label}>Numero: {id} </Text>
        <Text style={expedienteStyles.label}>Nombre: {nombre} </Text>
        <Text style={expedienteStyles.label}>Naciento: {birthDate}</Text>
        <Text style={expedienteStyles.label}>
          Sexo: {Sexo} Altura: {alturaPaciente}cm
        </Text>
        <Text style={expedienteStyles.label}>Peso inicial: Peso actual: </Text>
      </View>

      <View style={{height: 150, width: 500, marginTop: 25}}>
        <ScrollView
          style={{left: 90, top: 200, width: 500, height: 1000}}
          horizontal={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            // onPress={() => navigation.navigate('IndicesScreen')}
          >
            <Text style={expedienteStyles.labelSubMenu}>Antropometría</Text>
            <Image
              style={expedienteStyles.image}
              source={require('../assets/expediente/Vector.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            // onPress={() => navigation.navigate('CitaScreen')}
          >
            <Text style={expedienteStyles.labelSubMenu}>Registros</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Cita.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{height: 150, width: 500, marginTop: 25}}>
        <ScrollView
          style={{left: 90, top: 150, width: 500, height: 900}}
          horizontal={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonOrange}
            // onPress={() => navigation.navigate('EquivalenciaScreen')}\
          >
            <Text style={expedienteStyles.labelSubMenu}>Equivalencia</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/HojaDeEquivalencia.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonBlue}
            // onPress={() => navigation.navigate('AvanceScreen')}
          >
            <Text style={expedienteStyles.labelSubMenu}>AvanceVsMeta</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Metas.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{height: 150, width: 500, marginTop: 25}}>
        <ScrollView
          style={{left: 90, top: 100, width: 500, height: 900}}
          horizontal={true}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={expedienteStyles.buttonRed}
            onPress={() => navigation.navigate('NotasScreen', {
              id:id
              
            })}
            
          >
            console.log(id);
            <Text style={expedienteStyles.labelSubMenu}>Notas</Text>
            <Image
              style={{height: 45, width: 45, top: -15}}
              source={require('../assets/expediente/Notas.png')}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};
