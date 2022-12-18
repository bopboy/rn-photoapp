import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getPosts } from '../api/post';
import { WHITE } from '../colors';
import PostList from '../components/PostList';

const ListScreen = () => {
    const { top } = useSafeAreaInsets();
    const [data, setData] = useState([]);
    const lastRef = useRef(null);
    const isLoadingRef = useRef(false);

    const getList = async () => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;
            const { list, last } = await getPosts({ after: lastRef.current });
            setData((prev) => (lastRef.current ? [...prev, ...list] : list));
            lastRef.current = last;
            isLoadingRef.current = false;
        }
    };

    useEffect(() => {
        getList();
    }, []);

    return (
        <View style={[styles.container, { paddingTop: top }]}>
            <PostList data={data} fetchNextPage={getList} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: WHITE,
    },
    title: {
        fontSize: 30,
    },
});

export default ListScreen;
