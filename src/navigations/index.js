import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from '../api/auth';
import { useUserState } from '../contexts/UserContext';
import AuthStack from './AuthStack';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import { initFirebase } from '../api/firebase';
import MainStack from './MainStack';

const Navigation = () => {
    const [user, setUser] = useUserState();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Asset.fromModule(
                    // eslint-disable-next-line no-undef
                    require('../../assets/cover.png')
                ).downloadAsync();
                initFirebase();
                const unsubscribe = onAuthStateChanged((user) => {
                    if (user) {
                        setUser(user);
                    }
                    setIsReady(true);
                    unsubscribe();
                });
            } catch (e) {
                setIsReady(true);
            }
        })();
    }, [setUser]);

    const onReady = async () => {
        if (isReady) await SplashScreen.hideAsync();
    };

    if (!isReady) return null;

    return (
        <NavigationContainer onReady={onReady}>
            {user.uid ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
