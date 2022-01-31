import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { Card } from '../components/Card';
import { EquilibrioLogo } from '../components/EquilibrioLogo';
import { AuthContext } from '../context/AuthContext';
import { useForm } from '../hooks/usForms';
import { loginStyles } from '../theme/LoginTheme';
import { registerStyles } from '../theme/RegisterTheme';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, errorMessage, removeError } = useContext(AuthContext);

    const { username, password, email, nombre, aPaterno, aMaterno, fNacimiento, sexo, telefono, codigo, onChange } = useForm({
        email: '',
        username: '',
        password: '',
        nombre: '',
        aPaterno: '',
        aMaterno: '',
        fNacimiento: '',
        sexo: '',
        telefono: '',
        codigo: ''
    });


    useEffect(() => {
        if (errorMessage.length === 0) return;/* En caso de no haber error, se regresa sin hacer nada */

        Alert.alert('Hubo un error en los datos.', errorMessage,
            [
                {
                    text: 'Ok',
                    /* removeError es una función declarada en AuthContext */
                    onPress: removeError
                }
            ]
        );
    }, [errorMessage])

    const onRegister = () => {
        console.log({ username, password, email });
        Keyboard.dismiss();//Oculta el tecaldo al tocar el botón loginStyles

        signUp({ username, password, email, nombre, aPaterno, aMaterno, fNacimiento, sexo, telefono, codigo });
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
                    <Text style={registerStyles.title}>Registro</Text>
                    <ScrollView style={registerStyles.formContainer}>
                        {/* Etiqueta para introducor el nombre */}
                        <Text style={loginStyles.label}>Nombre de Usuario</Text>
                        <TextInput
                            placeholder="Nombre de Usuario"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'username')}
                            value={username}
                            onSubmitEditing={onRegister}

                            autoCapitalize="words"
                        />
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
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir la contraseña*/}
                        <Text style={loginStyles.label}>Contraseña</Text>
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
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir nombre*/}
                        <Text style={loginStyles.label}>Nombre</Text>
                        <TextInput
                            placeholder="Primer y Segundo nombre"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'nombre')}
                            value={nombre}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir apellido paterno*/}
                        <Text style={loginStyles.label}>Apellido Paterno</Text>
                        <TextInput
                            placeholder="Paterno"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'aPaterno')}
                            value={aPaterno}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir apellido materno*/}
                        <Text style={loginStyles.label}>Apellido Materno</Text>
                        <TextInput
                            placeholder="Materno"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'aMaterno')}
                            value={aMaterno}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir fecha de nacimiento*/}
                        <Text style={loginStyles.label}>Fecha de nacimiento</Text>
                        <TextInput
                            placeholder="DD/MM/AAAA"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'fNacimiento')}
                            value={fNacimiento}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir sexo*/}
                        <Text style={loginStyles.label}>Sexo</Text>
                        <TextInput
                            placeholder="M / F"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'sexo')}
                            value={sexo}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir telefono*/}
                        <Text style={loginStyles.label}>Teléfono</Text>
                        <TextInput
                            placeholder="33-XXXXXXXX"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            keyboardType = 'numeric'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'telefono')}
                            value={telefono}
                            onSubmitEditing={onRegister}

                            autoCapitalize="none"
                            autoCorrect={false}

                        />
                        {/* Etiqueta para introducir código*/}
                        <Text style={loginStyles.label}>Código</Text>
                        <TextInput
                            placeholder="Cédula | Aux-Código | Nutri-Código"
                            placeholderTextColor="rgba(0, 0, 0, 0.54)"
                            underlineColorAndroid='black'
                            /* style={[
                                loginStyles.inputField,
                                (Platform.OS === "ios") && loginStyles.inputFieldIOS
                            ]} */
                            selectionColor="grey"

                            onChangeText={(value) => onChange(value, 'codigo')}
                            value={codigo}
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
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                    {/* No es totalmente necesario */}
                    <TouchableOpacity
                        onPress={() => navigation.replace('UserTypeScreen')}
                        activeOpacity={0.8}
                        style={registerStyles.buttonReturn}
                    >
                        <Text style={loginStyles.buttonText}>Regresar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}