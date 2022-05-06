import React, { useContext, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';

import { Card } from '../components/Card';
import { useForm } from '../hooks/usForms';
import { loginStyles } from '../theme/LoginTheme';
import { AuthContext } from '../context/AuthContext';
import { Background } from '../components/Background';
import { EquilibrioLogo } from '../components/EquilibrioLogo';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

//Propiedad para la navegación entre pantallas
interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (errorMessage.length === 0) return;/* En caso de no haber error, se regresa sin hacer nada */

        Alert.alert('Login incorrecto', errorMessage,
            [
                {
                    text: 'Ok',
                    /* removeError es una función declarada en AuthContext */
                    onPress: removeError
                }
            ]
        );
    }, [errorMessage])

    const onLogin = () => {
        console.log({ email, password });
        Keyboard.dismiss();//Oculta el tecaldo al tocar el botón loginStyles

        signIn({ email, password });
    }

    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
            /* behavior={(Platform.OS === 'ios') ? 'padding' : 'height'} */
            >

                <EquilibrioLogo />
                <View style={loginStyles.formContainer}>
                    <Card />
                    <Text style={loginStyles.title}>Inicio de Sesión</Text>

                    {/* Etiqueta para introducor el correo electrónico */}
                    <Text style={loginStyles.label}>Correo Electrónico</Text>
                    <TextInput
                        placeholder="equilibrio@gmail.com"
                        placeholderTextColor="rgba(0, 0, 0, 0.54)"
                        keyboardType="email-address"
                        underlineColorAndroid='black'
                        /* style={[
                            loginStyles.inputField,
                            (Platform.OS === "ios") && loginStyles.inputFieldIOS
                        ]} */
                        selectionColor="grey"

                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}

                        autoCapitalize="none"
                        autoCorrect={false}

                    />
                    {/* Etiqueta para introducir la contraseña*/}
                    <Text style={loginStyles.label}>Coontraseña</Text>
                    <TextInput
                        placeholder="************"
                        placeholderTextColor="rgba(0, 0, 0, 0.54)"
                        underlineColorAndroid='black'
                        secureTextEntry
                        /* style={[
                            loginStyles.inputField,
                            (Platform.OS === "ios") && loginStyles.inputFieldIOS
                        ]} */
                        selectionColor="grey"

                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}

                        autoCapitalize="none"
                        autoCorrect={false}

                    />
                    {/* Botón inicio de sesión */}
                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear nueva cuenta */}
                    <View style={loginStyles.bottomLinks}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            /* Permite navegar a la pantalla que sea necesario */
                            onPress={() => navigation.navigate('UserTypeScreen')}
                            >
                            <Text style={loginStyles.bottomLinksText}>¿No tiene una cuenta?</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Recuperar contraseña */}
                    <View style={loginStyles.bottomLinks}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('PotencialUsuarioNavigator')}
                            // onPress={() => console.log('press')}
                        >
                            <Text style={loginStyles.bottomLinksText}>Buscar Especialista Cerca de Mí</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
