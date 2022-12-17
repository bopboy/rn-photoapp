import {
    Alert,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
// import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MainRoutes } from '../navigations/routes';
import { GRAY } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { getLocalUri } from '../components/ImagePicker';
import HeaderRight from '../components/HeaderRight';

const SelectPhotosScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const width = useWindowDimensions().width;
    const [photos, setPhotos] = useState([]);
    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDisabled(isLoading || !photos.length);
    }, [isLoading, photos.length]);

    useEffect(() => {
        if (params) {
            // const { selectedPhotos } = params;
            // if (selectedPhotos?.length) {
            //     setPhotos(selectedPhotos);
            // }
            setPhotos(params.selectedPhotos ?? []);
        }
    }, [params]);

    const onConfirm = useCallback(async () => {
        if (!disabled) {
            setIsLoading(true);
            try {
                const localUris = await Promise.all(
                    photos.map((photo) =>
                        Platform.select({
                            ios: getLocalUri(photo.id),
                            android: photo.uri,
                        })
                    )
                );
                console.log(localUris);
            } catch (e) {
                Alert.alert('사진 찾기 실패', e.message);
            }
            setIsLoading(false);
        }
    }, [disabled, photos]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderRight disabled={disabled} onPress={onConfirm} />
            ),
        });
    }, [navigation, disabled, onConfirm]);

    return (
        <View style={styles.container}>
            <Text style={styles.description}>이미지는 최대 4장까지...</Text>
            <View style={{ width, height: width }}>
                <Pressable
                    onPress={() =>
                        navigation.navigate(MainRoutes.IMAGE_PICKER, {
                            maxCount: 4,
                        })
                    }
                    style={styles.photoButton}
                >
                    <MaterialCommunityIcons
                        name="image-plus"
                        size={80}
                        color={GRAY.DEFAULT}
                    />
                </Pressable>
            </View>
        </View>
    );
};

SelectPhotosScreen.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    description: {
        color: GRAY.DARK,
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    photoButton: {
        backgroundColor: GRAY.LIGHT,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SelectPhotosScreen;
