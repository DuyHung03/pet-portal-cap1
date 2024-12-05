import useFetchData from '@hooks/useFetchData';
import {
    Flex,
    Group,
    Image,
    Loader,
    Select,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { useAuthStore } from '@store/authStore';
import Appointment from 'component/doctor-dashboard/dashboard-appointment/Appointment';
import { useMemo, useState } from 'react';
import logo from '../../assets/logo-transparent.png';
import { vietnameseDate } from '../../util/getDateInVietnamese';

function Statistics() {
    const { user } = useAuthStore();
    const [filter, setFilter] = useState('all'); // Filter state

    const params = useMemo(() => [], []);

    const { data, loading, error } = useFetchData(
        `/appointments/doctor/${user.id}`,
        params,
    );

    // Filter appointments based on the selected filter
    const filteredAppointments = useMemo(() => {
        if (!data?.data) return [];
        if (filter === 'all') return data.data;
        return data.data.filter((appointment) => appointment.status === filter);
    }, [data, filter]);

    return (
        <Flex w={'100%'} p={30} direction="column">
            {/* Header */}
            <Flex
                justify={'space-between'}
                w={'100%'}
                align={'center'}
                bg={'#FAFAFC'}
                p={20}
                style={{ borderRadius: '12px' }}
            >
                <Group>
                    <Image src={logo} w={60} />
                    <Text fw={600} c={'#5789cf'} size={'32px'}>
                        Quản lý lịch hẹn khám
                    </Text>
                </Group>
                <Text c={'gray'} size="lg">
                    {vietnameseDate}
                </Text>
            </Flex>

            {/* Filter */}
            <Flex justify="space-between" align="center" w="100%" p={20}>
                <Text fw={500} size="xl">
                    Có {filteredAppointments.length} cuộc hẹn
                </Text>
                <Select
                    label="Lọc theo trạng thái"
                    value={filter}
                    onChange={setFilter}
                    data={[
                        { value: 'all', label: 'Tất cả' },
                        { value: 'Đã đặt lịch', label: 'Đã đặt lịch' },
                        { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
                        { value: 'Đã hủy', label: 'Đã hủy' },
                    ]}
                    w={200}
                />
            </Flex>

            {loading ? (
                <Flex justify="center" align="center" w="100%" h="100%">
                    <Loader />
                </Flex>
            ) : error ? (
                <Flex justify="center" align="center" w="100%" h="100%">
                    <Text c="red" fw={600}>
                        Lỗi: {error.message}
                    </Text>
                </Flex>
            ) : (
                <SimpleGrid w={'100%'} p={20} cols={3} verticalSpacing={'xl'}>
                    {filteredAppointments.length > 0 ? (
                        filteredAppointments.map((app, index) => (
                            <Appointment appointment={app} key={index} />
                        ))
                    ) : (
                        <Text c={'dark.4'} fs={'italic'}>
                            Không có cuộc hẹn nào phù hợp
                        </Text>
                    )}
                </SimpleGrid>
            )}
        </Flex>
    );
}

export default Statistics;
