import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerChangeEvent, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDate } from '../../utilites/helper/dateConverter';

type Props = {
  mode?: 'date' | 'time' | 'datetime';
  value?: Date;
  onChange?: ( dateString: string) => void;
};


const AppDateTimePicker = ({ mode = 'date', value, onChange }: Props) => {
  const [date, setDate] = useState<Date>(value ?? new Date());

  const handleValueChange = (event: DateTimePickerChangeEvent, date: Date) => {
    setDate(date);
    onChange?.(formatDate(date));
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        value={date}
        mode={mode}
        display="spinner"
        onValueChange={handleValueChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-between'
  },
});

export default AppDateTimePicker;