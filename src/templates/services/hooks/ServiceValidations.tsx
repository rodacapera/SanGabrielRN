import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { asyncSendApis } from '@src/globals/services/service';
import { ApiData } from '@src/types/api';
import { StackNavigation } from '@src/types/navigation';
import { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';

const ServiceValidations = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();
    const [scanned, setScanned] = useState(false);
    const [documentValid, setDocumentValid] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [digitManual, setDigitManual] = useState(true);
    const [show, setShow] = useState(false);
    const [idService, setId] = useState('');
    const [fechaService, setFecha] = useState('');
    const [documentManual, setNumeroDocumentManual] = useState('');
    const [numeroDocumento_usuario, setNumeroDocumento_usuario] = useState('');
    const [tipo, setTipo] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // Obtener la ubicación actual del dispositivo
    const getLocation = async () => {
        try {
            const currentLocation = await BackgroundGeolocation.getCurrentPosition({
                timeout: 40,
                desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_LOWEST,
                persist: false,
            });

            const { latitude, longitude } = currentLocation.coords;
            setLatitude(latitude.toString());
            setLongitude(longitude.toString());

            return { latitude, longitude };
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
            throw error;
        }
    };

    const handlePress = async () => {
        setSendLoading(true);
        const date = new Date();

        if (latitude !== '' || longitude !== '') {
            try {
                const token = await AsyncStorage.getItem('Token');
                let data: ApiData = {
                    token,
                    method: 'PATCH',
                    body: JSON.stringify({
                        estadoServicio: 5,
                        latitudeStart: latitude,
                        longitudeStart: longitude,
                        timeInicio: date,
                    }),
                };

                const response = await asyncSendApis(`/apis/servicios/${fechaService}/${idService}/`, data);
                if (response.status) {
                    let CantidadCurso = await AsyncStorage.getItem('CantidadCurso')
                    if (CantidadCurso != null) {
                        CantidadCurso = (parseInt(CantidadCurso) + 1).toString();
                    } else {
                        CantidadCurso = "1"
                    }
                    await AsyncStorage.setItem('CantidadCurso', "" + CantidadCurso);
                    await setSendLoading(false);
                    navigation.navigate('Services');
                } else {
                    setSendLoading(false);
                }
            } catch (error) {
                console.log('Error ====>', error);
                setSendLoading(false);
            }
        } else {
            getLocation();
        }
    };

    const handlePressFinish = () => {
        navigation.navigate('Signature', { id: idService, fecha: fechaService });
    };

    const handlePressScaned = () => {
        if (documentManual !== '') {
            setDigitManual(true);
            setScanned(false);
            setShow(false);
        } else {
            setDigitManual(false);
            setScanned(false);
            setShow(true);
            setNumeroDocumentManual('');
        }
    };

    const handlePressDigitManual = () => {
        setScanned(false);
        setShow(false);
        setDigitManual(true);
        setNumeroDocumentManual('');
    };

    const handlePressVerifyManualDocument = async () => {
        if (documentManual != '') {
            setScanned(true);
            const { id, fecha, tipo, latitude, longitude } = route.params as { id: string; fecha: string; tipo: string; latitude: any; longitude: any; };
            setId(id);
            setFecha(fecha);
            setLatitude(latitude);
            setLongitude(longitude);
            setTipo(tipo);
            if (documentManual != numeroDocumento_usuario) {
                setDocumentValid(false)
                setShow(false)
                setDigitManual(false)
            } else {
                /* Existe la cedula */
                setDocumentValid(true)
                setShow(false)
                setDigitManual(false)
            }
        } else {
            alert('Debe digitar el número de documento del paciente.')
        }
    };

    const handlePressCancel = async () => {
        setShow(false)
        //navigation.navigate('ServicesDetails')
    }

    const getDataFinish = async () => {
        try {
            const { id, fecha } = route.params as { id: string; fecha: string };
            let data = {
                token: await AsyncStorage.getItem('Token'),
            }
            let response = await asyncSendApis('/apis/servicios/' + fecha + '/' + id + '/', data);
            if (response.status) {
                setNumeroDocumento_usuario(response.pasajero.numero_documento);
            }
            else {
                console.log(response)
            }
        }
        catch (error) {
            console.log("Error ====> ", error);
        }
    }

    useEffect(() => {
        getDataFinish();
        getLocation();
    }, [getDataFinish, getLocation]);

    return {
        scanned,
        setScanned,
        documentValid,
        setDocumentValid,
        sendLoading,
        setSendLoading,
        digitManual,
        setDigitManual,
        show,
        setShow,
        idService,
        setId,
        fechaService,
        setFecha,
        documentManual,
        setNumeroDocumentManual,
        numeroDocumento_usuario,
        setNumeroDocumento_usuario,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        handlePress,
        tipo,
        setTipo,
        handlePressDigitManual,
        handlePressCancel,
        handlePressScaned,
        handlePressFinish,
        handlePressVerifyManualDocument
    };
};

export default ServiceValidations;