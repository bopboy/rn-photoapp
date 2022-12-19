import { StyleSheet, View } from 'react-native';
import { WHITE } from '../colors';
import MapView, { Marker } from 'react-native-maps';
import LocationSearch from '../components/LocationSearch';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

const MapScreen = () => {
    const { top } = useSafeAreaInsets();
    const [location, setLocation] = useState({
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={
                    location.latitude && location.longitude ? location : null
                }
            >
                {location.latitude && location.longitude && (
                    <Marker coordinate={location} title={location.name} />
                )}
            </MapView>
            <LocationSearch
                styles={{ container: { ...styles.location, top } }}
                iconVisible={false}
                onPress={(data, detail) => {
                    console.log(data, detail);
                    const {
                        geometry: {
                            location: { lat, lng },
                        },
                    } = detail;
                    setLocation((prev) => ({
                        ...prev,
                        latitude: lat,
                        longitude: lng,
                        name: data.description,
                    }));
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
