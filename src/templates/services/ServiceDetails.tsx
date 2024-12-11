import { TouchableOpacity, Text, View, ImageBackground, ScrollView, ActivityIndicator } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { sG } from '@src/globals/styles/styles';
import { btn_back } from '@src/assets/images';
import ServicesDetails from './hooks/ServiceDetails';

export const ServicesDetailsTemplate = () => {
    const {
        loadingModal,
        visibleMenu,
        isLoading,
        sendLoading,
        id,
        fecha,
        statusServicio,
        textWhatsapp,
        validateService,
        estadoServicio,
        idServicio,
        solicitud,
        tipoRuta,
        tipoProcedimiento,
        categoriaPasajero,
        medio,
        observacionesPasajero,
        nombreUsuario,
        tipoDocumentoUsuario,
        numeroDocumentoUsuario,
        cliente,
        telefono1Usuario,
        telefono2Usuario,
        phoneNumberWhatsapp,
        horaRecogida,
        municipioRecogida,
        origenRecogida,
        direccionRecogida,
        latOrigen,
        lngOrigen,
        horaCita,
        municipioCita,
        destinoCita,
        direccionCita,
        latDestino,
        lngDestino,
        observaciones,
        observacionesOperador,
        nombreAcompanante,
        telefonoAcompanante,
        latitude,
        longitude,
        handlePressBack,
        handlePhone,
        handlePhoneTwo,
        handleWhatsapp,
        handlePressImprimirPDF,
        toggleBottomNavigationView,
        handlePressReport,
        handlePressReassign,
        handlePressReportObsFinished,
        handlePressStateService,
        handlePressDecline,
        handlePressPreoperatively,
        handlePressEnviar
    } = ServicesDetails({});

    return (
        <View style={[sG.container, sG.bg_primary]}>
            <View style={[sG.w_100, sG.h_15, sG.jc_end, sG.ai_center, sG.bg_light]}>
                <View style={[sG.w_100, sG.h_100, sG.jc_end, sG.ai_center, sG.border, sG.brounded_bottom, sG.bg_white]}>
                    <View style={[sG.w_100, sG.h_70, sG.ai_center, sG.chrow]}>
                        <View style={[sG.w_15, sG.h_100, sG.jc_center, sG.ai_end]}>
                            <TouchableOpacity style={[sG.w_70, sG.h_70, sG.jc_center, sG.ai_center]} onPress={handlePressBack}>
                                <ImageBackground
                                    resizeMode='contain'
                                    style={[sG.h_100, sG.w_100]} source={btn_back}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[sG.w_70, sG.h_100, sG.jc_center, sG.ai_center]}>
                            <Text style={[sG.h7, sG.bold]}>Detalle de tu Servicio</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[sG.w_100, sG.h_70, sG.jc_center, sG.ai_center, sG.brounded_bottom, sG.bg_light]}>
                <View style={[sG.w_90, sG.h_90, sG.jc_center, sG.ai_center]}>
                    <ScrollView>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.p_b_xs_intro]}>
                            <View style={[sG.w_100, sG.ai_center, sG.chrow]}>
                                <FontAwesome name="book" style={[sG.size_icon, sG.text_primary]} />
                                <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Datos Generales</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Id servicio:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{idServicio}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Número solicitud:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{solicitud}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Tipo ruta:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{tipoRuta}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs, sG.border_bottom]}>
                            <View style={[sG.w_40, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Procedimiento:</Text>
                            </View>
                            <View style={[sG.w_60, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{tipoProcedimiento}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.chrow, sG.p_b_xs_intro, sG.p_t_xs]}>
                            <FontAwesome name="user" style={[sG.size_icon, sG.text_primary]} />
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Datos Usuario</Text>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_25, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Nombre:</Text>
                            </View>
                            <View style={[sG.w_75, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{nombreUsuario}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_30, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Cliente:</Text>
                            </View>
                            <View style={[sG.w_70, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{cliente}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_40, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Criticidad:</Text>
                            </View>
                            <View style={[sG.w_60, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{categoriaPasajero}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_40, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Medio de apoyo:</Text>
                            </View>
                            <View style={[sG.w_60, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{medio}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]} onPress={handlePhone}>
                            <View style={[sG.w_50, sG.ai_center, sG.chrow]}>
                                <FontAwesome name="phone" style={[sG.size_icon, sG.text_primary]} />
                                <Text style={[sG.h8, sG.text_secondary, sG.bold]}>  Teléfono 1:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_secondary]}>{telefono1Usuario}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]} onPress={handlePhoneTwo}>
                            <View style={[sG.w_50, sG.ai_center, sG.chrow]}>
                                <FontAwesome name="phone" style={[sG.size_icon, sG.text_primary]} />
                                <Text style={[sG.h8, sG.text_secondary, sG.bold]}>  Teléfono 2:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_secondary]}>{telefono2Usuario}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs, sG.border_bottom]} onPress={handleWhatsapp}>
                            <View style={[sG.w_50, sG.ai_center, sG.chrow]}>
                                <FontAwesome name="whatsapp" style={[sG.size_icon, sG.text_primary]} />
                                <Text style={[sG.h8, sG.text_secondary, sG.bold]}>  Whatsapp:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_secondary]}>{telefono1Usuario}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[sG.w_100, sG.ai_center, sG.chrow, sG.p_b_xs_intro, sG.p_t_xs]}>
                            <FontAwesome name="book" style={[sG.size_icon, sG.text_primary]} />
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Observaciones</Text>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs, sG.border_bottom]}>
                            <View style={[sG.w_100, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{observacionesPasajero}  -/-  {observaciones}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.chrow, sG.p_b_xs_intro, sG.p_t_xs]}>
                            <FontAwesome name="map-marker" style={[sG.size_icon, sG.text_primary]} />
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Origen</Text>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Hora recogida:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{horaRecogida.slice(11, 16) || ''}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Municipio:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{municipioRecogida}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Origen:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{origenRecogida}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs, sG.border_bottom]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Dirección:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{direccionRecogida}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.chrow, sG.p_b_xs_intro, sG.p_t_xs]}>
                            <FontAwesome name="map-marker" style={[sG.size_icon, sG.text_primary]} />
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Destino</Text>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Hora cita:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{horaCita.slice(11, 16) || ''}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Municipio:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{municipioCita}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Destino:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{destinoCita}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs, sG.border_bottom]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Dirección:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{direccionCita}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.chrow, sG.p_b_xs_intro, sG.p_t_xs]}>
                            <FontAwesome name="user" style={[sG.size_icon, sG.text_primary]} />
                            <Text style={[sG.h8, sG.text_primary, sG.bold]}>  Datos Acompañante</Text>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow, sG.p_b_xs_intro]}>
                            <View style={[sG.w_25, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Nombre:</Text>
                            </View>
                            <View style={[sG.w_75, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{nombreAcompanante}</Text>
                            </View>
                        </View>
                        <View style={[sG.w_100, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_50, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light, sG.bold]}>Teléfono:</Text>
                            </View>
                            <View style={[sG.w_50, sG.ai_end, sG.jc_center]}>
                                <Text style={[sG.h8, sG.text_gray_light]}>{telefonoAcompanante}</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={[sG.w_100, sG.h_15, sG.jc_center, sG.ai_center]}>
                {sendLoading ?
                    <View style={[sG.w_80, sG.h_50, sG.jc_center, sG.ai_center]}>
                        <ActivityIndicator size="large" color="#ffffff" />
                    </View>
                    :
                    estadoServicio === 22 ?
                        <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.chrow]}>
                            <View style={[sG.w_50, sG.h_50, sG.jc_center, sG.ai_center]}>
                                <TouchableOpacity style={[sG.w_90, sG.h_100, sG.ai_center, sG.jc_center, sG.broundedmax, sG.chrow, sG.bg_white]} onPress={handlePressStateService}>
                                    <MaterialIcons name="check" style={[sG.size_icon, sG.text_primary]} />
                                    <Text style={[sG.h7, sG.bold, sG.text_primary]}>  Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[sG.w_50, sG.h_50, sG.ai_center, sG.jc_center]}>
                                <TouchableOpacity style={[sG.w_95, sG.h_100, sG.ai_center, sG.jc_center, sG.broundedmax, sG.chrow, sG.bg_red]} onPress={handlePressDecline}>
                                    <MaterialIcons name="close" style={[sG.size_icon, sG.text_white]} />
                                    <Text style={[sG.h7, sG.bold, sG.text_white]}>  Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : estadoServicio === 4 || estadoServicio === 24 ?
                            <TouchableOpacity style={[sG.w_80, sG.h_50, sG.jc_center, sG.ai_center, sG.broundedmax, sG.bg_white, sG.chrow]} onPress={handlePressImprimirPDF}>
                                <MaterialIcons name="local-printshop" style={[sG.size_icon, sG.text_primary]} />
                                <Text style={[sG.h7, sG.bold, sG.text_primary]}>  Ver Cierre</Text>
                            </TouchableOpacity>
                            : estadoServicio === 6 ?
                                <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.chrow]}>
                                    <View style={[sG.w_40, sG.h_50, sG.jc_center, sG.ai_center]}>
                                        <TouchableOpacity style={[sG.w_95, sG.h_100, sG.jc_center, sG.ai_center, sG.broundedmax, sG.bg_white, sG.chrow]} onPress={handlePressImprimirPDF}>
                                            <MaterialIcons name="local-printshop" style={[sG.size_icon, sG.text_primary]} />
                                            <Text style={[sG.h7, sG.bold, sG.text_primary]}>  Ver Cierre</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[sG.w_60, sG.h_50, sG.ai_center, sG.jc_center]}>
                                        <TouchableOpacity style={[sG.w_95, sG.h_100, sG.jc_center, sG.ai_center, sG.broundedmax, sG.bg_white, sG.chrow]} onPress={handlePressReportObsFinished}>
                                            <MaterialIcons name="sticky-note-2" style={[sG.size_icon, sG.text_primary]} />
                                            <Text style={[sG.h7, sG.bold, sG.text_primary]}> Agregar Observación</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                : estadoServicio === 23 ?
                                    <TouchableOpacity style={[sG.w_80, sG.h_50, sG.jc_center, sG.ai_center, sG.broundedmax, sG.bg_white, sG.chrow]} onPress={toggleBottomNavigationView}>
                                        <Text style={[sG.h6, sG.bold, sG.text_secondary]}>Continuar</Text>
                                    </TouchableOpacity>
                                    : estadoServicio === 5 ?
                                        <TouchableOpacity style={[sG.w_80, sG.h_50, sG.jc_center, sG.ai_center, sG.broundedmax, sG.bg_white, sG.chrow]} onPress={handlePressEnviar}>
                                            <Text style={[sG.h6, sG.bold, sG.text_secondary]}>Finalizar servicio</Text>
                                        </TouchableOpacity>
                                        : null
                }
            </View>

            <BottomSheet
                visible={visibleMenu}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
            >
                {/* {/Bottom Sheet inner View/} */}

                <View style={[sG.h_30, sG.w_100, sG.ai_center, sG.jc_center, sG.bg_white, sG.brounded_top]}>
                    <View style={[sG.ai_center, sG.h_90, sG.w_90, sG.jc_center]}>
                        {loadingModal ?
                            <ActivityIndicator size="large" color="#3ec7a9" />
                            :
                            <ScrollView>
                                <TouchableOpacity style={[sG.ai_end, sG.jc_center, sG.row_15, sG.w_100]} onPress={toggleBottomNavigationView}>
                                    <MaterialCommunityIcons name="close-circle" style={[sG.size_icon, sG.text_red, sG.p_r_xs]} />
                                </TouchableOpacity>
                                {!validateService ?
                                    <TouchableOpacity style={[sG.ai_center, sG.jc_center, sG.row_20, sG.w_100]} onPress={handlePressPreoperatively}>
                                        <View style={[sG.ai_center, sG.h_90, sG.w_90, sG.border_bottom, sG.chrow]}>
                                            <FontAwesome name="play" style={[sG.size_icon, sG.text_black]} />
                                            <Text style={[sG.h8, sG.bold, sG.text_black, sG.m_l_xs]}>Iniciar Servicio</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <View style={[sG.ai_center, sG.jc_center, sG.row_20, sG.w_100]}>
                                        <View style={[sG.ai_center, sG.h_90, sG.w_90, sG.border_bottom, sG.chrow]}>
                                            <FontAwesome name="ban" style={[sG.size_icon, sG.text_red]} />
                                            <Text style={[sG.h8, sG.bold, sG.text_red, sG.m_l_xs]}>¡No será posible iniciar este el servicio!</Text>
                                        </View>
                                    </View>
                                }
                                <TouchableOpacity style={[sG.ai_center, sG.jc_center, sG.row_20, sG.w_100]} onPress={handlePressReassign}>
                                    <View style={[sG.ai_center, sG.h_90, sG.w_90, sG.border_bottom, sG.chrow]}>
                                        <MaterialCommunityIcons name="clipboard-edit-outline" style={[sG.size_icon, sG.text_black]} />
                                        <Text style={[sG.h8, sG.bold, sG.text_black, sG.m_l_xs]}>Reasignar Servicio</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        }
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}