import { Text, View, TouchableOpacity, ActivityIndicator, Modal, ScrollView, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import ServiceValidations from './hooks/ServiceValidations';
import { sG } from '@src/globals/styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ServiceValidationsTemplate = () => {
    const {
        scanned,
        documentValid,
        sendLoading,
        digitManual,
        show,
        documentManual,
        setNumeroDocumentManual,
        numeroDocumento_usuario,
        handlePress,
        tipo,
        handlePressDigitManual,
        handlePressCancel,
        handlePressScaned,
        handlePressFinish,
        handlePressVerifyManualDocument
    } = ServiceValidations({});

    return (
        <View style={[sG.container]}>
            {digitManual ?
                <View style={[sG.w_100, sG.h_90, sG.ai_center, sG.jc_center]}>
                    <KeyboardAwareScrollView>
                        <ScrollView>
                            <View style={[sG.w_100, sG.row_50, sG.ai_center, sG.jc_center]}>
                                <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.ai_center]}>
                                    <Text style={[sG.h8, sG.text_center]}>Ingresa el número de identificación  del paciente y en breve haremos la verificación.</Text>
                                </View>
                            </View>

                            <View style={[sG.w_100, sG.row_30, sG.ai_center, sG.jc_center]}>
                                <View style={[sG.w_90, sG.h_90, sG.ai_center, sG.jc_center]}>
                                    <View style={[sG.w_95, sG.h_40, sG.jc_end]}>
                                        <Text style={[sG.h8, sG.text_secondary]}>Número de identificación</Text>
                                    </View>
                                    <View style={[sG.w_100, sG.h_60, sG.jc_center, sG.chrow, sG.ai_center]}>
                                        <View style={[sG.w_10, sG.h_100, sG.jc_center, sG.ai_center]}>
                                            <FontAwesome name='vcard-o' style={[sG.size_icon, documentManual.length > 0 ? sG.text_secondary : sG.text_gray_light]} />
                                        </View>
                                        <TextInput keyboardType='numeric' value={documentManual} autoCapitalize='none' onChangeText={(text) => setNumeroDocumentManual(text)} style={[sG.h_90, sG.w_90, sG.h7, sG.text_center, stylesLocal.componentBottom]} placeholder='Número de identificación' placeholderTextColor='#BDBDBD'>
                                        </TextInput>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                </View>
                :
                <View style={[sG.w_100, sG.h_90, sG.ai_center, sG.jc_center]}>
                    {!scanned ?
                        <View style={[sG.w_100, sG.h_90, sG.ai_center, sG.jc_center]}>
                        </View>
                        : scanned && !documentValid ?
                            <View style={[sG.w_80, sG.h_90, sG.ai_center, sG.jc_center]}>
                                <MaterialCommunityIcons name="close-circle-outline" style={[sG.size_icon_xl, sG.text_red]} />
                                <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_gray]}>{'\nCédula invalida'}</Text>
                                <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_gray]}>{'El paciente asignado a la cita no corresponde al número de cédula ingresado.'}</Text>
                            </View>
                            : scanned && documentValid ?
                                <View style={[sG.w_80, sG.h_90, sG.ai_center, sG.jc_center]}>
                                    <MaterialCommunityIcons name="check-circle-outline" style={[sG.size_icon_xl, sG.text_primary]} />
                                    <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_gray]}>{'\nEl número de cédula ' + numeroDocumento_usuario + ' es valido.'}</Text>
                                </View>
                                : null}
                </View>
            }

            {digitManual ?
                <View style={[sG.w_100, sG.h_10, sG.jc_end]}>
                    <View style={[sG.w_100, sG.h_90]}>
                        <TouchableOpacity style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.bg_primary]} onPress={handlePressVerifyManualDocument}>
                            <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Verificar Documento</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={[sG.w_100, sG.h_10, sG.jc_end]}>
                    {scanned && documentValid && tipo === '1' ?
                        <TouchableOpacity style={[sG.w_100, sG.h_80, sG.ai_center, sG.jc_center, sG.bg_primary, sG.chrow]} onPress={handlePress}>
                            <FontAwesome name="play" style={[sG.size_icon, sG.text_white]} />
                            <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>  Iniciar Servicio</Text>
                        </TouchableOpacity>
                        : scanned && documentValid && tipo === '2' ?
                            <TouchableOpacity style={[sG.w_100, sG.h_80, sG.ai_center, sG.jc_center, sG.bg_primary, sG.chrow]} onPress={handlePressFinish}>
                                <FontAwesome name="play" style={[sG.size_icon, sG.text_white]} />
                                <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>  Finalizar Servicio</Text>
                            </TouchableOpacity>
                            : scanned && !documentValid ?
                                <TouchableOpacity style={[sG.w_100, sG.h_80, sG.ai_center, sG.jc_center, sG.bg_primary]} onPress={handlePressScaned}>
                                    <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Intentar de Nuevo</Text>
                                </TouchableOpacity>
                                : sendLoading ?
                                    <View style={[sG.w_100, sG.h_80, sG.ai_center, sG.jc_center, sG.bg_primary]}>
                                        <ActivityIndicator size="large" color="#3ec7a9" />
                                    </View>
                                    : null}
                </View>
            }

            <Modal animationType="fade" transparent={true} visible={show}>
                <View style={[sG.container, sG.ai_center, sG.jc_center]}>
                    <View style={[sG.w_100, sG.h_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_30, sG.h_100, sG.ai_center, sG.jc_center, sG.bg_zindex_camera]}>
                        </View>
                        <View style={[sG.w_40, sG.h_100, sG.ai_center, sG.jc_center]}>
                        </View>
                        <View style={[sG.w_30, sG.h_100, sG.ai_center, sG.jc_center, sG.bg_zindex_camera]}>
                        </View>
                    </View>
                    <View style={[sG.w_100, sG.h_10, sG.ai_end, sG.bg_primary, sG.chrow]}>
                        <TouchableOpacity style={[sG.w_50, sG.h_100, sG.ai_center, sG.jc_center, sG.bg_primary, sG.chrow]} onPress={handlePressCancel}>
                            <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>  Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[sG.w_50, sG.h_100, sG.ai_center, sG.jc_center, sG.bg_red, sG.chrow]} onPress={handlePressDigitManual}>
                            <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Digitar{'\n'}Manualmente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const stylesLocal = EStyleSheet.create({
    componentBottom: {
        borderBottomColor: '#ababab',
        borderBottomWidth: 2,
    },
})