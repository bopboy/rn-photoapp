import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import Navigation from './navigations';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { Asset } from 'expo-asset';

const App = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                await SplashScreen.preventAutoHideAsync();
                await Asset.fromModule(
                    // eslint-disable-next-line no-undef
                    require('../assets/cover.png').downloadAsync()
                );
            } catch (e) {
                console.log(e);
            } finally {
                // setTimeout(() => {
                setIsReady(true);
                // }, 1000);
            }
        })();
    }, []);

    const onReady = async () => {
        if (isReady) await SplashScreen.hideAsync();
    };

    if (!isReady) return null;

    return (
        <View style={{ flex: 1 }} onLayout={onReady}>
            <StatusBar style={'dark'} />
            <Navigation />
        </View>
    );
};

export default App;
