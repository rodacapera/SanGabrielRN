import { sG } from '@src/globals/styles/styles';
import { TouchableOpacity, Text, View,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
   
export const SignatureTemplate = () => {

    return (
        <SafeAreaView style={[sG.container, sG.bg_gray_light]}>
        <View style={[sG.w_100, sG.h_90, sG.jc_center, sG.ai_center]}>
            <View style={[sG.w_100, sG.h_35]}>
              
            </View>
            <View style={[sG.w_100, sG.h_5, sG.ai_center, sG.jc_center, sG.bg_white]}>
               
            </View>
            <View style={[sG.w_100, sG.h_10, sG.ai_end, sG.jc_center]}>
                <TouchableOpacity style={[sG.w_50, sG.h_95, sG.ai_center, sG.jc_center, sG.bg_primary]}>
                    <Text style={[sG.h7, sG.bold, sG.text_center, sG.text_white]}>Borrar firma</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
    );
}