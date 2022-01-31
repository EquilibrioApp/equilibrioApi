export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    username: string;
    password: string;
    email: string;
}

export type AuthAction =
    | { type: 'signIn', payload: { token: string } }
    | { type: 'signUp', payload: { username: string, password: string, email: string, token: string } }
    | { type: 'addError', payload: string }
    /* Sirve para limpiar el error e intente de nuevo */
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logOut' }

/*En esta función es necesario recibir el estado  y cuál se supone que debe de ser la acción que requiere el usuario
La respuesta siempre debe de ser de tipo AuthState*/
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,/* Se desestructura el state */
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signIn':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token
            }
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                username: action.payload.username,
                password: action.payload.password,
                email: action.payload.email,
                token: action.payload.token
            }
        /* Se declara de esta manera pues ambas opciones hacen lo mismo, el estado es no autenticado y el token se borra */
        case 'logOut':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
            }
        default:
            return state;
    }

}
