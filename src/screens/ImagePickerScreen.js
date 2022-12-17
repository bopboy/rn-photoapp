import {
    Alert,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderRight from '../components/HeaderRight';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import * as MediaLibrary from 'expo-media-library';

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
            // setListInfo({ endCursor, hasNextPage });
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

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight onPress={() => {}} />,
        });
    });

    console.log(photos.length);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={photos}
                renderItem={({ item }) => (
                    <Pressable style={{ width, height: width }}>
                        <Image
                            source={{ uri: item.uri }}
                            style={styles.photo}
                        />
                    </Pressable>
                )}
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
});

export default ImagePickerScreen;
