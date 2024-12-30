import { sG } from '@src/globals/styles/styles';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Signature from './hooks/Signature';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignatureScreen from 'react-native-signature-canvas';

export const SignatureTemplate = () => {
    const {
        sendLoading,
        signatureCapturedEmpty,
        signaturePadChange,
        handlePressSend,
        signatureRef,
        setsignatureCapturedEmpty
    } = Signature({});

    const handleOK = (signature: string) => {
        signaturePadChange(signature);
    };

    const handleEnd = () => {
        signatureRef.current.readSignature();
    };

    return (
        <SafeAreaView style={[sG.container, sG.bg_gray_light]}>
            <View style={[sG.w_100, sG.h_90, sG.jc_center, sG.ai_center]}>
                <View style={[sG.w_100, sG.h_35]}>
                    <SignatureScreen
                        ref={signatureRef}
                        onOK={handleOK}
                        onEnd={handleEnd}
                        //onClear={handleClear} 
                        descriptionText="Firma Cliente"
                        clearText="Borrar firma"
                        confirmText="Guardar firma"
                        backgroundColor="rgba(255,255,255,0)" // Fondo transparente
                        penColor="black" // Color del lápiz
                    />
                </View>
                <View style={[sG.w_100, sG.h_5, sG.ai_center, sG.jc_center, sG.bg_white]}>
                    <View style={[sG.w_90, sG.h_95]}>
                        <Text style={[sG.h8, sG.bold, sG.text_gray]}>Firma Cliente</Text>
                    </View>
                </View>
                <View style={[sG.w_100, sG.h_10, sG.ai_end, sG.jc_center]}>
                    <TouchableOpacity
                        style={[sG.w_50, sG.h_95, sG.ai_center, sG.jc_center, sG.bg_primary]}
                        onPress={() => { signatureRef?.current?.clearSignature(); }}
                    >
                        <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Borrar firma</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {signatureCapturedEmpty ?
                <View style={[sG.w_100, sG.h_10, sG.jc_end, sG.ai_center]}>
                    {sendLoading ?
                        <View style={[sG.w_100, sG.h_90, sG.jc_center, sG.ai_center, sG.bg_primary]}>
                            <ActivityIndicator size="large" color="#fff" />
                        </View>
                        :
                        <TouchableOpacity style={[sG.w_100, sG.h_90, sG.jc_center, sG.ai_center, sG.bg_primary, sG.chrow]} onPress={handlePressSend}>
                            <FontAwesome name="play" style={[sG.size_icon, sG.text_white]} />
                            <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>  Finalizar Servicio</Text>
                        </TouchableOpacity>
                    }
                </View>
                :
                <View style={[sG.w_100, sG.h_10, sG.jc_end, sG.ai_center]}>
                    <View style={[sG.w_100, sG.h_90, sG.jc_center, sG.ai_center, sG.bg_primary, sG.chrow]}>
                        <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Debe firmar para continuar</Text>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
};