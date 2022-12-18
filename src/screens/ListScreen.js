import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPosts } from '../api/post';
import { WHITE } from '../colors';
import PostItem from '../components/PostItem';
import PostList from '../components/PostList';
// import PropTypes from 'prop-types';

const post = {
    createdTs: 1671343369009,
    id: 'nHHb3k1AFy0guGUuIw3u',
    location: '네덜란드 암스테르담',
    photos: [
        'https://firebasestorage.googleapis.com/v0/b/rn-photoapp.appspot.com/o/BkmJ3WYbHZXDVN6L7Cuti6eJLKt2%2FIMG_7793.HEIC?alt=media&token=75302d87-88b5-43d5-bde6-56a2d7822e27',
        'https://firebasestorage.googleapis.com/v0/b/rn-photoapp.appspot.com/o/BkmJ3WYbHZXDVN6L7Cuti6eJLKt2%2FIMG_7794.HEIC?alt=media&token=b902f708-90df-4515-8dfd-02b34eb23e48',
    ],
    text: '작지만 아기자기한 곳',
    user: {
        displayName: 'scp',
        photoURL:
            'https://firebasestorage.googleapis.com/v0/b/rn-photoapp.appspot.com/o/BkmJ3WYbHZXDVN6L7Cuti6eJLKt2%2FIMG_7712.HEIC?alt=media&token=c56a7eb0-2bd2-4f03-b6d8-e6a556d01763',
        uid: 'BkmJ3WYbHZXDVN6L7Cuti6eJLKt2',
    },
};
const ListScreen = () => {
    const [data, setData] = useState([]);
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        (async () => {
            const list = await getPosts();
            setData(list);
        })();
    }, []);
    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <PostList data={data} />
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
        // alignItems: 'center',
        backgroundColor: WHITE,
    },
    title: {
        fontSize: 30,
    },
});

export default ListScreen;
