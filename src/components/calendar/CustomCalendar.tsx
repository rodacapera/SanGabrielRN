import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Button
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {sG} from '@src/globals/styles/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface CustomCalendarProps {
  setDateSelected: (e: string) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({setDateSelected}) => {
  const [selectedDate, setSelectedDate] = useState<string>();
  const [markedDate, setMarkedDate] = useState<string | undefined>();
  const [isYearPickerVisible, setIsYearPickerVisible] =
    useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  // Usamos moment.js para obtener el primer día del año, por ejemplo '2024-01-01'
  const initialDate = moment().format('YYYY-MM-DD');

  const onClose = () => {
    setIsVisible(false);
  };

  const handleSave = (date: string) => {
    setDateSelected(date);
    setIsVisible(false);
  };

  const handleDayPress = (day: any) => {
    setMarkedDate(day.dateString);
  };

  const handleYearPress = () => {
    setIsYearPickerVisible(true);
  };

  const yearsList = Array.from({length: 100}, (_, i) =>
    moment()
      .subtract(25 - i, 'years')
      .format('YYYY')
  );

  const renderYearItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.yearOption}
        onPress={() => {
          const updatedDate = moment.parseZone(moment().format('YYYY-MM-DD'));
          updatedDate.set({year: item});
          setSelectedDate(moment(updatedDate).format('YYYY-MM-DD'));
          setIsYearPickerVisible(false);
        }}>
        <Text style={styles.yearOptionText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderCustomHeader = (date: Date) => {
    const year = moment(date).format('YYYY');
    const month = moment(date).format('MMMM');
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerMonth}>
          {month.charAt(0).toUpperCase() + month.slice(1)}{' '}
        </Text>
        <TouchableOpacity onPress={handleYearPress}>
          <Text style={styles.headerYear}>{year}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const updatedDate = moment.parseZone(moment().format('YYYY-MM-DD'));
    updatedDate.set({year: parseInt(initialDate)});
    setSelectedDate(moment(updatedDate).format('YYYY-MM-DD'));
  }, []);

  console.log('selectedDate', selectedDate);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <View
          style={[
            sG.chrow,
            sG.border_primary,
            sG.p_x_xxl,
            sG.p_y_xs,
            sG.brounded,
            sG.jc_center,
            sG.ai_center
          ]}>
          <Icon name="calendar-month" color={sG.text_primary.color} size={24} />
          <Text style={[sG.text_primary, sG.bold, sG.m_l_xs]}>
            {markedDate ?? initialDate}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <View style={styles.container}>
          <View style={styles.content}>
            {isYearPickerVisible ? (
              <View style={styles.yearContainer}>
                <FlatList
                  data={yearsList}
                  keyExtractor={item => item.toString()}
                  numColumns={5}
                  renderItem={renderYearItem}
                  columnWrapperStyle={styles.columnWrapper}
                />
              </View>
            ) : (
              <View>
                <Calendar
                  current={selectedDate}
                  onDayPress={handleDayPress}
                  theme={{
                    arrowColor: sG.text_primary.color // Cambia este valor al color que desees para las flechas
                  }}
                  markedDates={
                    markedDate
                      ? {[markedDate]: {selected: true, marked: true}}
                      : undefined
                  }
                  renderHeader={(date: string | number | Date) =>
                    renderCustomHeader(new Date(date))
                  }
                />
                <View style={styles.footer}>
                  <View style={styles.buttonContainer}>
                    <Button
                      onPress={onClose}
                      color={sG.text_primary.color}
                      title="Cerrar"
                    />
                    <Button
                      onPress={() => {
                        markedDate && handleSave(markedDate);
                      }}
                      color={sG.text_primary.color}
                      title="Guardar"
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 13,
    display: 'flex',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: 160
  },
  content: {
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 10,
    width: 350,
    height: 400
  },
  container: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  headerMonth: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  headerYear: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  yearContainer: {
    backgroundColor: '#fff',
    padding: 16
  },
  yearOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  yearOptionText: {
    fontSize: 16,
    fontWeight: '300'
  },
  columnWrapper: {
    justifyContent: 'space-between'
  }
});

export default CustomCalendar;
