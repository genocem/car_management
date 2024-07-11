import { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/Button';
import * as data from '../components/Database';

export default function AddEntretienDate({ navigation, route }) {
  const { matricule } = route.params;
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  // const navigation = useNavigation();

  const setSubmission = useCallback(() => {
    if (name === '' || date === '') {
      alert('Please fill in all fields');
      return;
    } else {
      try {
        data.AddEntretienDate(matricule, name, date);
        alert('Entretien Date added successfully');
        navigation.goBack();

      } catch (error) {
        console.error('Failed to add entretien date:', error);
        alert('Failed to add entretien date');
      }
    }
  }, [name, matricule, date, navigation]);

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
        <Text style={styles.text}>Date</Text>
        <TextInput
          style={styles.textIn}
          placeholder='Date'
          onChangeText={setDate}
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
