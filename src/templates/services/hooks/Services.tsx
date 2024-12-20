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