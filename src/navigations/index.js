import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from 'react';
import { onAuthStateChanged } from '../api/auth';
import { useUserState } from '../contexts/UserContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Navigation = () => {
    const [user, setUser] = useUserState();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            }
            unsubscribe();
        });
    }, [setUser]);
    return (
        <NavigationContainer>
            {user.uid ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default Navigation;
