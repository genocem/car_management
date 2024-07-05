import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function Entry({ name, matricule, kilometrage, isSelected, onLongPress, onPress }) {
    return (
        <View style={[styles.Entry, isSelected && styles.selectedEntry]}>
            <TouchableOpacity 
                onPress={onPress}
                onLongPress={onLongPress}>
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
        margin: 10,
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    selectedEntry: {
        backgroundColor: 'lightblue',
    },
    listItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 13,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});