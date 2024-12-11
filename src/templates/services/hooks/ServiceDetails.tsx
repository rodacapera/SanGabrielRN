import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { asyncSendApis } from '@src/globals/services/service';
import { ApiData } from '@src/types/api';
import { StackNavigation } from '@src/types/navigation';
import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { getDistance } from 'geolib';

const ServicesDetails = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const route = useRoute();

    const [loadingModal, setLoadingModal] = useState(false);
    const [visibleMenu, setVisibleMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [sendLoading, setSendLoading] = useState(false);

    // Servicio
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');
    const [statusServicio, setStatusServicio] = useState('');
    const [textWhatsapp, setTextWhatsapp] = useState('');
    const [validateService, setValidateService] = useState(false);
    const [estadoServicio, setEstadoServicio] = useState(null);
    const [idServicio, setIdServicio] = useState('');
    const [solicitud, setSolicitud] = useState('');
    const [tipoRuta, setTipoRuta] = useState('');
    const [tipoProcedimiento, setTipoProcedimiento] = useState('');
    const [categoriaPasajero, setCategoriaPasajero] = useState('');
    const [medio, setMedio] = useState('');
    const [observacionesPasajero, setObservacionesPasajero] = useState('');

    // Usuario
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [tipoDocumentoUsuario, setTipoDocumentoUsuario] = useState('');
    const [numeroDocumentoUsuario, setNumeroDocumentoUsuario] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefono1Usuario, setTelefono1Usuario] = useState('');
    const [telefono2Usuario, setTelefono2Usuario] = useState('');
    const [phoneNumberWhatsapp, setPhoneNumberWhatsapp] = useState('');

    // Origen
    const [horaRecogida, setHoraRecogida] = useState('');
    const [municipioRecogida, setMunicipioRecogida] = useState('');
    const [origenRecogida, setOrigenRecogida] = useState('');
    const [direccionRecogida, setDireccionRecogida] = useState('');
    const [latOrigen, setLatOrigen] = useState('');
    const [lngOrigen, setLngOrigen] = useState('');

    // Destino
    const [horaCita, setHoraCita] = useState('');
    const [municipioCita, setMunicipioCita] = useState('');
    const [destinoCita, setDestinoCita] = useState('');
    const [direccionCita, setDireccionCita] = useState('');
    const [latDestino, setLatDestino] = useState('');
    const [lngDestino, setLngDestino] = useState('');

    // Observaciones
    const [observaciones, setObservaciones] = useState('');
    const [observacionesOperador, setObservacionesOperador] = useState('');

    // Acompañante
    const [nombreAcompanante, setNombreAcompanante] = useState('');
    const [telefonoAcompanante, setTelefonoAcompanante] = useState('');

    // Localización
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // Evento para volver a la vista anterior
    const handlePressBack = () => {
        navigation.goBack();
    };

    // Evento para dirigirse a la marcación rápida Teléfono #1
    const handlePhone = () => {
        Linking.openURL(`tel:${telefono1Usuario}`);
    };

    // Evento para dirigirse a la marcación rápida Teléfono #2
    const handlePhoneTwo = () => {
        Linking.openURL(`tel:${telefono2Usuario}`);
    };

    // Evento para dirigirse al WhatsApp
    const handleWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${phoneNumberWhatsapp}&text=${textWhatsapp}`);
    };

    // Evento para abrir el certificado de cierre
    const handlePressImprimirPDF = () => {
        //Linking.openURL(`${ConstantClass.webserviceName}/servicios/certificadoCierre/${id}`);
    };

    // Evento que abre el modal (estadoServicio === 23)
    const toggleBottomNavigationView = () => {
        setVisibleMenu(!visibleMenu);
    };

    // Evento que dirige al módulo de reporte de novedades
    const handlePressReport = () => {
        setVisibleMenu(false);
        //navigation.navigate('ReportNewsAccept', { id, fecha });
    };

    // Evento que dirige al módulo de reasignación de servicios
    const handlePressReassign = () => {
        setVisibleMenu(false);
        //navigation.navigate('ReassignService', { id, fecha });
    };

    // Evento que dirige al módulo para agregar observaciones cuando el servicio está finalizado
    const handlePressReportObsFinished = () => {
        const hoy = new Date();
        const fechaServicio = new Date(fecha);
        const diffDays = hoy.getUTCDate() - fechaServicio.getUTCDate();

        if (diffDays < 2) {
            //navigation.navigate('ReportObsFinished', { id, observacionesOperador });
        } else {
            Alert.alert(
                "Servicio fuera del rango",
                "Señor conductor, ha pasado más de un día desde la fecha de este servicio, por esta razón ya no es permitido agregar observaciones."
            );
        }
    };

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

    const handlePressEnviar = () => {

    };

    // Obtener los datos de la ruta
    const getData = () => {
        const { id, fecha, status } = route.params;
        setId(id);
        setFecha(fecha);
        setStatusServicio(status);
        getService(id, fecha);
        validateServiceAPI(id);
    };

    // Validar si es posible iniciar el servicio
    const validateServiceAPI = async (id: any) => {
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
            };
            const response = await asyncSendApis('/api-servicios/apiValidateService/' + id, data);
            if (response.status) {
                setValidateService(true);
            }
        } catch (error) {
            console.log("ErrorGetData====> ", error);
        }
    };

    const getService = async (id: any, fecha: any) => {
        try {
            let data = { token: await AsyncStorage.getItem('Token') };
            let response = await asyncSendApis('/apis/servicios/' + fecha + '/' + id + '/', data);
            if (response.status) {
                setEstadoServicio(response.estadoServicio);
                setNombreUsuario(response.pasajero.primer_nombre + ' ' + response.pasajero.primer_apellido);
                setTipoDocumentoUsuario(response.pasajero.tipoDocumento.sigla);
                setNumeroDocumentoUsuario(response.pasajero.numero_documento);
                setCliente(response.cliente.nombreRazonSocial);
                setTelefono1Usuario(response.pasajero.telefono_Celular1);
                setTelefono2Usuario(response.pasajero.telefono_Celular2);
                setPhoneNumberWhatsapp('+57' + response.pasajero.telefono_Celular1);
                setMedio(response.pasajero.medio.nombre);
                setObservacionesPasajero(response.pasajero.observaciones);
                setObservacionesOperador(response.observacionesOperador);
                setHoraRecogida(response.horaRecogida);
                setMunicipioRecogida(response.origen.barrio.Upz.Localidad.Ciudad.nombre + ', ' + response.origen.barrio.Upz.Localidad.nombre);
                setLatOrigen(response.origen.latitude);
                setLngOrigen(response.origen.longitude);
                setOrigenRecogida(response.origen.nombre);
                setDireccionRecogida(response.origen.direccion);
                setHoraCita(response.fechaServicio);
                setMunicipioCita(response.destino.barrio.Upz.Localidad.Ciudad.nombre + ', ' + response.destino.barrio.Upz.Localidad.nombre);
                setLatDestino(response.destino.latitude);
                setLngDestino(response.destino.longitude);
                setDestinoCita(response.destino.nombre);
                setDireccionCita(response.destino.direccion);
                setObservaciones(response.observacionesServicio);
                setNombreAcompanante(response.nombreAcompañante);
                setTelefonoAcompanante(response.telefonoAcompanante);
                setIdServicio(response.id);
                setSolicitud(response.pre_autorizacion);
                setTipoRuta(response.tipo_ruta);
                setTipoProcedimiento(response.procedimiento);
                setCategoriaPasajero(response.pasajero.categoria_Pasajero.nombre);
                setTextWhatsapp(
                    'Señor(a) Usuari@ ' + response.pasajero.primer_nombre + ' ' + response.pasajero.primer_apellido + ', su servicio fue asignado para el día ' +
                    fecha + ' a las ' + response.horaRecogida.substring(11, 16) + ', Origen: ' + response.origen.barrio.Upz.Localidad.Ciudad.nombre + ' - ' +
                    response.origen.nombre + ' - ' + response.origen.direccion.replace('#', 'No. ') + ', hora de llegada a su  destino a las ' +
                    response.fechaServicio.substring(11, 16) + ' en ' + response.destino.barrio.Upz.Localidad.Ciudad.nombre + ' - ' +
                    response.destino.nombre + ' - ' + response.destino.direccion.replace('#', 'No. ') + ', operador asignado ' +
                    response.operador.nombre + ' ' + response.operador.apellido + ', vehículo de Placa ' + response.operador.placa +
                    ', número de contacto ' + response.operador.telefono + ', en caso de presentarse alguna novedad con la información sobre su servicio ' +
                    'indíquela por este medio para su respectiva gestión.'
                );
                setIsLoading(false);
                if (response.estadoServicio === 23) { // Obtener coordenadas de inicio de servicio
                    getLocation();
                }
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("ErrorGetService ====> ", error);
            setIsLoading(false);
        }
    };

    const handlePressPreoperatively = async () => {
        setIsLoading(true);
        try {
            let data: ApiData = { method: 'GET' };
            let response = await asyncSendApis('/api-general/api_version', data);
            if (response.status) {
                if (response.tas_web_validation) {
                    tasWebValidation();
                } else {
                    handleInitiateService();
                }
            } else {
                console.log("error ==> ", response);
            }
        } catch (error) {
            console.log("Error ====> ", error);
            setIsLoading(false);
        }
    };

    const tasWebValidation = async () => {
        setSendLoading(true);
        setLoadingModal(true);
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
                method: 'GET',
            };
            const response = await asyncSendApis('/apis/api_Tasweb', data);

            if (response.status) {
                setSendLoading(false);
                if (response.enlistmentState !== '') {
                    handleInitiateService();
                } else {
                    Alert.alert(
                        "Validación Preoperacional",
                        "Por favor diríjase al aplicativo de TASWEB y realice el preoperacional, recuerde que sin este requisito no puede prestar sus servicios"
                    );
                    setVisibleMenu(false);
                    setLoadingModal(false);
                }
            } else {
                Alert.alert('Algo salió mal, comunícate con tu proveedor de servicios');
                setSendLoading(false);
                setVisibleMenu(false);
                setLoadingModal(false);
            }
        } catch (error) {
            console.log("Error ====> ", error);
            Alert.alert('Algo salió mal, comunícate con tu proveedor de servicios');
            setSendLoading(false);
            setVisibleMenu(false);
            setLoadingModal(false);
        }
    };

    const handlePressDecline = () => {
        //navigation.navigate('ReportNews', { id: state.id, fecha: state.fecha });
    };

    const handleInitiateService = async () => {
        let currentLatitude = latitude;
        let currentLongitude = longitude;

        if (!currentLatitude || !currentLongitude) {
            try {
                const location = await getLocation();
                currentLatitude = location.latitude.toString();
                currentLongitude = location.longitude.toString();
            } catch {
                Alert.alert("Error", "No se pudo obtener la ubicación. Por favor, intente nuevamente.");
                setVisibleMenu(false);
                setLoadingModal(false);
                setSendLoading(false);
                return;
            }
        }

        const dis = getDistance(
            { latitude: currentLatitude, longitude: currentLongitude },
            { latitude: latOrigen, longitude: lngOrigen }
        );

        setTimeout(() => {
            Alert.alert(
                "Ubicación errónea",
                `Señor conductor, Usted está a ${(dis / 1000).toFixed(1)} km de donde debe iniciar el servicio\n\n¿Desea iniciarlo?`,
                [
                    {
                        text: "NO",
                        onPress: () => {
                            setVisibleMenu(false);
                            setLoadingModal(false);
                            setSendLoading(false);
                        }
                    },
                    {
                        text: "SI",
                        onPress: () => {
                            setTimeout(() => {
                                navigation.navigate('Scanpdf417', {
                                    fecha: fecha,
                                    id: id,
                                    numeroDocumento_usuario: numeroDocumentoUsuario,
                                    tipo: '1',
                                    latitude: latitude,
                                    longitude: longitude
                                })
                            }, 1000);
                            setVisibleMenu(false);
                            setLoadingModal(false);
                            setSendLoading(false);
                        }
                    }
                ]
            );
        }, 3000);
    };

    const handlePressStateService = async () => {
        setSendLoading(true);
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
                method: 'PATCH',
                body: JSON.stringify({
                    'estadoServicio': 23,
                    'idServicio': id,
                })
            };
            const response = await asyncSendApis(`/apis/servicios/${fecha}/${id}/`, data);

            if (response.status) {
                setSendLoading(false);
                navigation.navigate('Services');
            } else {
                setSendLoading(false);
            }
        } catch (error) {
            console.log("Error ====> ", error);
            setSendLoading(false);
        }
    };

    useEffect(() => {
        // Listener para el enfoque de la pantalla
        const focusListener = navigation.addListener('focus', () => {
            getData();
        });

        // Cleanup listener on unmount
        return () => {
            focusListener();
        };
    }, [navigation]);

    return {
        loadingModal,
        visibleMenu,
        isLoading,
        sendLoading,
        id,
        fecha,
        statusServicio,
        textWhatsapp,
        validateService,
        estadoServicio,
        idServicio,
        solicitud,
        tipoRuta,
        tipoProcedimiento,
        categoriaPasajero,
        medio,
        observacionesPasajero,
        nombreUsuario,
        tipoDocumentoUsuario,
        numeroDocumentoUsuario,
        cliente,
        telefono1Usuario,
        telefono2Usuario,
        phoneNumberWhatsapp,
        horaRecogida,
        municipioRecogida,
        origenRecogida,
        direccionRecogida,
        latOrigen,
        lngOrigen,
        horaCita,
        municipioCita,
        destinoCita,
        direccionCita,
        latDestino,
        lngDestino,
        observaciones,
        observacionesOperador,
        nombreAcompanante,
        telefonoAcompanante,
        latitude,
        longitude,
        handlePressBack,
        handlePhone,
        handlePhoneTwo,
        handleWhatsapp,
        handlePressImprimirPDF,
        toggleBottomNavigationView,
        handlePressReport,
        handlePressReassign,
        handlePressReportObsFinished,
        handlePressStateService,
        handlePressDecline,
        handlePressPreoperatively,
        handlePressEnviar
    };
};

export default ServicesDetails;