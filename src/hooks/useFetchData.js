import { useState, useEffect } from 'react';
import axiosInstance from '../network/httpRequest';

const useFetchData = (url, params = {}, method = 'GET', body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance({
                    url,
                    method,
                    params, 
                    data: body,
                });

                setData(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, params, method, body]);

    return { data, loading, error };
};

export default useFetchData;
