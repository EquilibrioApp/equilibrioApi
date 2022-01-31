import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import inicioApi from '../api/inicioApi';
import { LoginData, LoginResponse, RegisterData, RegisterResponse } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    //user:Usuario;
    /* Estados personalizados */
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
}

/* Estado inicial con el que se cuenta por defecto al abrir la app */
const authInitialState: AuthState = {
    status: 'checking',
    token: null,
    errorMessage: '',
    username: '',
    password: '',
    email: ''

}

export const AuthContext = createContext({} as AuthContextProps);


//Functional Component
export const AuthProvider = ({ children }: any) => {


    const [state, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        /* Se lee el token directamente del dispositivo */
        checkToken();
    }, [])

    /* Función para poder hacer un método asíncrono el checar el token y poderlo llamar en el
    useEffect */
    const checkToken = async () => {

        const token = await AsyncStorage.getItem('token');
        //Si no hay token, no se autentica
        if (!token) return dispatch({ type: 'notAuthenticated' });

        //En caso de que sí haya token
        const resp = await inicioApi.get('/verify/token');
        if (resp.status !== 200) {
            return dispatch({ type: 'notAuthenticated' });
        }

        dispatch({
            type: 'signIn',
            payload: {
                token: resp.data.token
            }
        });
    }

    const signIn = async ({ username, password }: LoginData) => {
        try {

            const resp = await inicioApi.post<LoginResponse>('/login', { username, password });
            dispatch({
                type: 'signIn',
                payload: {
                    token: resp.data.token
                }
            });

            /* En esta sección se guarda el token en el dispositivo */
            await AsyncStorage.setItem('token', resp.data.token);

        } catch (error) {
            /* Se manejan los errores que puedan suceder en el login */
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: /* Falta error.response.data.msg ||*/'Información Incorrecta.'
            })
        }
    };


    const signUp = async ({ username, password, email, nombre, aPaterno, aMaterno, fNacimiento, sexo, telefono, codigo }: RegisterData) => {
        try {

            const { data } = await inicioApi.post<RegisterResponse>('/registro/paciente', { username, password, email, nombre, aPaterno, aMaterno, fNacimiento, sexo, telefono, codigo });
            dispatch({
                type: 'signUp',
                payload: {
                    username: data.username, 
                    password: data.password,
                    email: data.email,
                    token: data.token
                }
            });

             /* En esta sección se guarda el token en el dispositivo */
             await AsyncStorage.setItem('token', data.token);

            /* En esta sección se guarda el token en el dispositivo 
            await AsyncStorage.setItem('token', resp.data.token);*/

        } catch (error) {
            /* Se manejan los errores que puedan suceder en el login */
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.message || 'Uno de los campos no es correcto.'
            })
        }
    };

    const logOut = async () => {

        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logOut' });

    };

    const removeError = () => {
        dispatch({
            type: 'removeError'
        });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}