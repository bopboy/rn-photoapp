import { StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
// import PropTypes from 'prop-types';

const ListScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>ListScreen</Text>
        </View>
    );
};

ListScreen.propTypes = {
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

export default ListScreen;
