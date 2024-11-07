import { Grid, GridCol, Group, Loader, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../network/httpRequest';
import SearchItem from './SearchItem';

function Search() {
    const [searchParams] = useSearchParams();

    const name = searchParams.get('name');

    const getSearchProduct = async () => {
        const res = await axiosInstance.get('products/search', {
            params: {
                name: name,
            },
        });

        return res.data;
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ['search', name],
        queryFn: () => getSearchProduct(),
        enabled: !!name,
    });

    return (
        <Group w={1200} m={60}>
            <Group>
                <Text fw={500} c={'dark'}>
                    Sort:
                </Text>
            </Group>
            {isLoading ? (
                <Group mt={20} mb={20} w={'100%'} justify="center">
                    <Loader type="bars" />
                </Group>
            ) : (
                <Group w={'100%'} justify="center">
                    {data.length === 0 ? (
                        <Text>No results found.</Text>
                    ) : (
                        <Grid gutter="xl" justify="space-between">
                            {data.map((product, index) => (
                                <GridCol key={index} span={2}>
                                    <SearchItem product={product} />
                                </GridCol>
                            ))}
                        </Grid>
                    )}
                </Group>
            )}
        </Group>
    );
}

export default Search;
