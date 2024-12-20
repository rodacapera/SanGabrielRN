import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Linking } from 'react-native';
import { ConfigConstants } from '@src/globals/config/config';
import { StackNavigation } from '@src/types/navigation';

const SendReport = ({ }) => {
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();

    const handlePress = () => {
        navigation.navigate('Services');
    };

    const handlePressImprimirPDF = () => {
        Linking.openURL(`${ConfigConstants.webServiceName}/servicios/certificadoCierre/${id}`);
    };

    const getData = () => {
        const { id: idParam, fecha: fechaParam } = route.params as { id: string, fecha: string };
        setId(idParam);
        setFecha(fechaParam);
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        handlePressImprimirPDF,
        handlePress
    };
};

export default SendReport;