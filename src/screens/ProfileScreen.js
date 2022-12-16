import { Button, StyleSheet, Text, View } from 'react-native';
import { signOut } from '../api/auth';
import { WHITE } from '../colors';
// import PropTypes from 'prop-types';
import { useUserState } from '../contexts/UserContext';

const ProfileScreen = () => {
    const [user, setUser] = useUserState();
    console.log(user.uid, user.email, user.displayName, user.photoURL);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ProfileScreen</Text>
            <Button
                title={'signout'}
                onPress={async () => {
                    await signOut();
                    setUser({});
                }}
            />
        </View>
    );
};

ProfileScreen.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    title: {
        fontSize: 30,
    },
});

export default ProfileScreen;
