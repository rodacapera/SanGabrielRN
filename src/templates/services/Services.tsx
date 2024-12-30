import { TouchableOpacity, Text, View, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BottomSheet } from 'react-native-btr';
import { sG } from '@src/globals/styles/styles';
import ServicesList from './hooks/Services';
import { btn_back, logo_color_app } from '@src/assets/images';
import ServiceReleased from '@src/components/card/ServiceReleased';
import ServiceAccepted from '@src/components/card/serviceAccepted';
import ServiceOngoing from '@src/components/card/serviceOngoing';
import CalendarPicker from 'react-native-calendar-picker';

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
                    /*  <TouchableOpacity style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center]} onPress={() => handlePressDetails(item.id, '2')}>
                       <ServiceRefused
                         id={item.id}
                         nombre={item.pasajero.primer_nombre + ' ' + item.pasajero.primer_apellido}
                         horaRecogida={item.horaRecogida}
                         estadoAssing={item.estadoAssing}
                         Novedad={item.novedad ? item.novedad.nombre : item.novedad}
                       /> 
                     </TouchableOpacity> */
                    null
                    : item.estadoServicio === 23 || item.estadoServicio === 6 ? /* 23 - Estado Aceptado - 6 Estado Completado*/
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

      <BottomSheet
        visible={visibleNovedades}
        //setting the visibility state of the bottom shee
        onBackButtonPress={closeVisibleNovedades}
        //Toggling the visibility state on the click of the back botton
        onBackdropPress={closeVisibleNovedades}
      //Toggling the visibility state on the clicking out side of the sheet
      >
        <View style={[sG.bg_white, sG.w_100, sG.h_40, sG.jc_center, sG.ai_center, sG.brounded_top]}>

          {visibleCategories === true || visibleSubCategories === true || visibleNovelty === true ?
            <View style={[sG.w_100, sG.h_10, sG.ai_center]}>
              <View style={[sG.w_85, sG.h_100, sG.ai_start]}>
                <TouchableOpacity style={[sG.w_30, sG.h_100, sG.ai_start]} onPress={() => handleBackModal()}>
                  <MaterialIcons name="arrow-back" style={[sG.size_icon_md, sG.text_gray, sG.bold]} />
                </TouchableOpacity>
              </View>
            </View>
            :
            <TouchableOpacity style={[sG.w_100, sG.h_10, sG.ai_center]} onPress={() => closeVisibleNovedades()} >
              <View style={[sG.w_80, sG.h_100, sG.ai_center]}>
                <MaterialIcons name="horizontal-rule" style={[sG.size_icon_md, sG.text_gray, sG.bold]} />
              </View>
            </TouchableOpacity>
          }

          {visibleCategories ?
            <View style={[sG.w_85, sG.h_80, sG.ai_center]}>
              <FlatList
                data={dataCategories}
                style={[sG.w_100]}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={[sG.row_20, sG.w_100, sG.ai_center, sG.jc_center]}>
                    <TouchableOpacity style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center, sG.border_bottom]} onPress={() => handleChangeCategory(item.id, item.nombre)}>
                      <Text style={[sG.h7, categoryIdSelected === item.id ? sG.bold : null, sG.text_black, sG.text_center]}>{item.nombre}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
            : visibleSubCategories ?
              <View style={[sG.w_85, sG.h_80, sG.ai_center]}>
                {dataSubCategories.length > 0 ?
                  <FlatList
                    data={dataSubCategories}
                    style={[sG.w_100]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={[sG.row_20, sG.w_100, sG.ai_center, sG.jc_center]}>
                        <TouchableOpacity style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center, sG.border_bottom]} onPress={() => handleChangeSubCategory(item.id, item.nombre)}>
                          <Text style={[sG.h7, subCategoryIdSelected === item.id ? sG.bold : null, sG.text_black, sG.text_center]}>{item.nombre}</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                  :
                  <View style={[sG.h_100, sG.w_90, sG.ai_center, sG.jc_center]}>
                    <Text style={[sG.h7, sG.text_gray_light, sG.text_justify, sG.text_center]}>No hay subcategorías disponibles</Text>
                  </View>
                }
              </View>
              : visibleNovelty ?
                <View style={[sG.w_85, sG.h_80, sG.ai_center]}>
                  {dataNovelty.length > 0 ?
                    <FlatList
                      data={dataNovelty}
                      style={[sG.w_100]}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => (
                        <View style={[sG.row_20, sG.w_100, sG.ai_center, sG.jc_center]}>
                          <TouchableOpacity style={[sG.h_90, sG.w_90, sG.ai_center, sG.jc_center, sG.border_bottom]} onPress={() => handleChangeNovelty(item.id, item.nombre)}>
                            <Text style={[sG.h7, noveltyIdSelected === item.id ? sG.bold : null, sG.text_black, sG.text_center]}>{item.nombre}</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                    :
                    <View style={[sG.h_100, sG.w_90, sG.ai_center, sG.jc_center]}>
                      <Text style={[sG.h7, sG.text_gray_light, sG.text_justify, sG.text_center]}>No hay novedades disponibles</Text>
                    </View>
                  }
                </View>
                :
                <View style={[sG.w_85, sG.h_80, sG.ai_center]}>
                  <TouchableOpacity style={[sG.w_100, sG.h_25, sG.ai_center, sG.jc_center, sG.border_bottom, sG.chrow]} onPress={openCategories}>
                    <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.ai_center]}>
                      <Text style={[sG.h7, sG.bold, sG.text_black]}>{categoryNameSelected === '' ? "Seleccione Categoria" : categoryNameSelected}  </Text>
                    </View>
                    <View style={[sG.w_100, sG.h_90, sG.ai_end, sG.jc_center, sG.position_zindex]}>
                      <View style={[sG.w_15, sG.h_90, sG.ai_center, sG.jc_center]}>
                        <MaterialIcons name="keyboard-arrow-down" style={[sG.size_icon_md, sG.text_black]} />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={[sG.w_100, sG.h_25, sG.ai_center, sG.jc_center, sG.border_bottom, sG.chrow]} onPress={openSubCategories}>
                    <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.ai_center]}>
                      <Text style={[sG.h7, sG.bold, sG.text_black]}>{subCategoryNameSelected === '' ? "Seleccione Sub Categoria" : subCategoryNameSelected} </Text>
                    </View>
                    <View style={[sG.w_100, sG.h_90, sG.ai_end, sG.jc_center, sG.position_zindex]}>
                      <View style={[sG.w_15, sG.h_90, sG.ai_center, sG.jc_center]}>
                        <MaterialIcons name="keyboard-arrow-down" style={[sG.size_icon_md, sG.text_black]} />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={[sG.w_100, sG.h_25, sG.ai_center, sG.jc_center, sG.border_bottom, sG.chrow]} onPress={openNovelties}>
                    <View style={[sG.w_80, sG.h_90, sG.jc_center, sG.ai_center]}>
                      <Text style={[sG.h7, sG.bold, sG.text_black]}>{noveltyNameSelected === '' ? "Seleccione Novedad" : noveltyNameSelected} </Text>
                    </View>
                    <View style={[sG.w_100, sG.h_90, sG.ai_end, sG.jc_center, sG.position_zindex]}>
                      <View style={[sG.w_15, sG.h_90, sG.ai_center, sG.jc_center]}>
                        <MaterialIcons name="keyboard-arrow-down" style={[sG.size_icon_md, sG.text_black]} />
                      </View>
                    </View>
                  </TouchableOpacity>

                  <View style={[sG.w_100, sG.h_25, sG.ai_center, sG.jc_end]}>
                    {categoryIdSelected != '' && subCategoryIdSelected != '' && noveltyIdSelected != '' ?
                      <TouchableOpacity style={[sG.w_60, sG.h_70, sG.ai_center, sG.jc_center, sG.broundedmax, sG.bg_primary]} onPress={handlePressNoveltyDetails}>
                        <Text style={[sG.h7, sG.bold, sG.text_white]}>Generar</Text>
                      </TouchableOpacity>
                      :
                      <View style={[sG.w_60, sG.h_70, sG.ai_center, sG.jc_center, sG.broundedmax, sG.bg_gray_light]}>
                        <Text style={[sG.h7, sG.bold, sG.text_white]}>Generar</Text>
                      </View>
                    }
                  </View>
                </View>
          }
        </View>
      </BottomSheet >

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