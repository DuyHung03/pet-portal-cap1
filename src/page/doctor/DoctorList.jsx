import useFetchData from '@hooks/useFetchData';
import { Divider, Group, Loader, SimpleGrid, Text } from '@mantine/core';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import DoctorItem from './DoctorItem';

function DoctorList() {
    const params = useMemo(() => [], []);

    const { data, loading } = useFetchData('/auth/doctors', params);

    localStorage.setItem('doctors', JSON.stringify(data?.doctors));

    return (
        <Group w={'100%'} justify="center" mb={100}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Bác sĩ - Cổng dịch vụ thú cưng</title>
            </Helmet>
            <Group w={1200} p={20}>
                <Group w={'100%'}>
                    <Text
                        w={'100%'}
                        ta={'left'}
                        fw={500}
                        c={'#5789CF'}
                        size={'26px'}
                    >
                        Danh sách bác sĩ
                    </Text>
                    <Divider w={'100%'} />
                </Group>
                {loading ? (
                    <Group w={'100%'} justify="center" align="center">
                        <Loader />
                    </Group>
                ) : null}
                <SimpleGrid
                    cols={{ xl: 4, sm: 2, xs: 1, md: 3 }}
                    spacing={'xl'}
                >
                    {data?.doctors.map((doctor, index) => (
                        <DoctorItem key={index} doctor={doctor} />
                    ))}
                </SimpleGrid>
            </Group>
        </Group>
    );
}

export default DoctorList;
