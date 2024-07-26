import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import * as data from '../../components/Database';

export default function AddAssurance({ navigation, route }) {
  const { matricule } = route.params;
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [interval, setInterval] = useState('');
  const [unit, setUnit] = useState('months');
  const [resultDate, setResultDate] = useState(null);
  const [prixAssurance, setPrixAssurance] = useState('');

  const addInterval = useCallback(() => {
    if (interval) {
      const months = unit === 'years' ? parseInt(interval) * 12 : parseInt(interval);
      const newDate = new Date(date);
      newDate.setMonth(newDate.getMonth() + months);
      setResultDate(newDate);
    } else {
      setResultDate(null);
    }
  }, [interval, unit, date]);

  useEffect(() => {
    addInterval();
  }, [interval, unit, date, addInterval]);

  const setSubmission = useCallback(() => {
    if (name === '' || !interval || !prixAssurance) {
      alert('Please fill in all fields');
      return;
    } else if (isNaN(interval) || isNaN(prixAssurance)) {
      alert('Duration and Price have to be numbers');
      return;
    } else {
      try {
        data.AddAssurance(
          matricule,
          name,
          date.toLocaleDateString('en-GB'),
          resultDate.toLocaleDateString('en-GB'),
          prixAssurance
        );
        alert('Assurance added successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add assurance:', error);
        alert('Failed to add assurance');
      }
    }
  }, [name, matricule, date, interval, resultDate, prixAssurance, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formElem}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder='Nom'
          onChangeText={setName}
          value={name}
        />
      </View>

      <View style={styles.formElem}>
        <Text style={styles.label}>Date de début</Text>
        <DatePicker date={date} setDate={setDate} />
      </View>

      <View style={styles.formElem}>
        <Text style={styles.label}>Durée</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1]}
            placeholder='Durée'
            onChangeText={setInterval}
            value={interval}
            keyboardType='numeric'
          />
          <Picker
            selectedValue={unit}
            onValueChange={setUnit}
            style={[styles.input, styles.flex1]}
          >
            <Picker.Item label="Mois" value="months" />
            <Picker.Item label="Années" value="years" />
          </Picker>
        </View>
      </View>

      {resultDate && (
        <View style={styles.formElem}>
          <Text style={styles.label}>Date de fin</Text>
          <Text style={styles.resultText}>{resultDate.toLocaleDateString('en-GB')}</Text>
        </View>
      )}

      <View style={styles.formElem}>
        <Text style={styles.label}>Prix Assurance</Text>
        <TextInput
          style={styles.input}
          placeholder='Prix Assurance'
          onChangeText={setPrixAssurance}
          value={prixAssurance}
          keyboardType='numeric'
        />
      </View>

      <View style={styles.formElem}>
        <Button title="Save" onPress={setSubmission} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formElem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex1: {
    flex: 1,
  },
  resultText: {
    fontSize: 16,
    color: 'blue',
  },
});