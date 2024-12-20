import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { asyncSendApis } from '@src/globals/services/service';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation } from '@src/types/navigation';
import { ApiData } from '@src/types/api';
import BackgroundGeolocation from 'react-native-background-geolocation';

const Signature = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();
    const signatureRef = useRef<any>(null);
    const [base64DataUrl, setbase64DataUrl] = useState('')
    const [idService, setidService] = useState('')
    const [fechaService, setfechaService] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [sendLoading, setsendLoading] = useState(false)
    const [signatureCapturedEmpty, setsignatureCapturedEmpty] = useState(false)

    const signaturePadChange = (base64DataUrl: any) => {
        let firmaIndex = base64DataUrl.slice(22, base64DataUrl.length)
        // alert(firmaIndex)
        setbase64DataUrl(firmaIndex)
        setsignatureCapturedEmpty(true)
    };

    const getData = () => {
        const { id, fecha } = route.params as { id: string, fecha: string };
        setidService(id)
        setfechaService(fecha)
    }

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
            console.log('Error al obtener la ubicación:', error);
            throw error;
        }
    };

    const sendRoute = async () => {
        await setsendLoading(false)
        await navigation.navigate('SendReport', { id: idService, fecha: fechaService })
    }

    const handlePressSend = async () => {
        setsendLoading(true)
        if (latitude != '' || longitude != '') {
            try {
                let data: ApiData = {
                    token: await AsyncStorage.getItem('Token'),
                    method: 'PATCH',
                    body: JSON.stringify({
                        'estadoServicio': 6,
                        'latitudeFinish': latitude,
                        'longitudeFinish': longitude,
                        'firmaBase': base64DataUrl,
                    })
                }
                console.log(data);
                console.log('/apis/servicios/' + fechaService + '/' + idService + '/');

                let response = await asyncSendApis('/apis/servicios/' + fechaService + '/' + idService + '/', data);
                if (response.status) {
                    let CantidadCurso = await AsyncStorage.getItem('CantidadCurso')
                    if (CantidadCurso != null) {
                        CantidadCurso = (parseInt(CantidadCurso) - 1).toString();
                    }
                    await AsyncStorage.setItem('CantidadCurso', "" + CantidadCurso);
                    sendRoute();
                }
                else {
                    setsendLoading(false)
                }
            }
            catch (error) {
                console.log("Error =====> ", error);
                setsendLoading(false)
            }
        } else {
            getLocation()
            setsendLoading(false)
        }
    }

    useEffect(() => {
        const getAsync = async () => {
            getData();
            getLocation();
        };
        getAsync();
    }, [])


    return {
        sendLoading,
        signatureCapturedEmpty,
        signaturePadChange,
        handlePressSend,
        signatureRef,
        setsignatureCapturedEmpty
    };
};

export default Signature;