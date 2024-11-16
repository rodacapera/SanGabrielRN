import React, {useState, useEffect} from 'react';
import CustomNavBar from '@src/components/navBar/CustomNavBar';
import {sG} from '@src/globals/styles/styles';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import {WebView} from 'react-native-webview';

export const Policy = () => {
  const pdfUrl =
    'https://drive.google.com/file/d/1l9_6N54eqmea95FXN-cHKjWz5niSPzQf/preview'; // Asegúrate de usar la URL correcta

  const [loading, setLoading] = useState(true); // Controla la carga
  const [error, setError] = useState(false); // Controla el error

  // Usamos useEffect para gestionar el ciclo de vida de la carga del PDF
  useEffect(() => {
    // Simula la carga del PDF (puedes agregar más lógica si es necesario)
    const loadPdf = () => {
      // En este ejemplo, asumimos que el PDF se carga correctamente después de un delay
      // Puedes agregar tu lógica aquí si necesitas verificar si el PDF está disponible.
      setTimeout(() => {
        setLoading(false); // Cambiar el estado cuando el PDF esté listo
      }, 2000); // Simulamos 3 segundos de carga
    };

    loadPdf(); // Llamamos a la función para cargar el PDF

    // Cleanup si el componente se desmonta antes de que se cargue el PDF
    return () => {
      setLoading(false); // Si el componente se desmonta, dejamos de cargar
    };
  }, []); // El arreglo vacío [] asegura que solo se ejecute al montar el componente

  const handleError = () => {
    setError(true); // Si hay un error, actualizamos el estado
    setLoading(false); // Dejamos de mostrar el indicador de carga
  };

  return (
    <SafeAreaView style={[sG.container, sG.bg_white]}>
      <CustomNavBar title="Politica de Privacidad" />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={[sG.bg_black, sG.p_t_xxl]}>
        <View style={{flex: 1}}>
          {loading && !error ? (
            // Muestra el indicador de carga mientras el PDF no se haya cargado
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            />
          ) : error ? (
            // Muestra un mensaje de error si no se pudo cargar el PDF
            <Text style={{color: 'red', textAlign: 'center', fontSize: 18}}>
              No se pudo cargar el documento. Intenta nuevamente más tarde.
            </Text>
          ) : (
            // Una vez que el PDF esté cargado, muestra el WebView
            <WebView
              originWhitelist={['*']}
              source={{uri: pdfUrl}}
              style={{flex: 1}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true} // Habilita el zoom y el ajuste de la página al tamaño de la pantalla
              zoomable={true} // Permite hacer zoom
              onError={handleError} // Maneja los errores
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
