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
import { GRAY } from '../colors';

const MAX_TEXT_LENGTH = 60;

const WriteTextScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const width = useWindowDimensions().width / 4;

    const [photoUris, setPhotoUris] = useState([]);
    const [text, setText] = useState('');

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
        // setIsLoading(false);
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
