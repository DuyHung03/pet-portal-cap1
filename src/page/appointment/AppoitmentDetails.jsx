import {
    Avatar,
    Button,
    Divider,
    Flex,
    Group,
    SimpleGrid,
    Text,
} from '@mantine/core';
import {
    ArrowBack,
    CalendarMonthOutlined,
    CheckCircle,
    EmailOutlined,
    LocationOnOutlined,
    PhoneOutlined,
} from '@mui/icons-material';
import { getDate } from '@util/getTimeFromIsoDate';
import { useLocation, useNavigate } from 'react-router-dom';

function AppoitmentDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log(state);

    return (
        <Group w={'100%'} justify="center">
            <Group
                w={700}
                p={20}
                mt={40}
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    borderRadius: '12px',
                }}
            >
                <Group w={'100%'}>
                    <Button
                        leftSection={<ArrowBack />}
                        variant="transparent"
                        onClick={() => navigate(-1)}
                        c={'#5789cf'}
                    >
                        Quay lại
                    </Button>
                    {/* <Divider w={'100%'} /> */}
                </Group>
                <Group w={'100%'} align="center">
                    <CheckCircle sx={{ fontSize: 40 }} htmlColor="#40C057" />
                    <Text fw={500} size="lg" c={'green'}>
                        {state.status}
                    </Text>
                    <Text c={'gray'} fs={'italic'}>
                        {`(ID: ${state?.id})`}
                    </Text>
                </Group>
                <Divider w={'100%'} align="flex-start" />
                <SimpleGrid w={'100%'} cols={2}>
                    <Group w={'100%'} pl={10} pr={10} align="flex-start">
                        <Text fw={500} c={'gray'}>
                            Thông tin cá nhân:
                        </Text>
                        <Group w={'100%'}>
                            <Avatar
                                src={state?.Pet?.PetOwner?.avatar_url}
                                name={state?.Pet?.PetOwner?.username}
                                size={'md'}
                            />
                            <Text fw={500}>
                                {state?.Pet?.PetOwner?.username}
                            </Text>
                        </Group>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <PhoneOutlined htmlColor="#5789cf" />
                            <Text>{state?.Pet?.PetOwner?.phone}</Text>
                        </Flex>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <EmailOutlined htmlColor="#5789cf" />
                            <Text>{state?.Pet?.PetOwner?.email}</Text>
                        </Flex>
                    </Group>
                    <Group w={'100%'} pl={10} pr={10} align="flex-start">
                        <Text fw={500} c={'gray'}>
                            Phòng khám:
                        </Text>
                        <Group w={'100%'}>
                            <Avatar
                                src={state?.Doctor?.doctor_avatar}
                                name={state?.Doctor?.username}
                                size={'md'}
                            />
                            <Text fw={500}>{state?.Doctor?.username}</Text>
                        </Group>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <LocationOnOutlined htmlColor="#5789cf" />
                            <Text>{state?.Doctor?.clinic_address}</Text>
                        </Flex>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <PhoneOutlined htmlColor="#5789cf" />
                            <Text>{state?.Doctor?.phone}</Text>
                        </Flex>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <EmailOutlined htmlColor="#5789cf" />
                            <Text>{state?.Doctor?.email}</Text>
                        </Flex>
                    </Group>
                </SimpleGrid>
                <Group w={'100%'} pl={10} pr={10} mt={20}>
                    <Text fw={500} c={'gray'}>
                        Thời gian:
                    </Text>
                    <Flex w={'100%'} align={'center'} gap={10}>
                        <CalendarMonthOutlined htmlColor="#5789cf" />
                        <Text
                            fw={500}
                        >{`${state?.appointment_time.slice(0, -3)} ${getDate(state?.appointment_date)} `}</Text>
                    </Flex>
                </Group>
            </Group>
        </Group>
    );
}

export default AppoitmentDetails;
