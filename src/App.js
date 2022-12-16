import { StatusBar } from 'expo-status-bar';
import Navigation from './navigations';
import { LogBox } from 'react-native';
import { UserProvider } from './contexts/UserContext';

const App = () => {
    LogBox.ignoreLogs(['AsyncStorage has been extracted']);

    return (
        <UserProvider>
            <StatusBar style={'dark'} />
            <Navigation />
        </UserProvider>
    );
};

export default App;
