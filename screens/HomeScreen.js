import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import EntryList from '../components/EntryList';
import Button from '../components/Button';
import * as NavigationBar from 'expo-navigation-bar';



export default function HomeScreen({navigation}) {
  // const [selectedImage, setSelectedImage] = useState(null);

  
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        
      </View>
      <View style={styles.ListContainer}>
        <EntryList />
      </View>

      <View style={styles.footerContainer} >
        <Button label="Choose a photo" theme={'primary'} />
        <Button label="addo za new page" onPress={() => navigation.navigate('AddCar')}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  ListContainer: {
    flex: 1,
    paddingTop: 58,
    width: '100%',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
