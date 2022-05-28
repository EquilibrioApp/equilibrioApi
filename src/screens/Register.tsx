import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
              autoCapitalize="none"
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
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir apellido materno*/}
            <Text style={loginStyles.label}>Apellido Materno</Text>
            <TextInput
              placeholder="Materno"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
              selectionColor="grey"
              onChangeText={value => onChange(value, 'mothersLastName')}
              value={mothersLastName}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducor el correo electrónico */}
            <Text style={loginStyles.label}>Correo Electrónico</Text>
            <TextInput
              placeholder="equilibrio@gmail.com"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              keyboardType="email-address"
              underlineColorAndroid="black"
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
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
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
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
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
              selectionColor="grey"
              onChangeText={value => onChange(value, 'sex')}
              value={sex}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir fecha de nacimiento*/}
            <Text style={loginStyles.label}>Fecha de nacimiento</Text>
            <TextInput
              placeholder="DD/MM/AAAA"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
              selectionColor="grey"
              onChangeText={value => onChange(value, 'birthDate')}
              value={birthDate}
              onSubmitEditing={onRegister}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {/* Etiqueta para introducir telefono*/}
            <Text style={loginStyles.label}>Teléfono</Text>
            <TextInput
              placeholder="33-XXXXXXXX"
              placeholderTextColor="rgba(0, 0, 0, 0.54)"
              underlineColorAndroid="black"
              keyboardType="numeric"
              /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
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
              /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
              selectionColor="grey"
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
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
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
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
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
              /* style={[
                    loginStyles.inputField,
                    (Platform.OS === "ios") && loginStyles.inputFieldIOS
                ]} */
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
