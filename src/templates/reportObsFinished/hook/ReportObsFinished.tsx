import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncSendApis } from '@src/globals/services/service';
import { ApiData } from '@src/types/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation } from '@src/types/navigation';

const ReportObsFinished = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();
    const [id, setId] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [sendLoading, setSendLoading] = useState(false);
    const [observacionesOperador, setObservacionesOperador] = useState('');

    const handleInputChange = (text: string, name: string) => {
        if (name === 'observaciones') setObservaciones(text);
        if (name === 'observacionesOperador') setObservacionesOperador(text);
    };

    const handlePressEnviarNovedad = async () => {
        setSendLoading(true);
        try {
            const token = await AsyncStorage.getItem('Token');
            let data: ApiData = {
                token,
                method: 'PATCH',
                body: JSON.stringify({
                    id,
                    observacionesOperador: `${observacionesOperador ? observacionesOperador + ' / ' : ''}${observaciones}`,
                }),
            };

            const response = await asyncSendApis('/apis/api_novedad_operador', data);

            if (response.status) {
                setSendLoading(false);
                navigation.navigate('Services');
            } else {
                console.log(response);
                setSendLoading(false);
            }
        } catch (error) {
            console.error("Error ====> ", error);
            setSendLoading(false);
        }
    };

    const getData = () => {
        const { id: idFromParams, observacionesOperador: observacionesOperadorFromParams } = route.params as { id: any; observacionesOperador: any };
        setId(idFromParams || '');
        setObservacionesOperador(observacionesOperadorFromParams || '');
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', getData);
        return () => {
            focusListener();
        };
    }, [navigation, route.params]);


    return {
        sendLoading,
        handlePressEnviarNovedad,
        handleInputChange,
        observaciones
    };
};

export default ReportObsFinished;