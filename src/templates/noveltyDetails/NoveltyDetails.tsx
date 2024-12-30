import { sG } from '@src/globals/styles/styles';
import { TouchableOpacity, Text, View, ActivityIndicator, KeyboardAvoidingView, ScrollView, ImageBackground, TextInput, FlatList, Image } from 'react-native';
import NoveltyDetails from './hooks/NoveltyDetails';
import { btn_back } from '@src/assets/images';
import moment from 'moment';
import { ConfigConstants } from '@src/globals/config/config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomSheet } from 'react-native-btr';

export const NoveltyDetailsTemplate = () => {
    const {
        message,
        setMessage,
        loadingModal,
        setLoadingModal,
        visibleMenu,
        setVisibleMenu,
        isLoading,
        setIsLoading,
        sendLoading,
        setSendLoading,
        fecha,
        setFecha,
        textWhatsapp,
        setTextWhatsapp,
        validateService,
        setValidateService,
        estadoServicio,
        setEstadoServicio,
        idServicio,
        setIdServicio,
        solicitud,
        setSolicitud,
        tipoRuta,
        setTipoRuta,
        tipoProcedimiento,
        setTipoProcedimiento,
        categoriaPasajero,
        setCategoriaPasajero,
        medio,
        setMedio,
        observacionesPasajero,
        setObservacionesPasajero,
        nombreUsuario,
        setNombreUsuario,
        tipoDocumentoUsuario,
        setTipoDocumentoUsuario,
        numeroDocumentoUsuario,
        setNumeroDocumentoUsuario,
        cliente,
        setCliente,
        telefono1Usuario,
        setTelefono1Usuario,
        telefono2Usuario,
        setTelefono2Usuario,
        phoneNumberWhatsapp,
        setPhoneNumberWhatsapp,
        horaRecogida,
        setHoraRecogida,
        municipioRecogida,
        setMunicipioRecogida,
        origenRecogida,
        setOrigenRecogida,
        direccionRecogida,
        setDireccionRecogida,
        latOrigen,
        setLatOrigen,
        lngOrigen,
        setLngOrigen,
        horaCita,
        setHoraCita,
        municipioCita,
        setMunicipioCita,
        destinoCita,
        setDestinoCita,
        direccionCita,
        setDireccionCita,
        latDestino,
        setLatDestino,
        lngDestino,
        setLngDestino,
        observaciones,
        setObservaciones,
        observacionesOperador,
        setObservacionesOperador,
        nombreAcompanante,
        setNombreAcompanante,
        telefonoAcompanante,
        setTelefonoAcompanante,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        isNew,
        setIsNew,
        saveChat,
        setSaveChat,
        isCompletyClosed,
        setIsCompletyClosed,
        isNewNovelty,
        setIsNewNovelty,
        visibleMedia,
        setVisibleMedia,
        modalPreview,
        setModalPreview,
        dataChat,
        setDataChat,
        selectedImage,
        setSelectedImage,
        itemService,
        setItemService,
        isPreReOpenNovelty,
        setIsPreReOpenNovelty,
        handlePressBack,
        handlePressPreoperatively,
        toggleBottomNavigationView,
        handlePreOpenNovelty,
        openCamera,
        sendMessage,
        handlePressImage,
        openImagePickerAsync,
        handleModalPreview,
        sendMessageImage,
        handleInputChange
    } = NoveltyDetails({});

    return (
        <View style={[sG.bg_primary]}>
            <KeyboardAvoidingView>
                <ScrollView scrollEnabled={false}>

                    <View style={[sG.w_100, sG.row_25, sG.jc_center, sG.ai_center, sG.bg_light]}>
                        <View style={[sG.w_100, sG.h_100, sG.jc_center, sG.ai_center, sG.bg_white]}>
                            <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.chrow]}>
                                <View style={[sG.w_15, sG.h_100, sG.jc_center, sG.ai_end]}>
                                    <TouchableOpacity style={[sG.w_70, sG.h_70, sG.jc_center, sG.ai_center]} onPress={handlePressBack}>
                                        <ImageBackground
                                            resizeMode='contain'
                                            style={[sG.h_100, sG.w_100]} source={btn_back}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={[sG.w_70, sG.h_100, sG.jc_center, sG.ai_center]}>
                                    <Text style={[sG.h7, sG.bold]}>Detalle de Novedad {itemService ? itemService?.id : ''}</Text>
                                    <Text style={[sG.h8]}>Servicio No: {itemService ? itemService?.servicio : ''}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[sG.w_100, sG.row_25, sG.jc_center, sG.ai_center, sG.bg_light]}>
                        <View style={[sG.w_100, sG.h_100, sG.jc_center, sG.ai_center, sG.border, sG.bg_white, sG.border, sG.brounded_bottom]}>
                            <View style={[sG.w_90, sG.h_100, sG.jc_center, sG.ai_center, sG.chrow]}>
                                <View style={[sG.w_45, sG.h_100, sG.jc_center, sG.ai_center]}>
                                    <View style={[sG.w_100, sG.h_25, sG.jc_center]}>
                                        <Text style={[sG.h8, sG.bold]}>Estado del servicio:</Text>
                                    </View>
                                    <View style={[sG.w_100, sG.h_25, sG.jc_center]}>
                                        <Text style={[sG.h8, sG.bold]}>Nombre del usuario:</Text>
                                    </View>
                                    <View style={[sG.w_100, sG.h_45, sG.jc_start]}>
                                        <Text style={[sG.h8, sG.bold]}>Origen - Destino:</Text>
                                    </View>
                                </View>

                                <View style={[sG.w_55, sG.h_100, sG.jc_center, sG.ai_center]}>
                                    <View style={[sG.w_100, sG.h_25, sG.jc_center]}>
                                        <Text style={[sG.h8,]}>{itemService ? itemService?.estado_servicio : ''}</Text>
                                    </View>
                                    <View style={[sG.w_100, sG.h_25, sG.jc_center]}>
                                        <Text style={[sG.h8,]}>{itemService ? itemService?.pasajero_nombre : ''}</Text>
                                    </View>
                                    <View style={[sG.w_100, sG.h_45, sG.jc_start]}>
                                        <Text style={[sG.h8,]}>{itemService ? itemService?.origen : ''} → {itemService ? itemService?.destino : ''}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[sG.w_100, sG.row_120, sG.jc_center, sG.ai_center, sG.brounded_bottom, sG.bg_light]}>
                        <View style={[sG.w_90, sG.h_95, sG.jc_center, sG.ai_center]}>
                            <FlatList
                                data={dataChat}
                                inverted={true}
                                //enableEmptySections={true}
                                style={[sG.w_100]}
                                keyExtractor={item => item.id}
                                renderItem={({ item, index }) => (
                                    <>
                                        {item.rol === "7" ?
                                            <View key={index} style={[sG.w_100, sG.ai_end, sG.p_b_xs]}>
                                                <View style={[sG.w_75, sG.ai_center, sG.jc_center, sG.border, sG.brounded]}>
                                                    <View style={[sG.w_90, sG.ai_end, sG.m_xs]}>

                                                        <View style={[sG.w_95, sG.ai_center, sG.chrow, sG.jc_end, { paddingBottom: 5 }]}>
                                                            <View style={[sG.w_55, sG.jc_end, sG.chrow]}>
                                                                <Text style={[sG.h8, sG.text_primary, sG.bold]}>{item.transmitter_nombre}  </Text>
                                                                <FontAwesome name="user" style={[sG.size_icon_xs, sG.text_primary]} />
                                                            </View>
                                                        </View>

                                                        {item.image != null && item.image != "" &&
                                                            <View style={[sG.w_95]}>
                                                                <ImageBackground
                                                                    resizeMode='contain'
                                                                    style={[sG.w_100, { paddingBottom: 85, paddingTop: 85 }]}
                                                                    source={{ uri: ConfigConstants.webServiceName + item.image }}
                                                                />
                                                            </View>
                                                        }

                                                        <View style={[sG.w_95, sG.ai_end, { paddingTop: 8 }]}>
                                                            <Text style={[sG.h8, sG.text_gray_light, sG.bold, { textAlign: 'justify' }]}>{item.content}</Text>
                                                        </View>

                                                        <View style={[sG.w_95, sG.ai_center, sG.chrow, sG.jc_end, { paddingTop: 12 }]}>
                                                            <View style={[sG.w_50, sG.ai_end]}>
                                                                <Text style={[sG.text_gray_light, { fontSize: 11 }]}>{item.date ? moment(item.date).format('DD-MM-YYYY HH:mm') : ''}</Text>
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                            :
                                            <View key={index} style={[sG.w_100, sG.p_b_xs]}>
                                                <View style={[sG.w_75, sG.ai_center, sG.border, sG.brounded, sG.bg_white]}>
                                                    <View style={[sG.w_90, sG.ai_center, sG.m_xs]}>

                                                        <View style={[sG.w_95, sG.ai_center, sG.chrow, { paddingBottom: 5 }]}>
                                                            <View style={[sG.w_100, sG.ai_center, sG.chrow]}>
                                                                <FontAwesome name="user" style={[sG.size_icon_xs, sG.text_primary]} />
                                                                <Text style={[sG.h8, sG.text_primary, sG.bold]}> {item.transmitter_nombre}</Text>
                                                            </View>
                                                        </View>

                                                        {item.image != null && item.image != "" &&
                                                            <View style={[sG.w_95]}>
                                                                <ImageBackground
                                                                    resizeMode='contain'
                                                                    style={[sG.w_100, { paddingBottom: 85, paddingTop: 85 }]}
                                                                    source={{ uri: ConfigConstants.webServiceName + item.image }}
                                                                />
                                                            </View>
                                                        }

                                                        <View style={[sG.w_95, { paddingTop: 8 }]}>
                                                            <Text style={[sG.h8, sG.text_gray_light, sG.bold, { textAlign: 'justify' }]}>{item.content}</Text>
                                                        </View>

                                                        <View style={[sG.w_95, sG.ai_center, sG.chrow, sG.jc_start, { paddingTop: 12 }]}>
                                                            <View style={[sG.w_50, sG.ai_start]}>
                                                                <Text style={[sG.text_gray_light, { fontSize: 11 }]}>{item.date ? moment(item.date).format('DD-MM-YYYY HH:mm') : ''}</Text>
                                                            </View>
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        }
                                    </>
                                )}
                            />
                        </View>
                    </View>

                    <View style={[sG.w_100, sG.row_30, sG.jc_center, sG.ai_center, sG.chrow]}>
                        <View style={[sG.w_75, sG.h_90, sG.jc_center, sG.ai_center, sG.brounded, sG.bg_light, sG.border]}>
                            <TextInput
                                multiline={true}
                                style={[sG.h_80, sG.w_95, sG.jc_center, sG.text_white, sG.h8]}
                                placeholder='Hacer comentario'
                                placeholderTextColor='#bdbdbd'
                                value={message}
                                color='#000000'
                                onChangeText={(text) => handleInputChange(text, "message")}
                            />
                        </View>
                        <View style={[sG.w_15, sG.h_90, sG.jc_center, sG.ai_center]}>
                            <TouchableOpacity style={[sG.w_90, sG.h_50, sG.jc_center, sG.ai_center]} onPress={handlePressImage}>
                                <MaterialIcons name="add-photo-alternate" style={[sG.size_icon_md, sG.text_white]} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[sG.w_90, sG.h_50, sG.jc_center, sG.ai_center]} onPress={() => isPreReOpenNovelty === true ? handlePreOpenNovelty : sendMessage(itemService ? itemService?.id : '')}>
                                <FontAwesome name="send" style={[sG.size_icon_md, sG.text_white]} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            <BottomSheet
                visible={visibleMedia}
                //setting the visibility state of the bottom shee
                onBackButtonPress={handlePressImage}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={handlePressImage}
            //Toggling the visibility state on the clicking out side of the sheet
            >
                {/*Bottom Sheet inner View*/}
                <View style={[sG.bg_white, sG.w_100, sG.h_30, sG.jc_center, sG.ai_center, sG.brounded_top]}>
                    <View style={[sG.w_85, sG.h_90]}>

                        <TouchableOpacity style={[sG.w_100, sG.h_40, sG.ai_center, sG.jc_center, sG.border_bottom, sG.chrow]} onPress={openCamera}>
                            <View style={[sG.w_20, sG.h_90, sG.ai_center, sG.jc_center]}>
                                <MaterialIcons name="camera-alt" style={[sG.size_icon_md, sG.text_black]} />
                            </View>
                            <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.p_l_xs]}>
                                <Text style={[sG.h7, sG.bold, sG.text_black]}>Abrir Cámara</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[sG.w_100, sG.h_40, sG.ai_center, sG.jc_center, sG.border_bottom, sG.chrow]} onPress={() => openImagePickerAsync()}>
                            <View style={[sG.w_20, sG.h_90, sG.ai_center, sG.jc_center]}>
                                <MaterialIcons name="photo-library" style={[sG.size_icon_md, sG.text_black]} />
                            </View>
                            <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.p_l_xs]}>
                                <Text style={[sG.h7, sG.bold, sG.text_black]}>Abrir Galería</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </BottomSheet>

            <BottomSheet
                visible={modalPreview}
                //setting the visibility state of the bottom shee
                onBackButtonPress={handlePressImage}
                //Toggling the visibility state on the click of the back botton
                onBackdropPress={handlePressImage}
            //Toggling the visibility state on the clicking out side of the sheet
            >
                {/*Bottom Sheet inner View*/}
                <View style={[sG.bg_white, sG.w_100, sG.h_100, sG.jc_center, sG.ai_center]}>

                    <View style={[sG.w_100, sG.h_10, sG.jc_center, sG.border_bottom]}>
                        <View style={[sG.w_15, sG.h_100, sG.jc_center, sG.ai_end]}>
                            <TouchableOpacity style={[sG.w_70, sG.h_70, sG.jc_center, sG.ai_center]} onPress={handleModalPreview}>
                                <ImageBackground
                                    resizeMode='contain'
                                    style={[sG.h_100, sG.w_100]} source={btn_back}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[sG.w_100, sG.h_75, sG.jc_center]}>
                        <View style={[sG.w_98, sG.h_95, sG.jc_center]}>
                            <Image resizeMode='contain' source={{ uri: selectedImage }} style={[sG.h_100, sG.w_100]} />
                        </View>
                    </View>

                    <View style={[sG.w_100, sG.h_15, sG.jc_center, sG.ai_center, sG.chrow, sG.bg_primary]}>
                        <View style={[sG.w_75, sG.h_90, sG.jc_center, sG.ai_center, sG.brounded, sG.bg_light, sG.border]}>
                            <TextInput
                                multiline={true}
                                style={[sG.h_80, sG.w_95, sG.jc_center, sG.text_white, sG.h8]}
                                placeholder='Hacer comentario'
                                placeholderTextColor='#bdbdbd'
                                value={message}
                                color='#000'
                                onChangeText={(text) => handleInputChange(text, "message")}
                            />
                        </View>
                        <View style={[sG.w_15, sG.h_90, sG.jc_center, sG.ai_center]}>
                            <TouchableOpacity style={[sG.w_90, sG.h_50, sG.jc_center, sG.ai_center]} onPress={() => sendMessageImage(itemService ? itemService?.id : '')}>
                                <FontAwesome name="send" style={[sG.size_icon_md, sG.text_white]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BottomSheet>

        </View >
    );
};