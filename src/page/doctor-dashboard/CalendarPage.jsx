import {
    Flex,
    Group,
    Image,
    Loader,
    ScrollArea,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { useMemo } from 'react';
import logo from '../../assets/logo-transparent.png';
import banner from '../../assets/ong-nghe.png';
import Appointment from '../../component/doctor-dashboard/dashboard-appointment/Appointment';
import useFetchData from '../../hooks/useFetchData';
import { useAuthStore } from '../../store/authStore';
import { vietnameseDate } from '../../util/getDateInVietnamese';

function CalendarPage() {
    const { user } = useAuthStore();

    const params = useMemo(() => [], []);

    const { data, loading, error } = useFetchData(
        `/appointments/doctor/${user.id}`,
        params,
    );

    if (error) return <Text>Error: {error.message}</Text>;

    return (
        <Group w={'100%'} p={30} h={'100vh'}>
            <Flex
                justify={'space-between'}
                w={'100%'}
                mb={30}
                align={'center'}
                bg={'#FAFAFC'}
                p={20}
                style={{ borderRadius: '12px' }}
            >
                <Group>
                    <Image src={logo} w={60} />
                    <Text fw={600} c={'#5789cf'} size={'32px'}>
                        Quản lý phòng khám
                    </Text>
                </Group>
                <Text c={'gray'} size="lg">
                    {vietnameseDate}
                </Text>
            </Flex>
            <Flex w={'100%'} justify={'space-evenly'} align={'center'}>
                <Flex direction={'column'} p={20} gap={10}>
                    <Text size="32px" fw={500} c={'blue'}>
                        Xin chào Bs. {user.username}!
                    </Text>
                    <Text size="xl">
                        Bạn có <b>{data?.data?.length || 0}</b> cuộc hẹn hôm nay
                    </Text>
                </Flex>
                <Image src={banner} h={140} />
            </Flex>
            <Group
                p={20}
                style={{
                    borderRadius: '12px',
                }}
                bg={'#FAFAFC'}
                w={'100%'}
            >
                <Text fw={600} size="md" w={'100%'} mb={10}>
                    Lịch hẹn khám hôm nay: {data?.data?.length}
                </Text>
                {loading ? (
                    <Group w={'100%'} justify={'center'}>
                        <Loader />
                    </Group>
                ) : null}
                <ScrollArea w={'100%'} h={500}>
                    <SimpleGrid w={'100%'} p={20} cols={3}>
                        {data?.data?.length > 0 ? (
                            data.data.map((app, index) => (
                                <Appointment appointment={app} key={index} />
                            ))
                        ) : (
                            <Text c={'dark.4'} fs={'italic'}>
                                Không có lịch hẹn hôm nay
                            </Text>
                        )}
                    </SimpleGrid>
                </ScrollArea>
            </Group>
        </Group>
    );
}

export default CalendarPage;
