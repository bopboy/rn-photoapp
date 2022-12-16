import { useNavigation } from '@react-navigation/native';
import { Button, StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
import { MainRoutes } from '../navigations/routes';
// import PropTypes from 'prop-types';

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>HomeScreen</Text>
            <Button
                title={'select'}
                onPress={() => navigation.navigate(MainRoutes.SELECT_PHOTOS)}
            />
        </View>
    );
};

HomeScreen.propTypes = {
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

export default HomeScreen;
