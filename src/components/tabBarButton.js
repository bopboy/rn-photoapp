import { Pressable, StyleSheet, Text, View } from 'react-native';
// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY, WHITE } from '../colors';
import { MainRoutes } from '../navigations/routes';

const TabBarButton = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate(MainRoutes.SELECT_PHOTOS)}
            >
                <MaterialCommunityIcons name="plus" size={25} color={WHITE} />
            </Pressable>
        </View>
    );
};

TabBarButton.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: PRIMARY.DEFAULT,
        borderRadius: 999,
        padding: 4,
    },
});

export default TabBarButton;
