import axios from 'axios';

const baseURL = 'http://127.0.0.1:5000/calendar';

const calendarApi = axios.create({ baseURL });

export default calendarApi;