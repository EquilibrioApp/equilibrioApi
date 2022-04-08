/* Interface para recibir los datos del usaurio al iniciar sesión */
export interface LoginData{
    /* Así es como se recibe en el endpoint del rest api */
    email: string;
    password: string;
}
/* Interface que recibe el token, es interface porque va a crecesrse en un futuro */
// export interface LoginResponse{
//     token: string;
// }

export interface LoginResponse {
    token: access_token;
    result:       Result;
}

export interface Result {
    id:              string;
    name:            string;
    userType:        string;
    fathersLastName: string;
    mothersLastName: string;
    email:           string;
    sex:             string;
    birthDate:       string;
    phoneNumber:     string;
}

export interface access_token {
    access_token: string;
}


/* Interface para recibir los datos del usaurio al registrarse */
export interface RegisterData{
    /* Así es como se recibe en el endpoint del rest api */
    id?: string;
    name: string;
    userType: string;
    fathersLastName: string;
    mothersLastName: string;
    email: string;
    password: string;
    sex: string;
    birthDate: string;
    phoneNumber: string;
    //Info en caso de ser Doctor
    
    cedula?: string;
    houseNumber?: string;
    streetName?: string;
    postalCode?: string;

    //Info en caso de ser paciente
    nutriCodigo?: string;
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
    id:             string;
    nombrePaciente: string;
    correoPaciente: string;
    idEspecialista: string;
    iCalUID:        string;
    inicio:         string;
    fin:            string;
}

export interface PatientNamesResponseDto {
    pacientes: Paciente[];
}

export interface Paciente{
    nombre: string;
    correo: string;
}


