import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Background} from '../components/Background';
import {Card} from '../components/Card';
import {EquilibrioLogo} from '../components/EquilibrioLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/usForms';
import {loginStyles} from '../theme/LoginTheme';
import {registerStyles} from '../theme/RegisterTheme';

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const {
    name,
    userType,
    fathersLastName,
    mothersLastName,
    email,
    password,
    sex,
    birthDate,
    phoneNumber,
    cedula,
    houseNumber,
    streetName,
    postalCode,
    nutriCodigo,
    onChange,
  } = useForm({
    name: '',
    userType: '1',
    fathersLastName: '',
    mothersLastName: '',
    email: '',
    password: '',
    sex: '',
    birthDate: '',
    phoneNumber: '',
    cedula: '',
    houseNumber: '',
    streetName: '',
    postalCode: '',
    nutriCodigo: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0)
      return; /* En caso de no haber error, se regresa sin hacer nada */

    Alert.alert('Hubo un error en los datos.', errorMessage, [
      {
        text: 'Ok',
        /* removeError es una función declarada en AuthContext */
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);

  const onRegister = () => {
    console.log({password, email});
    Keyboard.dismiss(); //Oculta el tecaldo al tocar el botón loginStyles

    const usernamePattern = /[A-Z]/g;
    const passwordPattern =
      /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/g;
    const emailPattern = /^\w(\.?\w){5,}@g(oogle)?mail\.com$/g;
    const sexPattern = /(M|F)/;
    const celPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\.]?[0-9]{3}[-\.]?[0-9]{4,6}$/;
    const cedulaPattern = /^[0-9]{7,8}$/;

    if (usernamePattern.test(name)) {
      if (emailPattern.test(email)) {
        if (passwordPattern.test(password)) {
          if (sexPattern.test(sex)) {
            if (celPattern.test(phoneNumber)) {
              if (cedulaPattern.test(cedula)) {
                if ((houseNumber.length && streetName.length && postalCode.length) !== 0) {
                  signUp({
                    name,
                    userType,
                    fathersLastName,
                    mothersLastName,
                    email,
                    password,
                    sex,
                    birthDate,
                    phoneNumber,
                    cedula,
                    houseNumber,
                    streetName,
                    postalCode,
                    nutriCodigo,
                  });
                } else {
                  Alert.alert(
                    'Los datos del domicilio NO cumplen con las caracteristicas.',
                  );
                }
              } else {
                Alert.alert(
                  'La cedula NO cumple con las caracteristicas.',
                );
              }
            } else {
              Alert.alert('El telefono NO cumple con las caracteristicas.');
            }
          } else {
            Alert.alert('El sexo NO cumple con las caracteristicas.');
          }
        } else {
          Alert.alert('La contrasena NO cumple con las caracteristicas.');
        }
      } else {
        Alert.alert(
          'El correo NO cumple con las caracteristicas, debe ser de Gmail.',
        );
      }
    } else {
      Alert.alert('El nombre NO cumple con las caracteristicas.');
    }

    // signUp({
    //   name,
    //   userType,
    //   fathersLastName,
    //   mothersLastName,
    //   email,
    //   password,
    //   sex,
    //   birthDate,
    //   phoneNumber,
    //   cedula,
    //   houseNumber,
    //   streetName,
    //   postalCode,
    //   nutriCodigo,
    // });
  };

  return (
    <>
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        /* behavior={(Platform.OS === 'ios') ? 'padding' : 'height'} */
      >
        <EquilibrioLogo />
        <View style={loginStyles.formContainer}>
          <Card />
          <Text style={registerStyles.title}>Registro</Text>
          <ScrollView style={registerStyles.formContainer}>
            {/* Etiqueta para introducir nombre*/}
            <Text style={loginStyles.label}>Nombre</Text>
            <TextInput
              placeholder="Primer y Segundo nombre"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              /* style={[
                loginStyles.inputField,
                (Platform.OS === "ios") && loginStyles.inputFieldIOS
            ]} */
              selectionColor="grey"
              onChangeText={value => onChange(value, 'name')}
              value={name}
              onSubmitEditing={onRegister}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir apellido paterno*/}
            <Text style={loginStyles.label}>Apellido Paterno</Text>
            <TextInput
              placeholder="Paterno"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
              selectionColor="grey"
              onChangeText={value => onChange(value, 'fathersLastName')}
              value={fathersLastName}
              onSubmitEditing={onRegister}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir apellido materno*/}
            <Text style={loginStyles.label}>Apellido Materno</Text>
            <TextInput
              placeholder="Materno"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              selectionColor="grey"
              onChangeText={value => onChange(value, 'mothersLastName')}
              value={mothersLastName}
              onSubmitEditing={onRegister}
              autoCapitalize="words"
              autoCorrect={false}
            />
            {/* Etiqueta para introducor el correo electrónico */}
            <Text style={loginStyles.label}>Correo Electrónico</Text>
            <TextInput
              placeholder="equilibrio@gmail.com"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              keyboardType="email-address"
              underlineColorAndroid="black"
              selectionColor="grey"
              onChangeText={value => onChange(value, 'email')}
              value={email}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir la contraseña*/}
            <Text style={loginStyles.label}>Contraseña</Text>
            <TextInput
              placeholder="************"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              secureTextEntry
              selectionColor="grey"
              onChangeText={value => onChange(value, 'password')}
              value={password}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir sexo*/}
            <Text style={loginStyles.label}>Sexo</Text>
            <TextInput
              placeholder="M / F"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              maxLength={1}
              selectionColor="grey"
              onChangeText={value => onChange(value, 'sex')}
              value={sex}
              onSubmitEditing={onRegister}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <SafeAreaView style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.title}>Fecha de nacimiento:</Text>
                <DatePicker
                  style={styles.datePickerStyle}
                  date={date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="1923-01-01"
                  maxDate="2006-12-31"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      marginHorizontal: 20,
                      position: 'absolute',
                      right: -5,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginHorizontal: 30,
                      height: 40,
                      width: '90%',
                      paddingHorizontal: 30,
                      borderColor: 'gray',
                      alignItems: 'flex-start',
                      borderWidth: 0,
                      borderBottomWidth: 1,
                    },
                    placeholderText: {
                      fontSize: 17,
                      color: 'gray',
                    },
                    dateText: {
                      fontSize: 17,
                    },
                  }}
                  onDateChange={date => {
                    setDate(date);
                    onChange(date, 'birthDate');
                  }}
                />
              </View>
            </SafeAreaView>
            {/* Etiqueta para introducir telefono*/}
            <Text style={loginStyles.label}>Teléfono</Text>
            <TextInput
              placeholder="33-XXXXXXXX"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              keyboardType="numeric"
              maxLength={10}
              selectionColor="grey"
              onChangeText={value => onChange(value, 'phoneNumber')}
              value={phoneNumber}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir cedula*/}
            <Text style={loginStyles.label}>Cédula Profesional</Text>
            <TextInput
              placeholder="Cédula"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              selectionColor="grey"
              keyboardType="number-pad"
              maxLength={8}
              onChangeText={value => onChange(value, 'cedula')}
              value={cedula}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir Número del consultorio*/}
            <Text style={loginStyles.label}>
              Número exterior del Consultorio
            </Text>
            <TextInput
              placeholder="44120"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              keyboardType="number-pad"
              maxLength={6}
              selectionColor="grey"
              onChangeText={value => onChange(value, 'houseNumber')}
              value={houseNumber}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir nombre de la calle*/}
            <Text style={loginStyles.label}>Calle del Consultorio</Text>
            <TextInput
              placeholder="Av..."
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              keyboardType="number-pad"
              selectionColor="grey"
              onChangeText={value => onChange(value, 'streetName')}
              value={streetName}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir CP*/}
            <Text style={loginStyles.label}>Código Postal del Consultorio</Text>
            <TextInput
              placeholder="C.P."
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              keyboardType="number-pad"
              selectionColor="grey"
              onChangeText={value => onChange(value, 'postalCode')}
              value={postalCode}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </ScrollView>
          {/* Botón para crear cuenta */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}>
              <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
          {/* No es totalmente necesario */}
          <TouchableOpacity
            onPress={() => navigation.replace('UserTypeScreen')}
            activeOpacity={0.8}
            style={registerStyles.buttonReturn}>
            <Text style={loginStyles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  // itemSeparator: {
  //   borderBottomWidth: 2,
  //   marginVertical: 5,
  //   borderBottomColor: 'white',
  // },
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
    width: '20%',
    paddingHorizontal: 10,
    marginHorizontal: 10,
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
    textAlign: 'center',
  },
  appointmentDate: {
    fontSize: 27,
    color: 'white',
    fontWeight: '100',
  },
  patient: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '100',
  },
  itemSeparator: {
    borderBottomWidth: 5,
    marginVertical: 5,
    borderBottomColor: 'white',
  },
  addAppointment: {
    fontSize: 30,
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#8FA4FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 85,
  },
});
