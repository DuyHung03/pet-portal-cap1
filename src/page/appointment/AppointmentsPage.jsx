import { Button, Divider, Flex, Group, SimpleGrid, Text } from '@mantine/core';
import { Add } from '@mui/icons-material';
import AppointmentItem from 'component/apponitment/AppointmentItem';
import { Link } from 'react-router-dom';

function AppointmentsPage() {
    return (
        <Group w={'100%'} justify="center">
            <Group w={1200} p={20}>
                <Flex justify={'space-between'} w={'100%'} align={'center'}>
                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Danh sách lịch hẹn khám
                    </Text>
                    <Link to={'/doctors'}>
                        <Button leftSection={<Add />} bg={'#5789CF'}>
                            Đặt lịch hẹn
                        </Button>
                    </Link>
                </Flex>
                <Divider w={'100%'} />

                <Text>
                    Bạn hiện có <b>5</b> cuộc hẹn
                </Text>

                <SimpleGrid
                    w={'100%'}
                    cols={{ xl: 4, sm: 2, xs: 3 }}
                    spacing={'xl'}
                    verticalSpacing={'xl'}
                >
                    <AppointmentItem />
                    <AppointmentItem />
                    <AppointmentItem />
                    <AppointmentItem />
                    <AppointmentItem />
                </SimpleGrid>
            </Group>
        </Group>
    );
}

export default AppointmentsPage;
