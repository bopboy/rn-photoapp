/* eslint-disable no-undef */
import { Image, Keyboard, StyleSheet, View } from 'react-native';
import { AuthRoutes } from '../navigations/routes';
import Input, { InputTypes } from '../components/Input';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../components/TextButton';
import HR from '../components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../colors';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { top, bottom } = useSafeAreaInsets();
    const { navigate } = useNavigation();

    useEffect(() => {
        setDisabled(!email || !password);
    }, [email, password]);

    const onSubmit = () => {
        Keyboard.dismiss();
        if (!disabled && !isLoading) {
            setIsLoading(true);
            setIsLoading(false);
        }
    };

    return (
        <SafeInputView>
            <StatusBar style={'light'} />
            <View style={[styles.container, { paddingTop: top }]}>
                <View style={StyleSheet.absoluteFillObject}>
                    <Image
                        source={require('../../assets/cover.png')}
                        style={{ width: '100%' }}
                        resizeMode={'cover'}
                    ></Image>
                </View>
                <View
                    style={[
                        styles.form,
                        { paddingBottom: bottom ? bottom + 10 : 40 },
                    ]}
                >
                    <Input
                        inputType={InputTypes.EMAIL}
                        value={email}
                        onChangeText={(text) => setEmail(text.trim())}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        styles={inputStyles}
                    />
                    <Input
                        ref={passwordRef}
                        inputType={InputTypes.PASSWORD}
                        value={password}
                        onChangeText={(text) => setPassword(text.trim())}
                        onSubmitEditing={onSubmit}
                        styles={inputStyles}
                    />
                    <Button
                        title={'SIGNIN'}
                        disabled={disabled}
                        isLoading={isLoading}
                        onPress={onSubmit}
                        styles={{ container: { marginTop: 20 } }}
                    />
                    <HR
                        text={'OR'}
                        styles={{ container: { marginVertical: 30 } }}
                    />
                    <TextButton
                        title={'SIGNUP'}
                        onPress={() => navigate(AuthRoutes.SIGN_UP)}
                    />
                </View>
            </View>
        </SafeInputView>
    );
};

const inputStyles = StyleSheet.create({
    container: { marginBottom: 20 },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 30,
    },
    form: {
        alignItems: 'center',
        backgroundColor: WHITE,
        paddingHorizontal: 20,
        paddingTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default SignInScreen;
