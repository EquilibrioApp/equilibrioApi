/* Interface para recibir los datos del usaurio al iniciar sesión */
export interface LoginData{
    /* Así es como se recibe en el endpoint del rest api */
    username: string;
    password: string;
}
/* Interface que recibe el token, es interface porque va a crecesrse en un futuro */
export interface LoginResponse{
    token: string;
}
/* Interface para recibir los datos del usaurio al registrarse */
export interface RegisterData{
    /* Así es como se recibe en el endpoint del rest api */
    username: string;
    password: string;
    email: string;
    nombre: string;
    aPaterno: string;
    aMaterno: string;
    fNacimiento: string;
    sexo: string;
    telefono: string;
    codigo: string
}

export interface RegisterResponse{
    username: string;
    password: string;
    email: string;
    token: string;

}

//Citas


export interface AppointmentsDto {
    citas: Cita[];
}

export interface Cita {
    fin:            string;
    iCalUID:        string;
    id:             string;
    idEspecialista: string;
    idPaciente:     string;
    inicio:         string;
}

export interface PatientNamesResponseDto {
    pacientes: Paciente[];
}

export interface Paciente{
    nombre: string;
    correo: string;
}


