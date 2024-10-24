import { Avatar, Button, Divider, Flex, Group, Text } from '@mantine/core';
import { CalendarMonth, Logout } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function DoctorSideBar() {
    const location = useLocation();
    const { user } = useAuthStore();

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <Flex
            direction={'column'}
            w={'100%'}
            h={'100vh'}
            pt={30}
            pb={30}
            gap={20}
            bg={'#FAFAFC'}
        >
            <Group w={'100%'} justify="center">
                <Avatar
                    src={
                        'https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-112928.jpg?semt=ais_hybrid'
                    }
                    size={160}
                    name={user.username}
                />
                <Text w={'100%'} ta={'center'} c={'#5789cf'} fw={600} size="xl">
                    Bs.{user.username}
                </Text>
                <Group w={'100%'} justify="center">
                    <Divider w={'80%'} color={'#5789cf'} />
                </Group>
            </Group>
            <Group>
                <Link to={'calendar'} style={{ width: '100%' }}>
                    <Button
                        radius={0}
                        w={'100%'}
                        variant="transparent"
                        c={isActive('calendar') ? '#5789cf' : 'dark.2'}
                        leftSection={<CalendarMonth />}
                        style={
                            isActive('calendar')
                                ? { borderRight: '3px solid #5789cf' }
                                : null
                        }
                    >
                        Lịch khám bệnh
                    </Button>
                </Link>
                <Link to={'calendar'} style={{ width: '100%' }}>
                    <Button
                        radius={0}
                        w={'100%'}
                        variant="transparent"
                        c={isActive('appointment') ? '#5789cf' : 'dark.2'}
                        leftSection={<CalendarMonth />}
                        style={
                            isActive('appointment')
                                ? { borderRight: '3px solid #5789cf' }
                                : null
                        }
                    >
                        Lịch khám bệnh
                    </Button>
                </Link>
            </Group>
            <Group w={'100%'} justify="center">
                <Divider w={'80%'} color={'#5789cf'} />
                <Button
                    variant="transparent"
                    c={'red'}
                    leftSection={<Logout />}
                >
                    Sign out
                </Button>
            </Group>
        </Flex>
    );
}

export default DoctorSideBar;
