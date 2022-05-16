import { useEffect, useState } from 'react';
import inicioApi from '../api/inicioApi';
import { Recipe, SearchDoctorByPC } from '../interfaces/appInterfaces';
import { Alert } from 'react-native';


export const useFoodSearch = () => {

    const [isLoading, setisLoading] = useState(true);
    const [foodsList, setFoodsList] = useState<Recipe[]>();
    const [buscarRecetas, setFood] = useState('Init');


    console.log(buscarRecetas, ' Prueba code en el Hook');

    const Receta  = {
        buscarRecetas: buscarRecetas
    };

    const loadDoctors = async() => {

        try {
            console.log(buscarRecetas)
            setisLoading(true);
            const resp = await inicioApi.get<Recipe[]>(`/expediente/meals/recipes`, {params:Receta});
            console.log(resp.data);
            setFoodsList([...resp.data]);
            setisLoading(false);
        } catch (error) {
            Alert.alert('No se encontro el receta con alimento ingresado');
            // throw new Error("Error al obtener los datos del especialista por medio del CP.")
        }
    }

    useEffect(() => {
        if(buscarRecetas !== 'Init'){
            loadDoctors();
        }
    }, [buscarRecetas])   

    return{ 
        isLoading,
        foodsList,
        setFood
    }
}