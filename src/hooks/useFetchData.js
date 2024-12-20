import { useCallback, useEffect, useMemo, useState } from 'react';
import axiosInstance from '../network/httpRequest';

const useFetchData = (url, params = {}, method = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memoizedParams = useMemo(() => params, [params]);
    const memoizedBody = useMemo(() => body, [body]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance({
                url,
                method,
                params: memoizedParams,
                data: memoizedBody,
            });

            setData(response.data);
        } catch (err) {
            setError(err);
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    }, [url, method, memoizedParams, memoizedBody]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
