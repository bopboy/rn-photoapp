import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import HeaderRight from '../components/HeaderRight';
import FastImage from '../components/FastImage';
import { GRAY } from '../colors';
import LocationSearch from '../components/LocationSearch';
import { uploadPhoto } from '../api/storage';
import { createPost, updatePost } from '../api/post';
import event, { EventTypes } from '../event';

const MAX_TEXT_LENGTH = 60;

const WriteTextScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const width = useWindowDimensions().width / 4;

    const [photoUris, setPhotoUris] = useState([]);
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');

    const [disabled, setDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const locationRef = useRef(null);

    useEffect(() => {
        setDisabled(isLoading || !text);
    }, [text, isLoading]);

    useEffect(() => {
        if (params) {
            const { photoUris, post } = params;
            if (photoUris) {
                setPhotoUris(params.photoUris);
            } else if (post) {
                setPhotoUris(post.photos);
                setText(post.text);
                setLocation(post.location);
                locationRef.current?.setAddressText(post.location);
            }
        }
    }, [params]);

    const onSubmit = useCallback(async () => {
        setIsLoading(true);
        try {
            if (params?.photoUris) {
                const photos = await Promise.all(
                    photoUris.map((uri) => uploadPhoto(uri))
                );
                await createPost({ photos, location, text });
                event.emit(EventTypes.REFRESH);
            } else if (params?.post) {
                const { post } = params;
                const updatedPost = { ...post, location, text };
                await updatePost(updatedPost);
                event.emit(EventTypes.UPDATE, { post: updatedPost });
            }
            navigation.goBack();
        } catch (e) {
            console.log(e);
            Alert.alert(e.message, [
                { text: '확인', onPress: () => setIsLoading(false) },
            ]);
        }
    }, [params, photoUris, location, text, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderRight disabled={disabled} onPress={onSubmit} />
            ),
        });
    }, [onSubmit, disabled, navigation]);

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                {photoUris.map((uri, idx) => (
                    <FastImage
                        key={idx}
                        source={{ uri }}
                        style={{ width, height: width }}
                    />
                ))}
            </View>
            <LocationSearch
                ref={locationRef}
                onPress={({ description }) => setLocation(description)}
                isLoading={isLoading}
                isSelected={!!location}
            />
            <View>
                <TextInput
                    value={text}
                    onChangeText={(text) => setText(text)}
                    style={styles.input}
                    placeholder={'여기는 어땠나요?'}
                    maxLength={MAX_TEXT_LENGTH}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    textContentType={'none'}
                    keyboardAppearance={'light'}
                    multiline={true}
                    blurOnSubmit={true}
                    editable={!isLoading}
                />
                <Text style={styles.inputLength}>
                    {text.length} / {MAX_TEXT_LENGTH}
                </Text>
            </View>
        </View>
    );
};

WriteTextScreen.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    inputLength: {
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        color: GRAY.DARK,
        fontSize: 12,
    },
});

export default WriteTextScreen;
