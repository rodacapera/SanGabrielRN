import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { asyncSendApis } from '@src/globals/services/service';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigation } from '@src/types/navigation';
import { ApiData } from '@src/types/api';
import { Alert, Linking } from 'react-native';
import { ItemService } from '../types/noveltyDetailsTypes';
import { launchImageLibrary, launchCamera, ImageLibraryOptions, MediaType } from 'react-native-image-picker';

const NoveltyDetails = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();
    const [message, setMessage] = useState('');
    const [loadingModal, setLoadingModal] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);
    const [fecha, setFecha] = useState('');
    const [textWhatsapp, setTextWhatsapp] = useState('');
    const [validateService, setValidateService] = useState(false);

    // Datos adicionales
    const [estadoServicio, setEstadoServicio] = useState(false);
    const [idServicio, setIdServicio] = useState('');
    const [solicitud, setSolicitud] = useState('');
    const [tipoRuta, setTipoRuta] = useState('');
    const [tipoProcedimiento, setTipoProcedimiento] = useState('');
    const [categoriaPasajero, setCategoriaPasajero] = useState('');
    const [medio, setMedio] = useState('');
    const [observacionesPasajero, setObservacionesPasajero] = useState('');

    // Datos usuario
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [tipoDocumentoUsuario, setTipoDocumentoUsuario] = useState('');
    const [numeroDocumentoUsuario, setNumeroDocumentoUsuario] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefono1Usuario, setTelefono1Usuario] = useState('');
    const [telefono2Usuario, setTelefono2Usuario] = useState('');
    const [phoneNumberWhatsapp, setPhoneNumberWhatsapp] = useState('');

    // Datos origen
    const [horaRecogida, setHoraRecogida] = useState('');
    const [municipioRecogida, setMunicipioRecogida] = useState('');
    const [origenRecogida, setOrigenRecogida] = useState('');
    const [direccionRecogida, setDireccionRecogida] = useState('');
    const [latOrigen, setLatOrigen] = useState('');
    const [lngOrigen, setLngOrigen] = useState('');

    // Datos destino
    const [horaCita, setHoraCita] = useState('');
    const [municipioCita, setMunicipioCita] = useState('');
    const [destinoCita, setDestinoCita] = useState('');
    const [direccionCita, setDireccionCita] = useState('');
    const [latDestino, setLatDestino] = useState('');
    const [lngDestino, setLngDestino] = useState('');

    // Observaciones
    const [observaciones, setObservaciones] = useState('');
    const [observacionesOperador, setObservacionesOperador] = useState('');

    // Datos acompañante
    const [nombreAcompanante, setNombreAcompanante] = useState('');
    const [telefonoAcompanante, setTelefonoAcompanante] = useState('');

    // Location
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [isNew, setIsNew] = useState(true);
    const [saveChat, setSaveChat] = useState(false);
    const [isCompletyClosed, setIsCompletyClosed] = useState(false);
    const [isNewNovelty, setIsNewNovelty] = useState(true);

    // Modal
    const [visibleMedia, setVisibleMedia] = useState(false);
    const [modalPreview, setModalPreview] = useState(false);

    const [dataChat, setDataChat] = useState<any>([]);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [itemService, setItemService] = useState<ItemService | null>(null);
    const [isPreReOpenNovelty, setIsPreReOpenNovelty] = useState(false);

    const handleInputChange = (text: any, name: any) => {
        if (name === 'message') {
            setMessage(text)
        }
    };

    const handlePressBack = () => {
        if (isNewNovelty) {
            Alert.alert(
                "Registro de comentario requerido",
                "Señor usuario, debe registrar un comentario para el envío de la novedad."
            );
        } else {
            navigation.goBack();
        }
    };

    const toggleBottomNavigationView = () => {
        setVisibleMenu(!visibleMenu);
    };

    const handlePreOpenNovelty = () => {
        setIsLoading(false);
        setIsPreReOpenNovelty(true);
    };

    const handleOpenNovelty = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const data: ApiData = {
                token,
                method: 'PATCH',
                body: JSON.stringify({
                    id: itemService?.id,
                    estado_novedad: 7,
                }),
            };
            const response = await asyncSendApis(`/novelty/apiRegistroNovedad`, data);

            if (response.status) {
                setIsLoading(false);
                setIsNew(true);
                setSaveChat(true);
                sendMessage(itemService ? itemService?.id : '');
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error ====> ", error);
            setIsLoading(false);
        }
    };

    const handleModalPreview = () => {
        setModalPreview(!modalPreview);
        setSelectedImage(null);
    };

    const openCamera = () => {
        setVisibleMedia(!visibleMedia);
        //navigation.navigate('PhotoCamera', { itemService });
    };

    //Galería
    const openImagePickerAsync = async () => {
        try {
            const options: ImageLibraryOptions = {
                mediaType: 'photo' as MediaType,
                includeBase64: true,
                quality: 0.3,
                maxHeight: 400,
                maxWidth: 400
            };

            const result = await launchImageLibrary(options);

            if (result.didCancel || result.errorMessage) {
                return;
            }

            const asset = result.assets && result.assets[0];
            if (asset && asset.uri && asset.base64) {
                console.log('asset.uri ', asset.uri);
                //console.log('asset.base64 ', `data:${asset.type};base64,${asset.base64}`);
                setSelectedImage(asset.uri);
                setVisibleMedia(!visibleMedia);
                setModalPreview(true);
            } else {
                Alert.alert(
                    'Error',
                    'La selección de imagen no es válida. Inténtalo de nuevo.'
                );
            }
        } catch (error: any) {
            console.error('Error al abrir la galería:', error.message);
            Alert.alert('Error', 'Error al abrir la galería. Inténtalo de nuevo.');
        }
    };


    // Obtener información del listado de servicios
    const getData = async () => {
        const { item: itemService, isCloseBySupervisor, isNewNovelty } = route.params as { item: any, isCloseBySupervisor: any, isNewNovelty: any };
        setSaveChat(true);
        setIsCompletyClosed(isCloseBySupervisor);
        setIsNewNovelty(isNewNovelty);
        setItemService(itemService);

        if (itemService) {
            await getDataChat(itemService.id);

            if (itemService.estado_leido_app === false) {
                await sendNoveltyView();
            }
        }
    };

    // Obtener el historial de mensajes del servicio
    const getDataChat = async (id: string) => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const data: ApiData = { token };
            const response = await asyncSendApis(`/novelty/apiMessage?novelty=${id}`, data);
            if (response.status) {
                console.log('response ', response);
                setDataChat(response);
            } else {
                console.error("Error GetDataChat ==> ", response);
            }
        } catch (error) {
            console.error("CatchError GetDataChat ==> ", error);
        }
    };

    const sendNoveltyView = async () => {
        try {
            const token = await AsyncStorage.getItem('Token');
            const data: ApiData = {
                token,
                method: 'PATCH',
                body: JSON.stringify({
                    //id: itemService.id,
                    estado_leido_app: true,
                }),
            };

            const response = await asyncSendApis(`/novelty/apiRegistroNovedad`, data);

            if (response?.status) {
                console.log('Se actualizó el estado.');
            } else {
                console.error("Error al actualizar el estado ====> ", response);
            }
        } catch (error) {
            console.error("CatchErrorsendNoveltyView ====> ", error);
        }
    };

    const handlePressPreoperatively = async () => {
        setLoadingModal(true);
        setSendLoading(true);

        try {
            const data: ApiData = {
                method: 'GET',
            };

            const response = await asyncSendApis('/api-general/api_version', data);

            if (response.status) {
                if (response.tas_web_validation) {
                    await tasWebValidation();
                } else {
                    //handlePressScanpdf417();
                }
            } else {
                console.error('Error en handlePressPreoperatively ==> ', response);
            }
        } catch (error) {
            console.error('Error en handlePressPreoperatively ===>', error);
            setSendLoading(false);
            setVisibleMenu(false);
            setLoadingModal(false);
        }
    };

    const tasWebValidation = async () => {
        setLoadingModal(true);
        setSendLoading(true);

        try {
            const token = await AsyncStorage.getItem('Token');
            const data: ApiData = {
                token,
                method: 'GET',
            };

            const response = await asyncSendApis('/apis/api_Tasweb', data);

            if (response.status) {
                setSendLoading(false);

                if (response.enlistmentState !== '') {
                    //handlePressScanpdf417();
                } else {
                    Alert.alert(
                        'Validación Preoperacional',
                        'Por favor diríjase al aplicativo de TASWEB y realice el preoperacional, recuerde que sin este requisito no puede prestar sus servicios'
                    );
                    setVisibleMenu(false);
                    setLoadingModal(false);
                }
            } else {
                alert('Algo salió mal, comunícate con tu proveedor de servicios');
                setSendLoading(false);
                setVisibleMenu(false);
                setLoadingModal(false);
            }
        } catch (error) {
            console.error('Error en tasWebValidation ===>', error);
            alert('Algo salió mal, comunícate con tu proveedor de servicios');
            setSendLoading(false);
            setVisibleMenu(false);
            setLoadingModal(false);
        }
    };

    const sendMessage = async (idNovelty: string) => {
        if (message.trim().length > 0) {
            if (message.length >= 20) {
                try {
                    const token = await AsyncStorage.getItem('Token');
                    const data: ApiData = {
                        method: 'POST',
                        token,
                        body: JSON.stringify({
                            content: message,
                        }),
                    };

                    const response = await asyncSendApis(`/novelty/apiMessage?novelty=${idNovelty}`, data);

                    if (response.status) {
                        setMessage('');
                        setIsNewNovelty(false);
                        const { item: itemService } = route.params as { item: any };
                        await getDataChat(itemService.id);
                    } else {
                        console.error('Error ===>', response);
                    }
                } catch (error) {
                    console.error('CatchErrorSendMessage ===>', error);
                }
            } else {
                Alert.alert('Error', 'El mensaje debe tener más de 20 caracteres.');
            }
        } else {
            Alert.alert('Error', 'Debe registrar un comentario para poder enviar esta novedad.');
        }
    };

    const sendMessageImage = async (idNovelty: string) => {
        if (message.trim().length > 0) {
            if (message.length >= 20) {
                try {
                    const token = await AsyncStorage.getItem('Token');
                    const data: ApiData = {
                        method: 'POST',
                        token,
                        form: 'multipart/form-data',
                        body: {
                            content: message,
                            image: {
                                uri: selectedImage,
                                name: 'image.jpg',
                                type: 'image/jpeg',
                            },
                        },
                    };
                    console.log(`/novelty/apiMessage?novelty=${idNovelty}`);
                    console.log(`data `, data);
                    const response = await asyncSendApis(`/novelty/apiMessage?novelty=${idNovelty}`, data);

                    if (response.status) {
                        setMessage('');
                        setModalPreview(!modalPreview);
                        const { item: itemService } = route.params as { item: any };
                        await getDataChat(itemService.id);
                    }
                } catch (error) {
                    console.error('CatchError ===>', error);
                }
            } else {
                Alert.alert('Error', 'El mensaje debe tener más de 20 caracteres.');
            }
        } else {
            Alert.alert('Error', 'Debe registrar un comentario para poder enviar esta novedad.');
        }
    };

    const handlePressImage = () => {
        setVisibleMedia(!visibleMedia);
    };

    useEffect(() => {
        getData();
    }, []);

    return {
        message,
        setMessage,
        loadingModal,
        setLoadingModal,
        visibleMenu,
        setVisibleMenu,
        isLoading,
        setIsLoading,
        sendLoading,
        setSendLoading,
        fecha,
        setFecha,
        textWhatsapp,
        setTextWhatsapp,
        validateService,
        setValidateService,
        estadoServicio,
        setEstadoServicio,
        idServicio,
        setIdServicio,
        solicitud,
        setSolicitud,
        tipoRuta,
        setTipoRuta,
        tipoProcedimiento,
        setTipoProcedimiento,
        categoriaPasajero,
        setCategoriaPasajero,
        medio,
        setMedio,
        observacionesPasajero,
        setObservacionesPasajero,
        nombreUsuario,
        setNombreUsuario,
        tipoDocumentoUsuario,
        setTipoDocumentoUsuario,
        numeroDocumentoUsuario,
        setNumeroDocumentoUsuario,
        cliente,
        setCliente,
        telefono1Usuario,
        setTelefono1Usuario,
        telefono2Usuario,
        setTelefono2Usuario,
        phoneNumberWhatsapp,
        setPhoneNumberWhatsapp,
        horaRecogida,
        setHoraRecogida,
        municipioRecogida,
        setMunicipioRecogida,
        origenRecogida,
        setOrigenRecogida,
        direccionRecogida,
        setDireccionRecogida,
        latOrigen,
        setLatOrigen,
        lngOrigen,
        setLngOrigen,
        horaCita,
        setHoraCita,
        municipioCita,
        setMunicipioCita,
        destinoCita,
        setDestinoCita,
        direccionCita,
        setDireccionCita,
        latDestino,
        setLatDestino,
        lngDestino,
        setLngDestino,
        observaciones,
        setObservaciones,
        observacionesOperador,
        setObservacionesOperador,
        nombreAcompanante,
        setNombreAcompanante,
        telefonoAcompanante,
        setTelefonoAcompanante,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        isNew,
        setIsNew,
        saveChat,
        setSaveChat,
        isCompletyClosed,
        setIsCompletyClosed,
        isNewNovelty,
        setIsNewNovelty,
        visibleMedia,
        setVisibleMedia,
        modalPreview,
        setModalPreview,
        dataChat,
        setDataChat,
        selectedImage,
        setSelectedImage,
        itemService,
        setItemService,
        isPreReOpenNovelty,
        setIsPreReOpenNovelty,
        handlePressBack,
        handlePressPreoperatively,
        toggleBottomNavigationView,
        handlePreOpenNovelty,
        openCamera,
        sendMessage,
        handlePressImage,
        openImagePickerAsync,
        handleModalPreview,
        sendMessageImage,
        handleInputChange
    };
};

export default NoveltyDetails;