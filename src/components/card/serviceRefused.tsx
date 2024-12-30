import { Component } from 'react';
import { Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { sG } from '@src/globals/styles/styles';

interface ServiceRefusedProps {
    id: string;
    nombre: string;
    horaRecogida: string;
    estadoAssing: 'Rechazado' | string;
    Novedad?: string;
}

export default class ServiceRefused extends Component<ServiceRefusedProps> {
    render() {
        return (
            <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center]}>
                {this.props.estadoAssing === 'Rechazado' ?
                    <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center, sG.border_red, sG.brounded]}>
                        <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <AntDesign name="closecircle" style={[sG.size_icon, sG.text_red]} />
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}></View>
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
                                <Text style={[sG.h8, sG.text_red, sG.bold]}>{this.props.estadoAssing}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_25, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Novedad:</Text>
                            </View>
                            <View style={[sG.w_75, sG.ai_end, sG.jc_center]}>
                                {this.props.Novedad ?
                                    <Text style={[sG.h8, sG.text_gray_light]}>{this.props.Novedad}</Text>
                                    :
                                    <Text style={[sG.h8, sG.text_gray_light]}>Sin novedades</Text>
                                }
                            </View>
                        </View>
                    </View>
                    :
                    <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center, sG.border_orange, sG.brounded]}>
                        <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <AntDesign name="closecircle" style={[sG.size_icon, sG.text_orange]} />
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}></View>
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
                                <Text style={[sG.h8, sG.text_orange, sG.bold]}>{this.props.estadoAssing}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_90, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_25, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Novedad:</Text>
                            </View>
                            <View style={[sG.w_75, sG.ai_end, sG.jc_center]}>
                                {this.props.Novedad ?
                                    <Text style={[sG.h8, sG.text_gray_light]}>{this.props.Novedad}</Text>
                                    :
                                    <Text style={[sG.h8, sG.text_gray_light]}>Sin novedades</Text>
                                }
                            </View>
                        </View>
                    </View>
                }
            </View>
        );
    }
}
