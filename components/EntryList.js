import { StyleSheet, ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Entry from './Entry';
export default function EntryList() {
    return (
        <ScrollView>
            <Entry />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    EntryList: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        
    },

});