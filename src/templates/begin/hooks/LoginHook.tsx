import {Platform, Linking, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {StackNavigation} from '../../../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiData} from '../../../types/api';
import axios from 'axios';
import {asyncSendApis} from '../../../globals/services/service';
import DeviceInfo from 'react-native-device-info';

const LoginHook = ({}: {}) => {
  const navigation = useNavigation<StackNavigation>();
  const currentVersion = DeviceInfo.getVersion();
  const [verifyVersion, setVerifyVersion] = useState(false);
  const [verifyLocation, setVerifyLocation] = useState(true);
  const [permissionAccepted, setPermissionAccepted] = useState(false);
  const [accept_tyc, setAccept_tyc] = useState(false);
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [textErrorUsername, setTextErrorUsername] = useState('');
  const [textErrorPassword, setTextErrorPassword] = useState('');
  const [textError, setTextError] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handlePressPassword = () => {
    navigation.navigate('PasswordOne');
  };

  const handleInputChange = (text: any, name: any) => {
    if (name === 'username') {
      setName(text);
    } else if (name === 'password') {
      setPassword(text);
    }
  };

  const requestPermissions = (type: any) => {
    if (type === 1) {
      setVerifyLocation(true);
      setPermissionAccepted(false);
    } else {
      setVerifyLocation(false);
      setPermissionAccepted(true);
      //await Linking.openSettings();
    }
  };

  const showModalError = () => {
    setShow(false);
  };

  //guardar el token de manera global
  const tokenValidate = async (token: any) => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('Token', '' + token);
  };

  //-------------------- inicio sección de apis --------------------
  const handlePressLogin = async () => {
    if (accept_tyc) {
      if (!permissionAccepted) {
        setVerifyLocation(true);
      } else {
        setIsLoading(true);
        //evaluo si tiene los campos en blanco antes de consumir el API
        if (username === '' && password === '') {
          setTextErrorUsername('* Correo electrónico obligatorio');
          setTextErrorPassword('* Contraseña obligatoria');
          setIsLoading(false);
        } else if (username === '' && password != '') {
          setTextErrorUsername('* Correo electrónico obligatorio');
          setTextErrorPassword('');
          setIsLoading(false);
        } else if (password === '' && username != '') {
          setTextErrorUsername('');
          setTextErrorPassword('* Contraseña obligatoria');
          setIsLoading(false);
        } else {
          try {
            let data: ApiData = {
              //credentials: 'omit',
              method: 'POST',
              body: JSON.stringify({
                username: username,
                password: password
              })
            };
            console.log('data', data);
            let response = await asyncSendApis('/rest-auth/login/', data);
            console.log('response handlePressLogin', response.status);

            if (response.status) {
              tokenValidate(response.key);
              api_put_id_device(response.key);
            } else {
              setTextErrorUsername('* Verifica tu correo electrónico');
              setTextErrorPassword('* Verifica tu contraseña');
              setIsLoading(false);
            }
          } catch (error: any) {
            console.log('Error ====> ', error);
            setTextError('Error en el proceso de acceso a tu cuenta.');
            setShow(true);
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response) {
              console.error('Error during API call:', error.response.data);
              return {
                status: false,
                error: error.response.data || 'Request failed'
              };
            } else {
              console.error('Error during API call:', error.message);
              return {
                status: false,
                error: error.message || 'Request failed'
              };
            }
          }
        }
      }
    } else {
      Alert.alert(
        'Debes aceptar los términos y condiciones y la política de privacidad'
      );
    }
  };

  const api_put_id_device = async (tok: any) => {
    const tokenStorage = await AsyncStorage.getItem('@fcmToken');
    try {
      let operating_system = 0;
      if (Platform.OS === 'ios') {
        operating_system = 2;
      } else {
        operating_system = 1;
      }
      let data: ApiData = {
        token: tok,
        method: 'POST',
        body: JSON.stringify({
          push_token: tokenStorage,
          operating_system: operating_system
        })
      };
      let response = await asyncSendApis(
        '/usuarios/actualizarDispositivos',
        data
      );
      console.log('response api_put_id_device', response.status);

      if (response.status) {
        setIsLoading(false);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error ==> ', error);
      setIsLoading(false);
    }
  };

  const AppInGoogle = (type: number) => {
    if (type === 1) {
      // 1: ir a la play store para actualizar la app
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=com.sangabriel.sangabriel`
      );
    } else if (type === 2) {
      // 2: Términos y condiciones
      navigation.navigate('Terms', {type: 1});
    } else if (type === 3) {
      // 3: Política de privacidad
      navigation.navigate('Terms', {type: 2});
    }
  };

  const Accept_tyc = () => {
    setAccept_tyc(!accept_tyc);
    if (!accept_tyc) {
      setVerifyLocation(true);
    }
  };

  const getVersion = async () => {
    try {
      const data: ApiData = {
        method: 'GET'
      };
      const response = await asyncSendApis('/api-general/api_version', data);
      if (response.status) {
        if (currentVersion != response.version) {
          setVerifyVersion(true);
        } else {
          getUserLogged();
        }
      } else {
        console.log('CATCH VERSION ==> ', response);
      }
    } catch (error: any) {
      console.log('Error VERSION ==> ', error);
    }
  };

  const getUserLogged = async () => {
    setIsLoading(true);
    let token = await AsyncStorage.getItem('Token');
    if (token != null) {
      setIsLoading(false);
      // navigation.navigate('Home');
    } else {
      setIsLoading(false);
    }
  };

  const handlePressDenyLocation = () => {
    setVerifyLocation(false);
    setAccept_tyc(false);
  };

  useEffect(() => {
    getVersion();
  }, []);

  return {
    navigation,
    verifyVersion,
    setVerifyVersion,
    verifyLocation,
    setVerifyLocation,
    permissionAccepted,
    setPermissionAccepted,
    accept_tyc,
    setAccept_tyc,
    username,
    setName,
    password,
    setPassword,
    textErrorUsername,
    setTextErrorUsername,
    textErrorPassword,
    setTextErrorPassword,
    textError,
    setTextError,
    show,
    setShow,
    isLoading,
    loadingLogin,
    setLoadingLogin,
    handlePressPassword,
    requestPermissions,
    AppInGoogle,
    Accept_tyc,
    handleInputChange,
    handlePressLogin,
    showModalError
  };
};

export default LoginHook;
