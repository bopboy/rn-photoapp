/* eslint-disable no-undef */
import { Alert, Image, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { AuthRoutes } from '../navigations/routes';
import Input, { InputTypes, ReturnKeyTypes } from '../components/Input';
import { useCallback, useReducer, useRef } from 'react';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TextButton from '../components/TextButton';
import HR from '../components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../colors';
import {
    authFormReducer,
    AuthFormTypes,
    initAuthForm,
} from '../reducers/authFormReducer';
import { getAuthErrorMessage, signIn } from '../api/auth';

const SignInScreen = () => {
    const passwordRef = useRef();

    const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

    const { top, bottom } = useSafeAreaInsets();
    const { navigate } = useNavigation();

    useFocusEffect(
        useCallback(() => {
            return () => dispatch({ type: AuthFromTypes.RESET });
        }, [])
    );

    const updateForm = (payload) => {
        const newForm = { ...form, ...payload };
        const disabled = !newForm.email || !newForm.password;

        dispatch({
            type: AuthFormTypes.UPDATE_FORM,
            payload: { disabled, ...payload },
        });
    };

    const onSubmit = async () => {
        Keyboard.dismiss();
        if (!form.disabled && !form.isLoading) {
            dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
            try {
                const user = await signIn(form);
                console.log(user);
            } catch (e) {
                const message = getAuthErrorMessage(e.code);
                Alert.alert('로그인 실패', message);
            }
            dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
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
                <ScrollView
                    style={[
                        styles.form,
                        { paddingBottom: bottom ? bottom + 10 : 40 },
                    ]}
                    contentContainerStyle={{ alignItems: 'center' }}
                    bounces={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <Input
                        inputType={InputTypes.EMAIL}
                        value={form.email}
                        onChangeText={(text) =>
                            updateForm({ email: text.trim() })
                        }
                        onSubmitEditing={() => passwordRef.current.focus()}
                        styles={inputStyles}
                        returnKeyType={ReturnKeyTypes.NEXT}
                    />
                    <Input
                        ref={passwordRef}
                        inputType={InputTypes.PASSWORD}
                        value={form.password}
                        onChangeText={(text) =>
                            updateForm({ password: text.trim() })
                        }
                        onSubmitEditing={onSubmit}
                        styles={inputStyles}
                        returnKeyType={ReturnKeyTypes.DONE}
                    />
                    <Button
                        title={'SIGNIN'}
                        disabled={form.disabled}
                        isLoading={form.isLoading}
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
                </ScrollView>
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
        flexGrow: 0,
        backgroundColor: WHITE,
        paddingHorizontal: 20,
        paddingTop: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default SignInScreen;
