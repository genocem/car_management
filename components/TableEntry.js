import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function Entry({ name, onPress }) {
    return (
        <View style={styles.Entry}>
            <TouchableOpacity onPress={onPress}>
                {/* React Native does not have an <h?> component. Use <Text> with styling instead. */}
                <View style={styles.listItem}>
                    <Text style={styles.name}>{name}</Text>
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