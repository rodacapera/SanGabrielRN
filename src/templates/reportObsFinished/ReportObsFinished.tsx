import { sG } from '@src/globals/styles/styles';
import { TouchableOpacity, Text, View, ImageBackground, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReportObsFinished from './hook/ReportObsFinished';
import { app_bg_01 } from '@src/assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ReportObsFinishedTemplate = () => {
    const {
        sendLoading,
        handlePressEnviarNovedad,
        handleInputChange,
        observaciones
    } = ReportObsFinished({});

    return (
        <View style={[sG.container]}>
            <ImageBackground style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]} source={app_bg_01}>
                <KeyboardAwareScrollView>
                    <ScrollView>
                        <View style={[sG.row_100, sG.w_100, sG.ai_center, sG.jc_center, sG.m_t_xl]}>
                            <View style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center, sG.bg_white, sG.card_shadow, sG.brounded]}>
                                <View style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]}>
                                    <View style={[sG.h_10, sG.w_100, sG.jc_center]}>
                                        <Text style={[sG.h7, sG.text_primary, sG.bold]}>Observaciones para el servicio</Text>
                                    </View>
                                    <View style={[sG.h_80, sG.w_100, sG.jc_center, sG.ai_center]}>
                                        <View style={[sG.h_90, sG.w_100, sG.jc_center, sG.ai_center, sG.border, sG.brounded]}>
                                            <TextInput
                                                multiline={true}
                                                style={[sG.w_90, sG.h_90, sG.h8, sG.text_gray]}
                                                placeholder="Escribe aquí las observaciones que tengas para este servicio"
                                                placeholderTextColor="#BDBDBD"
                                                value={observaciones}
                                                onChangeText={(text) => handleInputChange(text, "observaciones")}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[sG.row_30, sG.w_100, sG.ai_center, sG.jc_center]}>
                            <View style={[sG.w_90, sG.h_60, sG.ai_center, sG.jc_center, sG.chrow]}>
                                <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center]}>
                                    {observaciones.trim() != "" ?
                                        sendLoading ?
                                            <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.broundedmax, sG.chrow, sG.bg_white]}>
                                                <ActivityIndicator size="large" color="#3ec7a9" />
                                            </View>
                                            :
                                            <TouchableOpacity style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.broundedmax, sG.chrow, sG.bg_white]} onPress={handlePressEnviarNovedad}>
                                                <FontAwesome name="paper-plane" style={[sG.size_icon, sG.text_primary]} />
                                                <Text style={[sG.h7, sG.bold, sG.text_primary]}>   Enviar Observación</Text>
                                            </TouchableOpacity>
                                        :
                                        <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.broundedmax, sG.chrow, sG.bg_white]}>
                                            <FontAwesome name="paper-plane" style={[sG.size_icon, sG.text_primary]} />
                                            <Text style={[sG.h7, sG.bold, sG.text_primary]}>   Enviar Observación</Text>
                                        </View>
                                    }

                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </ImageBackground>
        </View>
    );
}