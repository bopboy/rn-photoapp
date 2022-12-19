import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from '../components/FastImage';
import { memo } from 'react';
import usePostsByLocation from '../hooks/usePostsByLocation';

const LocationPostItem = memo(({ uri }) => {
    return (
        <View style={{ paddingHorizontal: 5 }}>
            <FastImage source={{ uri }} style={{ width: 150, height: 150 }} />
        </View>
    );
});
LocationPostItem.displayName = 'LocationPostItem';
LocationPostItem.propTypes = {
    uri: PropTypes.string.isRequired,
};

const LocationPostList = ({ location }) => {
    const { data, fetchNextPage } = usePostsByLocation(location);
    console.log(data.length);

    return (
        <FlatList
            horizontal={true}
            data={data}
            renderItem={({ item }) => <LocationPostItem uri={item} />}
            keyExtractor={(_, idx) => idx.toString()}
            onEndReached={fetchNextPage}
        />
    );
};

LocationPostList.propTypes = {
    location: PropTypes.string.isRequired,
};

export default LocationPostList;
