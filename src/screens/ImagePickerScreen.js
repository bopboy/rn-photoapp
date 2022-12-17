import { Alert, StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import HeaderRight from '../components/HeaderRight';
import { useEffect, useLayoutEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';

const ImagePickerScreen = () => {
    const navigation = useNavigation();
    const [status, requestPermission] = MediaLibrary.usePermissions();
    console.log(status);

    useEffect(() => {
        (async () => {
            const { granted } = await requestPermission();
            if (!granted) {
                Alert.alert('사진 접근 권한', '사진 접근 권한 필요해', [
                    {
                        text: '확인',
                        onPress: () =>
                            navigation.canGoBack() && navigation.goBack(),
                    },
                ]);
            }
        })();
    }, []);
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
