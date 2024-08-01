import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Button from '../../components/Button';
import * as data from '../../components/Database';


export default function AddKilometrage({ navigation, route }) {

  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB'); // This will give format dd/mm/yyyy
  };

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };


  const { matricule } = route.params;
//   const [quantiteCarburant, setQuantiteCarburant] = useState('');
  const [kilometrageOld, setKilometrageOld] = useState('');
  const [kilometrage, setKilometrage] = useState('');
//   const [prix, setPrix] = useState('');

  useEffect(() => {
    data.getKillometrage(matricule, setKilometrageOld);
  }, []);



//   everything before this point is already done please finish the rest

  const setSubmission = useCallback(() => {
    if (!kilometrage ) {
      alert('Please fill in all fields');
      return;
    } else {
      try {
        data.AddKilometrage(matricule,formatDate(date),kilometrageOld, kilometrage);
        alert('Kilometrage added successfully');
        navigation.goBack();
      } catch (error) {
        console.error('Failed to add kilometrage:', error);
        alert('Failed to add kilometrage');
      }
    }
  }, [ date, kilometrage, matricule, kilometrageOld]);

  return (
    <View style={styles.form}>

      <View style={styles.formElem}>
        <Text style={styles.text}>Date</Text>
        <Button onPress={showDatepicker}
          title={formatDate(date)} />
      </View>


      <View style={styles.formElem}>
        <Text style={styles.text}>Kilometrage</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Kilometrage ajouter'
          keyboardType='numeric'
          onChangeText={setKilometrage}
        />
      </View>

      <Button title="Enregistrer" onPress={setSubmission} />
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  formElem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '80%',
    margin: 7,
  },
  textIn: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 3,
  },
});