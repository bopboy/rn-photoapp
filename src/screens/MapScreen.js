import { StyleSheet, View } from 'react-native';
import { WHITE } from '../colors';
import MapView from 'react-native-maps';
import LocationSearch from '../components/LocationSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapScreen = () => {
    const { top } = useSafeAreaInsets();
    return (
        <View style={styles.container}>
            <MapView style={styles.map} />
            <LocationSearch
                styles={{ container: { ...styles.location, top } }}
                iconVisible={false}
                onPress={(data) => {
                    console.log(data);
                }}
            />
        </View>
    );
};

MapScreen.propTypes = {
    // propTypes
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    location: {
        position: 'absolute',
        width: '90%',
        borderBottomWidth: 0,
    },
});

export default MapScreen;
