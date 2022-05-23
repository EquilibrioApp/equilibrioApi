import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Modal,
  ScrollView,
} from 'react-native';
import {loginStyles} from '../theme/LoginTheme';
import avisoDePrivacidad from '../components/AvisoDePrivacidad';
import CheckBox from '@react-native-community/checkbox';

interface Props extends StackScreenProps<any, any> {}

export const UserTypeScreen = ({navigation}: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [complianceModal, setComplianceModal] = useState(true);

  return (
    <>
      <View style={styles.container}>
        {/* Código para el logo */}
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/Logo.png')}
            style={{
              width: 80,
              height: 110,
              bottom: 10,
            }}
          />
        </View>

        <Text style={styles.tittle}>
          Seleccione un tipo de usuario para continuar
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonPaciente}
          onPress={() => navigation.navigate('PatientRegisterScreen')}>
          <Text style={styles.buttonText}>Paciente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonEspecialista}
          onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.buttonText}>Especialista</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('LoginScreen')}
          activeOpacity={0.8}
          style={loginStyles.buttonReturn}>
          <Text style={loginStyles.buttonText}>Regresar</Text>
        </TouchableOpacity>

        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={complianceModal}>
            <SafeAreaView>
              <ScrollView>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                    <Image
                      source={require('../assets/Logo.png')}
                      style={{
                        width: 80,
                        height: 110,
                        bottom: 10,
                        marginTop: 5,
                      }}
                    />
                    <Text style={styles.modalComplianceTittle}>
                      Aviso de Privacidad.
                    </Text>
                    <Text style={styles.modalComplianceText}>
                      {avisoDePrivacidad}
                    </Text>
                    <View style={styles.checkboxContainer}>
                      <CheckBox
                        style={styles.checkbox}
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={newValue => setToggleCheckBox(newValue)}
                      />
                      <Text>Estoy de acuerdo.</Text>
                    </View>
                    <TouchableOpacity
                    style={[styles.continueButton, {backgroundColor: toggleCheckBox ? 'dodgerblue' : 'grey'}]}
                    disabled={!toggleCheckBox}
                    onPress={() => setComplianceModal(false)}
                    >
                        <Text style={{fontSize: 20, fontWeight: '200', color: 'white'}}>Registrarme</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
          </Modal>
        </View>
      </View>
    </>
  );
};

/* Estilos para los botones y los textos */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tittle: {
    fontSize: 30,
    marginBottom: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontWeight: '100',
  },
  buttonPaciente: {
    fontSize: 30,
    marginBottom: 10,
    width: 200,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#FFAB24',
  },
  buttonEspecialista: {
    fontSize: 30,
    marginBottom: 10,
    width: 200,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#4265FF',
  },
  buttonAuxiliar: {
    fontSize: 30,
    marginBottom: 10,
    width: 200,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#FE7D56',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
    color: 'white',
    top: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // top: 0,
    backgroundColor: 'rgba(0,0,0, .3)',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalComplianceTittle: {
    marginBottom: 50,
    color: 'dodgerblue',
    fontWeight: '200',
    textAlign: 'center',
    fontSize: 28,
  },
  modalComplianceText: {
    // marginBottom: 20,
    fontWeight: '100',
    textAlign: 'justify',
    fontSize: 20,
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
  continueButton:{
      marginTop: 5,
      marginBottom: 10,
      padding: 10,
      borderRadius: 100,
  }
});
