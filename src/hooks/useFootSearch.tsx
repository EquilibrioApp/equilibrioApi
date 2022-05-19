import { useEffect, useState } from 'react';
import inicioApi from '../api/inicioApi';
import { FoodDto, Recipe, SearchDoctorByPC } from '../interfaces/appInterfaces';
import { Alert } from 'react-native';


export const useFoodSearch = () => {

    const [isLoading, setisLoading] = useState(true);
    const [foodsList, setFoodsList] = useState<FoodDto[]>();
    const [buscarRecetas, setFood] = useState('Init');


    console.log(buscarRecetas, ' Prueba code en el Hook');

    const Receta  = {
        buscarRecetas: buscarRecetas
    };

    const loadReceta = async() => {

        try {
            setisLoading(true);
            const resp = await inicioApi.get<FoodDto[]>(`/expediente/meals/recipes/${buscarRecetas}`, );
            setFoodsList([...resp.data]);
            setisLoading(false);
        } catch (error) {
            Alert.alert('No se encontro el receta con alimento ingresado');
            // throw new Error("Error al obtener los datos del especialista por medio del CP.")
        }
    }

    useEffect(() => {
        if(buscarRecetas !== 'Init'){
            loadReceta();
        }
    }, [buscarRecetas])   

    return{ 
        isLoading,
        foodsList,
        setFood
    }
}