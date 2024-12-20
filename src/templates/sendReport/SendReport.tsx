import { sG } from '@src/globals/styles/styles';
import { TouchableOpacity, Text, View, ImageBackground } from 'react-native';
import SendReport from './hooks/SendReport';
import { app_bg_01, img_success } from '@src/assets/images';

export const SendReportTemplate = () => {
    const {
        handlePressImprimirPDF,
        handlePress
    } = SendReport({});

    return (
        <View style={[sG.container]}>
            <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]}>
                <ImageBackground style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]} source={app_bg_01}>
                    <View style={[sG.h_60, sG.w_90, sG.ai_center, sG.jc_center, sG.bg_white, sG.card_shadow, sG.brounded]}>
                        <View style={[sG.h_35, sG.w_100, sG.ai_center, sG.jc_center]}>
                            <ImageBackground resizeMode='contain' style={[sG.h_60, sG.w_100, sG.ai_center, sG.jc_center]} source={img_success} />
                        </View>
                        <View style={[sG.h_25, sG.w_100, sG.ai_center, sG.jc_end]}>
                            <Text style={[sG.h5, sG.text_center, sG.bold]}>Hemos Enviado{'\n'}tu Reporte</Text>
                            <Text style={[sG.h7, sG.text_center, sG.text_gray_light]}></Text>
                            <Text style={[sG.h8, sG.text_center, sG.text_gray_light]}>Recuerda que puedes consultarlo{'\n'}desde nuestra plataforma</Text>
                        </View>
                        <View style={[sG.h_10, sG.w_100, sG.ai_center, sG.jc_center]}>
                            <TouchableOpacity style={[sG.h_80, sG.w_80, sG.ai_center, sG.jc_end]} onPress={handlePressImprimirPDF}>
                                <Text style={[sG.h7, sG.bold, sG.text_primary, sG.underline]}>Ver reporte</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[sG.h_30, sG.w_100, sG.ai_center, sG.jc_center]}>
                            <TouchableOpacity style={[sG.h_50, sG.w_80, sG.ai_center, sG.jc_center, sG.bg_primary, sG.brounded]} onPress={handlePress}>
                                <Text style={[sG.h7, sG.bold, sG.text_white]}>Entendido</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}