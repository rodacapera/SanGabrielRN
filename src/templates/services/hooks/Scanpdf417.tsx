import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { asyncSendApis } from '@src/globals/services/service';
import { ApiData } from '@src/types/api';
import { StackNavigation } from '@src/types/navigation';
import { useEffect, useState } from 'react';

const Scanpdf417 = ({ }) => {
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

    const location = async () => {

    }

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
                    let CantidadCurso = await AsyncStorage.getItem('CantidadCurso');
                    CantidadCurso = CantidadCurso ? parseInt(CantidadCurso) + 1 : 1;

                    if (CantidadCurso === 1) {
                        setTimeout(() => {
                            locationFile.startForegroundUpdate();
                            locationFile.startBackgroundUpdate();
                        }, 1000);
                    }

                    await AsyncStorage.setItem('CantidadCurso', CantidadCurso.toString());
                    setSendLoading(false);
                    navigation.navigate('Services');
                } else {
                    alert(response);
                    console.log(response);
                    setSendLoading(false);
                }
            } catch (error) {
                console.log('Error ====>', error);
                setSendLoading(false);
            }
        } else {
            location();
        }
    };

    const handlePressFinish = () => {
        //navigation.navigate('Signature', { id: idService, fecha: fechaService });
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
            const id = await route.params?.id;
            const fecha = await route.params?.fecha;
            const tipo = await route.params?.tipo;
            const latitude = await route.params?.latitude;
            const longitude = await route.params?.longitude;
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
            const id = route.params?.id;
            const fecha = route.params?.fecha;

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
        location();
    }, [getDataFinish, location]);

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

export default Scanpdf417;