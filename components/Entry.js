import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function Entry(name,matricule,kilometrage) {
    return (
        <View>
            <TouchableOpacity style={styles.Entry}>
                <h3 style={styles.name} >Entry 1</h3>
                <View style={styles.listItem}>
                    <Text>Entry 1 description</Text>
                    <Text>Entry 1 description 2</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    Entry: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        borderRadius: 10,
        padding: 10,
        
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    listItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
    },
});