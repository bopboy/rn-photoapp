import { Keyboard, StyleSheet, View } from 'react-native';
import { AuthRoutes } from '../navigations/routes';
import Input, { InputTypes } from '../components/Input';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import SafeInputView from '../components/SafeInputView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import TextButton from '../components/TextButton';
import HR from '../components/HR';

const SignInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { top } = useSafeAreaInsets();
    const { navigate } = useNavigation();

    useEffect(() => {
        setDisabled(!email || !password);
    }, [email, password]);

    const onSubmit = () => {
        Keyboard.dismiss();
        if (!disabled && !isLoading) {
            setIsLoading(true);
            console.log(email, password);
            setIsLoading(false);
        }
    };

    return (
        <SafeInputView>
            <View style={[styles.container, { paddingTop: top }]}>
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
        </SafeInputView>
    );
};

const inputStyles = StyleSheet.create({
    container: { marginBottom: 20 },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default SignInScreen;
