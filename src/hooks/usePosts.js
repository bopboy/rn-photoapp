import { useCallback, useEffect, useRef, useState } from 'react';
import { getPosts } from '../api/post';

const usePosts = (isMine) => {
    const [data, setData] = useState([]);
    const lastRef = useRef(null);
    const isLoadingRef = useRef(false);
    const [refetching, setRefetching] = useState(false);

    const fetchNextPage = useCallback(async () => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;
            const { list, last } = await getPosts({
                after: lastRef.current,
                isMine,
            });
            setData((prev) => (lastRef.current ? [...prev, ...list] : list));
            lastRef.current = last;
            isLoadingRef.current = false;
        }
    }, [isMine]);

    const refetch = async () => {
        setRefetching(true);
        lastRef.current = null;
        await fetchNextPage();
        setRefetching(false);
    };

    const deletePost = ({ id }) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    useEffect(() => {
        fetchNextPage();
    }, [fetchNextPage]);

    return { data, fetchNextPage, refetch, refetching, deletePost };
};

export default usePosts;
