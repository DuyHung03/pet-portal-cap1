import { Avatar, Badge, Button, Group, Text } from '@mantine/core';
import { CalendarMonth, WatchLater } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { getDate } from '../../../util/getTimeFromIsoDate';

function Appointment({ appointment }) {
    const badgeColor =
        appointment.status === 'Đã đặt lịch'
            ? 'green'
            : appointment.status === 'Hoàn thành'
              ? 'gray'
              : 'red';

    return (
        <Link
            to={`/doctor-dashboard/appointment/${appointment.id}`}
            state={appointment}
        >
            <Group
                gap={10}
                w={300}
                bg={'white'}
                p={20}
                style={{
                    borderRadius: '16px',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                }}
            >
                <Group w={'100%'} justify="center">
                    <Avatar
                        src={''}
                        name={appointment.Pet.PetOwner.username}
                        size={'80px'}
                    />
                </Group>
                <Text w={'100%'} ta={'center'} size="lg" fw={500}>
                    {appointment.Pet.PetOwner.username}
                </Text>
                <Group w={'100%'} justify="space-evenly">
                    <Text size="md">
                        <WatchLater color="action" />{' '}
                        {appointment.appointment_time.slice(0, -3)}
                    </Text>
                    <Text size="md">
                        <CalendarMonth color="action" />{' '}
                        {getDate(appointment.appointment_date)}
                    </Text>
                </Group>
                <Group w={'100%'} justify="center">
                    <Badge color={badgeColor}>{appointment.status}</Badge>
                </Group>
                <Group w={'100%'} justify="center" mt={20}>
                    <Button bg={'#5789cf'} radius={'xl'}>
                        Chi tiết
                    </Button>
                </Group>
            </Group>
        </Link>
    );
}

export default Appointment;
