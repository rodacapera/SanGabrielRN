import { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { sG } from '@src/globals/styles/styles';

interface ServiceProps {
    estadoAssing: string;
    id: string;
    nombre: string;
    horaRecogida: string;
    estadoServicio: string;
    hasNovelty: { novedad: boolean }
    item: any;
    handlePressDetails: any;
    handlePressChat: (novelty: any, id: string) => void;
    visibleNovedades: (id: string, estadoServicio: string, hasNovelty: boolean, item: any) => void;
}

export default class ServiceOngoing extends Component<ServiceProps> {
    render() {
        return (
            <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center, sG.border_secondary, sG.brounded]}>
                <TouchableOpacity style={[sG.h_80, sG.w_100, sG.ai_center, sG.jc_center]} onPress={() => this.props.handlePressDetails(this.props.id)}>
                    <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_20, sG.jc_center]}>
                            <MaterialCommunityIcons name="camera-timer" style={[sG.size_icon, sG.text_secondary]} />
                        </View>
                        <View style={[sG.w_80, sG.jc_end, sG.ai_center, sG.chrow]}>
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>Reportar Novedad </Text>
                            <MaterialCommunityIcons name="chevron-right-circle" style={[sG.size_icon, sG.text_primary]} />
                            </View>
                    </View>
                    <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_40, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Id Servicio:</Text>
                        </View>
                        <View style={[sG.w_60, sG.ai_end, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light]}>{this.props.id}</Text>
                        </View>
                    </View>
                    <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_40, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Nombre Usuario:</Text>
                        </View>
                        <View style={[sG.w_60, sG.ai_end, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light]}>{this.props.nombre}</Text>
                        </View>
                    </View>
                    <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_50, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Hora Recogida:</Text>
                        </View>
                        <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light]}>{this.props.horaRecogida.slice(11, 16)}</Text>
                        </View>
                    </View>
                    <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                        <View style={[sG.w_50, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Estado Servicio:</Text>
                        </View>
                        <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                            <Text style={[sG.h8, sG.text_secondary, sG.bold]}>{this.props.estadoAssing}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {this.props.hasNovelty.novedad ?
                    <TouchableOpacity style={[sG.h_20, sG.w_100, sG.ai_center, sG.jc_center, sG.bg_secondary]} onPress={() => this.props.handlePressChat(this.props.hasNovelty, this.props.id)}>
                        <Text style={[sG.h8, sG.text_white, sG.bold]}>Ver Novedad</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[sG.h_20, sG.w_100, sG.ai_center, sG.jc_center, sG.bg_secondary]} onPress={() => this.props.visibleNovedades(this.props.id, this.props.estadoServicio, this.props.hasNovelty === null ? false : true, this.props.item)}>
                        <Text style={[sG.h8, sG.text_white, sG.bold]}>Reportar Novedad</Text>
                    </TouchableOpacity>
                }
            </View>
        );
    }
}
