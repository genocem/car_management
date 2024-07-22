import { useState, useCallback, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import * as data from '../../components/Database';
import { useNavigation } from '@react-navigation/native';

export default function AddAssurance({ navigation, route }) {
  const { matricule } = route.params;
  const [name, setName] = useState('');
  const [dateAssurance, setDateAssurance] = useState('');
  const [dureeEnMois, setDureeEnMois] = useState('');
  const [prixAssurance, setPrixAssurance] = useState('');
  // const navigation = useNavigation();

  useEffect(() => {
    // Set the current date in YYYY-MM-DD format
    const today = new Date();
    const formattedDate = today.toLocaleString();
    setDateAssurance(formattedDate);
  }, []);

  const setSubmission = useCallback(() => {
    if (name === '' || dureeEnMois === '' || prixAssurance === '') {
      alert('Please fill in all fields');
      return;
    } else if (isNaN(dureeEnMois) || isNaN(prixAssurance)) {
      alert('Duration and Price have to be numbers');
      return;
    } else {
      try {
        data.AddAssurance(matricule, name, dateAssurance, dureeEnMois, prixAssurance);
        alert('Assurance added successfully');
        navigation.goBack();

      } catch (error) {
        console.error('Failed to add assurance:', error);
        alert('Failed to add assurance');
      }
    }
  }, [name, matricule, dureeEnMois, prixAssurance, navigation]);

  return (
    <View style={styles.form}>
      <View style={styles.formElem}>
        <Text style={styles.text}>Nom</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Nom'
          onChangeText={setName}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Durée en Mois</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Durée en Mois'
          keyboardType='numeric'
          onChangeText={setDureeEnMois}
        />
      </View>
      <View style={styles.formElem}>
        <Text style={styles.text}>Prix Assurance</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Prix Assurance'
          keyboardType='numeric'
          onChangeText={setPrixAssurance}
        />
      </View>
      <Button title="Save" onPress={setSubmission} />
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
