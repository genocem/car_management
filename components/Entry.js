import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function Entry({ name, matricule, kilometrage }) {
    return (
        <View>
            <TouchableOpacity style={styles.Entry}>
                {/* React Native does not have an <h3> component. Use <Text> with styling instead. */}
                <View style={styles.listItem}>
                    <Text style={styles.name}>{name}</Text>
                    <Text>{matricule}</Text>
                    <Text>{kilometrage}</Text>
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