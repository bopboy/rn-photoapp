import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ReducerTest = () => {
    const [result, setResult] = useState(0);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{result}</Text>
            <Button title={'+'} onPress={() => setResult((prev) => prev + 1)} />
            <Button title={'-'} onPress={() => setResult((prev) => prev - 1)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
});

export default ReducerTest;
