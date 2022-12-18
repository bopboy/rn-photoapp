import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../api/post';

const usePosts = () => {
    const [data, setData] = useState([]);
    const lastRef = useRef(null);
    const isLoadingRef = useRef(false);
    const [refetching, setRetchhing] = useState(false);

    const fetchNextPage = async () => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;
            const { list, last } = await getPosts({ after: lastRef.current });
            setData((prev) => (lastRef.current ? [...prev, ...list] : list));
            lastRef.current = last;
            isLoadingRef.current = false;
        }
    };

    const refetch = async () => {
        setRetchhing(true);
        lastRef.current = null;
        await fetchNextPage();
        setRetchhing(false);
    };

    useEffect(() => {
        fetchNextPage();
    }, []);

    return { data, fetchNextPage, refetch, refetching };
};

export default usePosts;
