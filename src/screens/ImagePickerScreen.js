import {
    Alert,
    FlatList,
    Image,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import HeaderRight from '../components/HeaderRight';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import * as MediaLibrary from 'expo-media-library';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY } from '../colors';
import { BlurView } from 'expo-blur';

const initListInfo = {
    endCursor: '',
    hasNextPage: true,
};

const ImagePickerScreen = () => {
    const navigation = useNavigation();
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [photos, setPhotos] = useState([]);
    const width = useWindowDimensions().width / 3;

    const listInfo = useRef(initListInfo);
    const [refreshing, setRefreshing] = useState(false);

    const [selectedPhotos, setSelectedPhotos] = useState([]);

    const stateRoutes = useNavigationState((state) => state.routes);

    const getPhotos = useCallback(async () => {
        const options = {
            first: 30,
            sortBy: [MediaLibrary.SortBy.creationTime],
        };
        if (listInfo.current.endCursor) {
            options['after'] = listInfo.current.endCursor;
        }
        if (listInfo.current.hasNextPage) {
            const { assets, endCursor, hasNextPage } =
                await MediaLibrary.getAssetsAsync(options);
            setPhotos((prev) =>
                options.after ? [...prev, ...assets] : assets
            );
            listInfo.current = { endCursor, hasNextPage };
        }
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        listInfo.current = initListInfo;
        await getPhotos();
        setRefreshing(false);
    };

    useEffect(() => {
        if (status?.granted) getPhotos();
    }, [status?.granted, getPhotos]);

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
    }, [navigation, requestPermission]);

    const onConfirm = useCallback(() => {
        const prevScreenName = stateRoutes[stateRoutes.length - 2].name;
        navigation.navigate(prevScreenName, { selectedPhotos });
    }, [navigation, selectedPhotos, stateRoutes]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderRight
                    onPress={onConfirm}
                    disabled={selectedPhotos.length < 1}
                />
            ),
        });
    }, [navigation, onConfirm, selectedPhotos.length]);

    const isSelectedPhoto = (photo) => {
        return selectedPhotos.findIndex((item) => item.id === photo.id) > -1;
    };
    const togglePhoto = (photo) => {
        const isSelected = isSelectedPhoto(photo);
        setSelectedPhotos((prev) =>
            isSelected
                ? prev.filter((item) => item.id !== photo.id)
                : [...prev, photo]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={photos}
                renderItem={({ item }) => {
                    const isSelected = isSelectedPhoto(item);

                    return (
                        <Pressable
                            style={{ width, height: width }}
                            onPress={() => togglePhoto(item)}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                style={styles.photo}
                            />
                            {isSelected && (
                                <BlurView
                                    intensity={Platform.select({
                                        ios: 10,
                                        android: 60,
                                    })}
                                    style={[
                                        StyleSheet.absoluteFillObject,
                                        styles.checkIcon,
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name="check-circle"
                                        size={40}
                                        color={PRIMARY.DEFAULT}
                                    />
                                </BlurView>
                            )}
                        </Pressable>
                    );
                }}
                numColumns={3}
                onEndReached={getPhotos}
                onEndReachedThreshold={0.3}
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
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
    list: { width: '100%' },
    photo: { width: '100%', height: '100%' },
    checkIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImagePickerScreen;
