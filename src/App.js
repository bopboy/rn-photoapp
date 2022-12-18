import { StatusBar } from 'expo-status-bar';
import Navigation from './navigations';
import { LogBox } from 'react-native';
import { UserProvider } from './contexts/UserContext';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const App = () => {
    LogBox.ignoreLogs(['AsyncStorage has been extracted']);

    return (
        <ActionSheetProvider>
            <UserProvider>
                <StatusBar style={'dark'} />
                <Navigation />
            </UserProvider>
        </ActionSheetProvider>
    );
};

export default App;
