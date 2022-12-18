import {
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import HeaderRight from '../components/HeaderRight';
import FastImage from '../components/FastImage';
import { GRAY, PRIMARY } from '../colors';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAP_KEY } from '../../env';

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

    useEffect(() => {
        setDisabled(isLoading || !text);
    }, [text, isLoading]);

    useEffect(() => {
        setPhotoUris(params?.localUris ?? []);
    }, [params?.localUris]);

    const onSubmit = useCallback(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

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
            <View style={styles.location}>
                <GooglePlacesAutocomplete
                    placeholder={'Location'}
                    query={{ key: MAP_KEY, language: 'ko' }}
                    onPress={(data) => setLocation(data.description)}
                    onFail={(e) => {
                        console.log('GooglePlacesAutoComplete: ', e);
                    }}
                    styles={{
                        container: { flex: 0 },
                        textInput: { paddingLeft: 30 },
                    }}
                />
                <View style={styles.locationIcon}>
                    <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color={location ? PRIMARY.DEFAULT : GRAY.DARK}
                    />
                </View>
            </View>
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
    location: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: GRAY.LIGHT,
    },
    locationIcon: {
        position: 'absolute',
        left: 20,
        top: 16,
    },
});

export default WriteTextScreen;
