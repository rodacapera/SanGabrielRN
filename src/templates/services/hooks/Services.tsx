import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ConfigConstants } from '@src/globals/config/config';
import { asyncSendApis } from '@src/globals/services/service';
import { ApiData } from '@src/types/api';
import { StackNavigation } from '@src/types/navigation';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Linking } from 'react-native';

const ServicesList = ({ }) => {
    const navigation = useNavigation<StackNavigation>();
    const [isLoading, setIsLoading] = useState(true);
    const [dataSource, setDataSource] = useState<any>([]);
    const [dataLoading, setDataLoading] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
    const [dataCategories, setDataCategories] = useState<any>([]);
    const [dataSubCategories, setDataSubCategories] = useState<any>([]);
    const [dataNovelty, setDataNovelty] = useState<any>([]);

    // Calendario
    const [visible, setVisible] = useState(false);
    const [verifyVersion, setVerifyVersion] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState<any>(null);

    // Modal novedades
    const [visibleNovedades, setVisibleNovedades] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(false);
    const [visibleSubCategories, setVisibleSubCategories] = useState(false);
    const [visibleNovelty, setVisibleNovelty] = useState(false);

    const [categoryNameSelected, setCategoryNameSelected] = useState('');
    const [categoryIdSelected, setCategoryIdSelected] = useState('');

    const [subCategoryNameSelected, setSubCategoryNameSelected] = useState('');
    const [subCategoryIdSelected, setSubCategoryIdSelected] = useState('');

    const [noveltyNameSelected, setNoveltyNameSelected] = useState('');
    const [noveltyIdSelected, setNoveltyIdSelected] = useState('');

    const [serviceIdReport, setServiceIdReport] = useState('');
    const [loadingReport, setLoadingReport] = useState(false);
    const [stateService, setStateService] = useState(null);
    const [itemService, setItemService] = useState(null);

    const onDateInitial = async (date: any) => {
        let fechaAsync = await AsyncStorage.getItem('dateCalendar');
        if (fechaAsync !== 'undefined' && fechaAsync !== null) {
            setSelectedStartDate(fechaAsync);
            getServices(fechaAsync);
        } else {
            const formattedDate = moment(date).format('YYYY-MM-DD');
            await AsyncStorage.setItem('dateCalendar', formattedDate);
            setSelectedStartDate(formattedDate);
            getServices(formattedDate);
        }
    };

    const onDateChange = (date: any) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        setSelectedStartDate(formattedDate);
        getServices(formattedDate);
        setVisible(!visible);
    };

    const handlePressBack = () => {
        navigation.goBack();
    };

    const handlePressDetails = (id: any, status: any) => {
        navigation.navigate('ServicesDetails', {
            id: id,
            fecha: selectedStartDate,
            status: status,
        });
    };

    const handlePressOngoing = (id: any) => {
        //navigation.navigate('FinishService', { id: id, fecha: selectedStartDate });
    };

    const handlePressChat = (item: any, servicio_id: any) => {
        const itemAux = {
            id: item.novedad_id,
            servicio: servicio_id,
            destino: item?.destino,
            origen: item?.origen,
            pasajero_nombre: item?.pasajero,
            estado_nombre: ' ',
            estado_servicio: item.estado_servicio,
        };
        //navigation.navigate('NoveltyDetails', { item: itemAux, isCloseBySupervisor: false, isNewNovelty: false });
    };

    const handlePressNoveltyDetails = async () => {
        setLoadingReport(true);
        setVisibleNovedades(false);
        createNovelty();
    };

    const createNovelty = async () => {
        const itemServiceAux = itemService;
        try {
            let data: ApiData = {
                method: 'POST',
                token: await AsyncStorage.getItem('Token'),
                body: JSON.stringify({
                    servicio: serviceIdReport,
                    novedad: noveltyIdSelected,
                    estado_leido_app: null
                })
            };
            let response = await asyncSendApis('/novelty/apiRegistroNovedad', data);
            if (response.status) {
                setLoadingReport(false);
                setVisibleNovedades(false);
                /*  if (itemServiceAux) {
                     const item = {
                         servicio: itemServiceAux.id,
                         estado_nombre: ' ',
                         estado_servicio: itemServiceAux.estadoAssing || '',
                         pasajero_nombre: `${itemServiceAux?.pasajero?.primer_nombre} ${itemServiceAux?.pasajero?.primer_apellido}`,
                         origen: itemServiceAux?.origen?.nombre,
                         destino: itemServiceAux?.destino?.nombre,
                         id: response.id
                     };
                     //navigation.navigate('NoveltyDetails', { item: item, isCloseBySupervisor: false, isNewNovelty: true });
                 } */
            } else {
                console.log("Error ====> ", response);
            }
        } catch (error) {
            console.log("CatchError ====> ", error);
        }
    };

    const visibleCalendar = () => {
        setVisible(!visibleNovedades);
    };

    const visibleNovedadesHandler = async (IdService: any, estadoServicio: any, hasNovelty: any, item: any) => {
       /*  setVisibleNovedades(!visibleNovedades);
        setVisibleCategories(false);
        setVisibleSubCategories(false);
        setVisibleNovelty(false);
        setCategoryIdSelected('');
        setCategoryNameSelected('');
        setSubCategoryNameSelected('');
        setSubCategoryIdSelected('');
        setNoveltyNameSelected('');
        setNoveltyIdSelected('');
        setServiceIdReport(IdService);
        setStateService(estadoServicio);
        setItemService(item);
        getCategories(); */
    };

    const closeVisibleNovedades = async (IdService: any, estadoServicio: any, hasNovelty: any) => {
        setVisibleNovedades(!visibleNovedades);
        setVisibleCategories(false);
        setVisibleSubCategories(false);
        setVisibleNovelty(false);
        setCategoryIdSelected('');
        setCategoryNameSelected('');
        setSubCategoryNameSelected('');
        setSubCategoryIdSelected('');
        setNoveltyNameSelected('');
        setNoveltyIdSelected('');
        setServiceIdReport(IdService);
        setStateService(estadoServicio);
        setItemService(null);
    };

    const AppInGoogle = () => {
        Linking.openURL(`https://play.google.com/store/apps/details?id=com.sangabriel.sangabriel`);
    };

    const openCategories = () => {
        setVisibleCategories(!visibleCategories);
    };

    const openSubCategories = () => {
        setVisibleSubCategories(!visibleSubCategories);
    };

    const openNovelties = () => {
        setVisibleNovelty(!visibleNovelty);
    };

    const handleChangeCategory = async (idCategory: any, nameCategory: any) => {
        setCategoryIdSelected(idCategory);
        setCategoryNameSelected(nameCategory);
        setSubCategoryNameSelected('');
        setSubCategoryIdSelected('');
        setNoveltyNameSelected('');
        setNoveltyIdSelected('');
        setVisibleCategories(false);
        getSubCategories(idCategory);
    };

    // Handle subcategory change
    const handleChangeSubCategory = async (idSubCategory: any, nameSubCategory: any) => {
        setSubCategoryIdSelected(idSubCategory);
        setSubCategoryNameSelected(nameSubCategory);
        setNoveltyNameSelected('');
        setNoveltyIdSelected('');
        setVisibleSubCategories(false);
        getNovelties(idSubCategory);
    };

    // Handle novelty change
    const handleChangeNovelty = async (idNovelty: any, nameNovelty: any) => {
        setNoveltyIdSelected(idNovelty);
        setNoveltyNameSelected(nameNovelty);
        setVisibleNovelty(false);
    };

    // Handle back to close modals
    const handleBackModal = async () => {
        setVisibleCategories(false);
        setVisibleSubCategories(false);
        setVisibleNovelty(false);
    };

    // API to get services by date
    const getServices = async (fecha: any) => {
        await AsyncStorage.setItem('dateCalendar', "" + fecha);
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
            };
            let response = await asyncSendApis(`/apis/servicios/${fecha}/`, data);
            if (response.status) {
                setDataSource(response);
                //setDataSource([{ "id": 2610387, "pasajero": { "numero_documento": "1010239399", "id": 2785, "primer_nombre": "Carlos", "primer_apellido": "Perilla", "telefono_Celular1": "3143390348", "telefono_Celular2": "", "observaciones": "No Aplica", "tipoDocumento": { "id": 2, "nombre": "c��dula de ciudadan��a", "sigla": "CC" }, "categoria_Pasajero": { "id": 1, "nombre": "Baja" }, "medio": { "id": 17, "nombre": "Bast��n", "estado": 1 }, "cliente": { "id": 1, "nit": "900156264", "nombreRazonSocial": "Nueva Eps S.a.", "direccion": "Av Carrera 30 # 75 11", "telefono": "4193000", "correo": "Silvia.ibanez@nuevaeps.com.co", "estado": 1, "sector": 3, "barrio": 980 }, "estado": { "id": 1, "nombre": "Activo" }, "vehiculo": [{ "id": 23, "nombre": "Camioneta", "capacidad": "5 Pas", "completo": "Camioneta 5 Pas", "estado": 3 }, { "id": 25, "nombre": "Camioneta", "capacidad": "5", "completo": "Camioneta 5", "estado": 3 }] }, "destino": { "id": 3691, "nombre": "Clinica Chia", "direccion": "Calle 6 10 125", "barrio": { "id": 464, "nombre": "Casco urbano chia", "Upz": { "id": 99, "nombre": "Casco urbano chia cundinamarca", "Localidad": { "id": 81, "nombre": "Casco urbano chia cundinamarca", "Ciudad": { "id": 192, "nombre": "Chia", "Departamento": { "id": 15, "nombre": "Cundinamarca", "pais": 1 } } } } }, "claseDestino": null, "descripcion": "Clinica Chia", "pasajero": null, "tipoDestino": 1, "estado": 1, "aK": "", "latitude": "", "longitude": "" }, "origen": { "id": 1233521151, "nombre": "Casa En Suba", "direccion": "Calle 130 50 A 17", "barrio": { "id": 905, "nombre": "Ciudad jardin norte", "Upz": { "id": 489, "nombre": "Zona Norte", "Localidad": { "id": 442, "nombre": "Suba", "Ciudad": { "id": 104, "nombre": "Bogota D.C.", "Departamento": { "id": 5, "nombre": "Bogota D.C.", "pais": 1 } } } } }, "claseDestino": null, "descripcion": "Hogar De Paso", "pasajero": null, "tipoDestino": 1, "estado": 1, "aK": null, "latitude": "4.7170003", "longitude": "-74.0569046" }, "novedad": null, "estadoAssing": "Liberado", "procedimiento": "Di��lisis", "tipo_ruta": "Individual", "operador": { "nombre": "Eureka", "apellido": "Pruebas", "telefono": "3213177260", "placa": "Rin196" }, "novedades": { "novedad": true, "novedad_id": 31, "estado_novedad": "Creado Por Operador", "estado_servicio": "Liberado", "pasajero": "Carlos Perilla", "origen": "Casa En Suba", "destino": "Clinica Chia" }, "nDocumentoAcompa��ante": "NA", "nombreAcompa��ante": "NA", "telefonoAcompa��ante": "NA", "observacionesServicio": "", "pre_autorizacion": "20240808", "nAutorizacion": "20240808", "fechaServicio": "2024-08-08T17:00:00Z", "horaRecogida": "2024-08-08T16:00:00Z", "fechaRegistro": "2024-08-08T19:55:22.209636Z", "lote": null, "detalle": true, "fecha_inicio_autorizacion": "2024-08-08", "fecha_fin_autorizacion": "2024-09-08", "modified": "2024-08-08T19:56:52.585031Z", "comentario": "Servicio Liberado Con exito", "is_assing_masive": false, "firma": null, "latitudeStart": "", "longitudeStart": "", "latitudeFinish": "", "longitudeFinish": "", "AddressStart": "", "AddressFinish": "", "timeInicio": null, "cierre": null, "observacionesOperador": null, "bloqueado": 0, "estadoServicio": 22, "seguimiento": 2, "tipoAtencion": 1, "tipoTrayecto": 9, "tipoProcedimiento": 14, "tipoRuta": 4, "codigoServicio": 20, "tipo_servicio": 4, "documentoAcompa��ante": 1, "tipoAutorizacion": 1, "conductor": 1860, "usuario": 654, "solicitud": 223656 }]);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error ====> ", error);
            setIsLoading(false);
        }
    };

    // API to check app version
    const getVersion = async () => {
        try {
            let data: ApiData = {
                method: 'GET',
            };
            let response = await asyncSendApis('/api-general/api_version', data);
            if (response.status) {
                if (ConfigConstants.versionCode === response.version) {
                    onDateInitial(undefined);
                } else {
                    setVerifyVersion(true);
                }
            } else {
                console.log("CATCH VERSION ==> ", response);
            }
        } catch (error) {
            console.log("Error VERSION ==> ", error);
        }
    };

    // API to get categories
    const getCategories = async () => {
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
            };
            let response = await asyncSendApis(`/novelty/apiCategoria/?estadoServicio=${stateService}`, data);
            if (response.status) {
                setDataCategories(response);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("ErrorgetCategories ====> ", error);
            setIsLoading(false);
        }
    };

    // API to get subcategories
    const getSubCategories = async (idCategory: any) => {
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
            };
            let response = await asyncSendApis(`/novelty/apiSubCategoria/?categoria_id=${idCategory}&estadoServicio=${stateService}`, data);
            if (response.status) {
                setDataSubCategories(response);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("ErrorgetSubCategories ====> ", error);
            setIsLoading(false);
        }
    };

    // API to get novelties
    const getNovelties = async (idSubCategory: any) => {
        try {
            let data: ApiData = {
                token: await AsyncStorage.getItem('Token'),
            };
            let response = await asyncSendApis(`/novelty/apiNovedad?estadoServicio=${stateService}&subcategoria_id=${idSubCategory}`, data);
            if (response.status) {
                setDataNovelty(response);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("ErrorgetNovelties ====> ", error);
            setIsLoading(false);
        }
    };

    const reload = async () => {
        setIsLoading(true);
        await getServices(selectedStartDate);
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            getVersion();
        });
        return () => {
            focusListener();
        };
    }, [navigation]);


    return {
        visible,
        isLoading,
        dataSource,
        dataLoading,
        verifyVersion,
        selectedStartDate,
        visibleNovedades,
        dataCategories,
        dataSubCategories,
        dataNovelty,
        visibleCategories,
        visibleSubCategories,
        visibleNovelty,
        categoryIdSelected,
        subCategoryIdSelected,
        noveltyIdSelected,
        categoryNameSelected,
        subCategoryNameSelected,
        noveltyNameSelected,
        serviceIdReport,
        loadingReport,
        stateService,

        handlePressOngoing,
        handlePressDetails,
        visibleNovedadesHandler,
        closeVisibleNovedades,
        handlePressBack,
        visibleCalendar,
        onDateChange,
        AppInGoogle,
        reload,
        openCategories,
        openSubCategories,
        openNovelties,
        handleChangeCategory,
        handleChangeSubCategory,
        handleChangeNovelty,
        handleBackModal,
        handlePressNoveltyDetails,
        handlePressChat
    }

};

export default ServicesList;