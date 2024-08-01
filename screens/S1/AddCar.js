import { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import * as data from '../../components/Database';
import { useNavigation } from '@react-navigation/native';

export default function AddCar() {
  const [name, setName] = useState('');
  const [matricule, setMatricule] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const navigation = useNavigation();
  const setSubmission = useCallback(() => {
    if (name === '' || matricule === '' || kilometrage === '') {
      alert('Please fill in all fields');
      return;
    } else if (isNaN(kilometrage)) {
      alert('Kilometrage has to be a number');
      return;
    } else {
      try {
        data.AddCarDB(name, matricule, kilometrage);
        alert('Car added successfully');
        navigation.navigate('Home');
      } catch (error) {
        console.error('Failed to add car:', error);
        alert('Failed to add car');
      }
    }
  }, [name, matricule, kilometrage, navigation]);
  return (
    <View style={styles.form}>
      <View style={styles.formElem}>
        <Text style={styles.text} >Nom Proprietere</Text>
        <TextInput
          style={styles.textIn} placeholder='Nom Proprietere ' onChangeText={setName} />
      </View>
      <View style={styles.formElem}>

        <Text style={styles.text}>Matricule</Text>
        <TextInput
          style={styles.textIn} placeholder='Matricule ' onChangeText={setMatricule} />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>KilometrageTotal</Text>
        <TextInput
          style={styles.textIn} placeholder='KilometrageTotale ' onChangeText={setKilometrage} />
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