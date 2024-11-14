import useFetchData from '@hooks/useFetchData';
import {
    Button,
    Divider,
    Flex,
    Group,
    Loader,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { Add } from '@mui/icons-material';
import { useAuthStore } from '@store/authStore';
import AppointmentItem from 'component/apponitment/AppointmentItem';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function AppointmentsPage() {
    const { user } = useAuthStore();
    const params = useMemo(() => [], []);

    const { data, loading } = useFetchData(
        `/appointments/owner/${user.id}`,
        params,
    );

    return (
        <Group w={'100%'} justify="center">
            <Group w={1200} p={20}>
                <Flex justify={'space-between'} w={'100%'} align={'center'}>
                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Danh sách lịch hẹn khám
                    </Text>
                    <Link to={'make-appointment'}>
                        <Button leftSection={<Add />} bg={'#5789CF'}>
                            Đặt lịch khám
                        </Button>
                    </Link>
                </Flex>
                <Divider w={'100%'} />

                <Text>
                    Bạn hiện có <b>{data?.data?.length}</b> cuộc hẹn
                </Text>

                {loading ? (
                    <Group w={'100%'} justify="center">
                        <Loader />
                    </Group>
                ) : null}
                <SimpleGrid
                    w={'100%'}
                    cols={{ xl: 4, sm: 2, xs: 3 }}
                    spacing={'xl'}
                    verticalSpacing={'xl'}
                >
                    {data?.data?.map((app, index) => (
                        <AppointmentItem key={index} appointment={app} />
                    ))}
                </SimpleGrid>
            </Group>
        </Group>
    );
}

export default AppointmentsPage;
