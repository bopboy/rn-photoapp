import { StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import HeaderRight from '../components/HeaderRight';
import { useLayoutEffect } from 'react';

const ImagePickerScreen = () => {
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight onPress={() => {}} />,
        });
    }, []);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ImagePickerScreen</Text>
        </View>
    );
};

ImagePickerScreen.propTypes = {
    // propTypes
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

export default ImagePickerScreen;
