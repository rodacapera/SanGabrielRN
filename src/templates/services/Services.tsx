import { TouchableOpacity, Text, View, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomSheet } from 'react-native-btr';
import { sG } from '@src/globals/styles/styles';
import ServicesList from './hooks/Services';
import { btn_back, logo_color_app } from '@src/assets/images';
import CalendarPicker from 'react-native-calendar-picker';
import ServiceReleased from '@src/components/card/ServiceReleased';
import ServiceAccepted from '@src/components/card/serviceAccepted';
import ServiceOngoing from '@src/components/card/serviceOngoing';

export const Services = () => {
  const {
    visible,
    isLoading,
    dataSource,
    dataLoading,
    verifyVersion,
    selectedStartDate,
    visibleNovedades,
    dataCategories,
    dataSubCategories,
    dataNovelty,
    visibleCategories,
    visibleSubCategories,
    visibleNovelty,
    categoryIdSelected,
    subCategoryIdSelected,
    noveltyIdSelected,
    categoryNameSelected,
    subCategoryNameSelected,
    noveltyNameSelected,
    serviceIdReport,
    loadingReport,
    stateService,

    handlePressOngoing,
    handlePressDetails,
    visibleNovedadesHandler,
    closeVisibleNovedades,
    handlePressBack,
    visibleCalendar,
    onDateChange,
    AppInGoogle,
    reload,
    openCategories,
    openSubCategories,
    openNovelties,
    handleChangeCategory,
    handleChangeSubCategory,
    handleChangeNovelty,
    handleBackModal,
    handlePressNoveltyDetails,
    handlePressChat
  } = ServicesList({});

  return (
    <View style={[sG.container]}>
      <View style={[sG.w_100, sG.h_15, sG.jc_end, sG.ai_center, sG.border, sG.brounded_bottom, sG.bg_white]}>
        <View style={[sG.w_100, sG.h_70, sG.ai_center, sG.chrow]}>
          <View style={[sG.w_20, sG.h_100, sG.jc_center, sG.ai_center]}>
            <TouchableOpacity style={[sG.w_50, sG.h_50, sG.jc_center, sG.ai_center]} onPress={handlePressBack}>
              <ImageBackground
                resizeMode='contain'
                style={[sG.h_100, sG.w_100]} source={btn_back}
              />
            </TouchableOpacity>
          </View>
          <View style={[sG.w_60, sG.h_100, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.h6, sG.bold]}>Mis Servicios</Text>
          </View>
          <View style={[sG.w_20, sG.h_100, sG.jc_center, sG.ai_center]}>
            <TouchableOpacity style={[sG.w_50, sG.h_50, sG.jc_center, sG.ai_center]} onPress={reload}>
              <MaterialCommunityIcons name="reload" style={[sG.size_icon_md, sG.text_primary]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[sG.w_100, sG.h_10, sG.jc_center, sG.ai_center]}>
        <TouchableOpacity style={[sG.w_70, sG.h_70, sG.jc_center, sG.ai_center, sG.brounded, sG.border_primary, sG.chrow]} onPress={visibleCalendar}>
          <MaterialCommunityIcons name="calendar-month" style={[sG.size_icon, sG.text_primary]} />
          <Text style={[sG.h7, sG.text_primary, sG.bold]}>{'  ' + selectedStartDate}</Text>
        </TouchableOpacity>
      </View>

      {!isLoading && dataSource.length < 1 ?
        <View style={[sG.w_100, sG.h_45, sG.jc_center, sG.ai_center]}>
          <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.ai_center]}>
            <Text style={[sG.h7, sG.text_center, sG.text_gray_light]}>No tienes servicios asignados para esta fecha.</Text>
          </View>
        </View>
        : null}

      {loadingReport ?
        <View style={[sG.w_100, sG.h_100, sG.ai_center, sG.jc_center, sG.position_zindex, sG.bg_zindex_transparent, sG.zIndex]}>
          <ActivityIndicator size="large" color="#24dd6e" />
        </View>
        : null}

      {isLoading ?
        <View style={[sG.w_100, sG.h_55, sG.jc_center, sG.ai_center]}>
          <ActivityIndicator size="large" color="#24dd6e" />
        </View>
        :
        <FlatList<any>
          data={dataSource}
          style={[sG.w_100]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            item.estadoServicio === 7 ? null :
              <View style={[sG.row_50, sG.w_100, sG.ai_center, sG.jc_center]}>
                {item.estadoServicio === 22 ?
                  /* Estado liberado */
                  <View style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]}>
                    <ServiceReleased
                      item={item}
                      id={item.id}
                      hasNovelty={item.novedades}
                      estadoServicio={item.estadoServicio}
                      nombre={item.pasajero.primer_nombre + ' ' + item.pasajero.primer_apellido}
                      horaRecogida={item.horaRecogida}
                      estadoAssing={item.estadoAssing}
                      handlePressDetails={handlePressDetails}
                      handlePressChat={handlePressChat}
                      visibleNovedades={visibleNovedadesHandler}
                    />
                  </View>
                  : item.estadoServicio === 4 || item.estadoServicio === 24 || item.estadoServicio === 21 ?
                    <TouchableOpacity style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]} onPress={() => handlePressDetails(item.id, '2')}>
                      {/* <ServiceRefused
                        id={item.id}
                        nombre={item.pasajero.primer_nombre + ' ' + item.pasajero.primer_apellido}
                        horaRecogida={item.horaRecogida}
                        estadoAssing={item.estadoAssing}
                        Novedad={item.novedad ? item.novedad.nombre : item.novedad}
                      /> */}
                    </TouchableOpacity>
                    : item.estadoServicio === 23 ? /* 23 - Estado Aceptado */
                      <View style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]}>
                        <ServiceAccepted
                          item={item}
                          hasNovelty={item.novedades}
                          id={item.id}
                          estadoServicio={item.estadoServicio}
                          nombre={item.pasajero.primer_nombre + ' ' + item.pasajero.primer_apellido}
                          horaRecogida={item.horaRecogida}
                          estadoAssing={item.estadoAssing}
                          estado={item.estado}
                          aceptado={true}
                          handlePressDetails={handlePressDetails}
                          visibleNovedades={visibleNovedadesHandler}
                          handlePressChat={handlePressChat}
                        />
                      </View>
                      : item.estadoServicio === 5 ?
                        /* Estado En curso */
                        <View style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]}>
                          <ServiceOngoing
                            item={item}
                            hasNovelty={item.novedades}
                            estadoServicio={item.estadoServicio}
                            id={item.id}
                            nombre={item.pasajero.primer_nombre + ' ' + item.pasajero.primer_apellido}
                            horaRecogida={item.horaRecogida}
                            estadoAssing={item.estadoAssing}
                            handlePressDetails={handlePressDetails}
                            visibleNovedades={visibleNovedadesHandler}
                            handlePressChat={handlePressChat}
                          />
                        </View>
                        : null
                }
              </View>
          )}
        />
      }

      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={visibleCalendar}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={visibleCalendar}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        <View style={[sG.bg_white, sG.w_100, sG.h_70, sG.jc_center, sG.ai_center, sG.brounded_top]}>
          <View style={[sG.h_65, sG.w_100, sG.ai_center, sG.jc_center]}>
            <View style={[sG.h_10, sG.w_100, sG.ai_center, sG.jc_center]}></View>
            <View style={[sG.h_80, sG.w_90, sG.ai_center, sG.jc_center]}>
              <CalendarPicker
                onDateChange={onDateChange}
                selectedDayColor='#3ec7a9'
                previousTitle='<<'
                nextTitle='>>'
                selectedDayTextColor='#fff'
                previousTitleStyle={{ color: '#3ec7a9' }}
                nextTitleStyle={{ color: '#3ec7a9' }}
              />
            </View>
          </View>
          <View style={[sG.h_25, sG.w_100, sG.ai_center, sG.jc_center]}>
            <View style={[sG.h_90, sG.w_80, sG.ai_center, sG.jc_center]}>
              <Text style={[sG.h8, sG.text_gray_light, sG.text_center]}>{'La fecha seleccionada actualmente es: ' + selectedStartDate + '; si deseas consultar una fecha diferente debes seleccionarla en el calendario.'}</Text>
            </View>
          </View>
        </View>
      </BottomSheet>


      {
        verifyVersion ?
          <View style={[sG.h_100, sG.w_100, sG.ai_center, sG.jc_center, sG.bg_zindex_transparent, sG.position_zindex]}>
            <View style={[sG.h_40, sG.w_80, sG.ai_center, sG.jc_center, sG.border_secondary, sG.bg_white, sG.brounded]}>
              <View style={[sG.h_90, sG.w_80, sG.ai_center, sG.jc_center]}>
                <View style={[sG.h_40, sG.w_100, sG.ai_center, sG.jc_center]}>
                  <ImageBackground
                    resizeMode='contain'
                    style={[sG.h_80, sG.w_100]}
                    source={logo_color_app} />
                </View>
                <View style={[sG.h_60, sG.w_100, sG.ai_center, sG.jc_center]}>
                  <Text style={[sG.text_gray_light, sG.bold, sG.h7, sG.text_center]}>Tu aplicación no está actualizada</Text>
                  <TouchableOpacity onPress={AppInGoogle}>
                    <Text style={[sG.text_primary, sG.underline, sG.bold, sG.h8, sG.text_center, sG.m_t_xs]}>Actualizar aplicación ahora</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          : null
      }

    </View >
  );
}