import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import inicioApi from '../api/inicioApi';
import {authReducer, AuthState} from './authReducer';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from '../interfaces/appInterfaces';

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
};

/* Estado inicial con el que se cuenta por defecto al abrir la app */
const authInitialState: AuthState = {
  status: 'checking',
  token: null,
  errorMessage: '',
  password: '',
  email: '',
  response: null,
};

export const AuthContext = createContext({} as AuthContextProps);

//Functional Component
export const AuthProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    /* Se lee el token directamente del dispositivo */
    checkToken();
  }, []);

  /* Función para poder hacer un método asíncrono el checar el token y poderlo llamar en el
    useEffect */
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    //Si no hay token, no se autentica
    if (!token) return dispatch({type: 'notAuthenticated'});

    //En caso de que sí haya token
    try {
      const resp = await inicioApi.get('auth/verify/token');
      if (resp.status !== 200) {
        return dispatch({type: 'notAuthenticated'});
      }

      dispatch({
        type: 'signIn',
        payload: {
          token: token,
          response: resp.data.result,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'addError',
        payload: 'Algo ha salido mal al verificar el token.',
      });
    }
  };

  const signIn = async ({email, password}: LoginData) => {
    try {
      const {data} = await inicioApi.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      dispatch({
        type: 'signIn',
        payload: {
          token: data.token.access_token,
          response: data.result,
        },
      });

      console.log(data);
      console.log(data.result.id);
      /* En esta sección se guarda el token en el dispositivo */
      await AsyncStorage.setItem('token', data.token.access_token);
      await AsyncStorage.setItem('email', data.result.email);
      await AsyncStorage.setItem('id', data.result.id);
      await AsyncStorage.setItem('userType', data.result.userType);
    } catch (error) {
      /* Se manejan los errores que puedan suceder en el login */
      console.log(error);
      dispatch({
        type: 'addError',
        payload: 'Información Incorrecta.',
      });
    }
  };

  const signUp = async ({
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
  }: RegisterData) => {
    try {
      const {data} = await inicioApi.post<LoginResponse>('/user/create', {
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
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token.access_token,
          response: data.result,
        },
      });

      /* En esta sección se guarda el token en el dispositivo */
      await AsyncStorage.setItem('token', data.token.access_token);
      await AsyncStorage.setItem('email', data.result.email);
      await AsyncStorage.setItem('id', data.result.id);
      await AsyncStorage.setItem('userType', data.result.userType);

      /* En esta sección se guarda el token en el dispositivo 
            await AsyncStorage.setItem('token', resp.data.token);*/
    } catch (error) {
      /* Se manejan los errores que puedan suceder en el login */
      // console.log(error.response.data);
      console.log((error as Error).message);
      dispatch({
        type: 'addError',
        payload: 'Uno de los campos no es correcto.',
      });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'logOut'});
  };

  const removeError = () => {
    dispatch({
      type: 'removeError',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signUp,
        signIn,
        logOut,
        removeError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
