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
    CalendarMonth,
    EmailOutlined,
    PhoneOutlined,
    WcOutlined,
} from '@mui/icons-material';
import { useAppointment } from '@store/useAppointment';
import { useLocation, useNavigate } from 'react-router-dom';

function DoctorProfile() {
    const { state } = useLocation(); // Assuming state contains doctor data
    const navigate = useNavigate();
    const { setDoctor } = useAppointment();
    const handleMakeAppointment = () => {
        setDoctor(state);
        navigate('/appointment/make-appointment');
    };
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
                </Group>

                <Group w={'100%'} align="center" mt={10}>
                    <Avatar
                        src={state?.doctor_avatar}
                        name={state?.username}
                        size={100}
                        radius="50%"
                    />
                    <Flex direction="column" align="center" ml={20}>
                        <Text fw={600} size="xl">
                            {state?.username || 'Không có thông tin'}
                        </Text>
                        <Text fw={500} c="gray">
                            {state?.clinic_address || 'Không có địa chỉ'}
                        </Text>
                    </Flex>
                </Group>

                <Divider w={'100%'} my={20} />

                <SimpleGrid cols={2} spacing="lg" w="100%">
                    <Group direction="column" spacing="sm">
                        <Flex align="center" gap={10}>
                            <PhoneOutlined htmlColor="#5789cf" />
                            <Text>
                                {state?.phone || 'Không có số điện thoại'}
                            </Text>
                        </Flex>
                        <Flex align="center" gap={10}>
                            <EmailOutlined htmlColor="#5789cf" />
                            <Text>{state?.email || 'Không có email'}</Text>
                        </Flex>
                        <Flex align="center" gap={10}>
                            <WcOutlined htmlColor="#5789cf" />
                            <Text>{state?.gender || 'Không rõ'}</Text>
                        </Flex>
                    </Group>
                    <Group direction="column" spacing="sm">
                        <Flex align="center" gap={10}>
                            <Text fw={500}>Kinh nghiệm:</Text>
                            <Text>
                                {state?.experience_years
                                    ? `${state?.experience_years} năm`
                                    : 'Không có thông tin'}
                            </Text>
                        </Flex>
                        <Flex align="center" gap={10}>
                            <Text fw={500}>Địa chỉ:</Text>
                            <Text>
                                {state?.clinic_address || 'Không có thông tin'}
                            </Text>
                        </Flex>
                        <Flex align="center" gap={10}>
                            <Text fw={500}>Giờ làm việc:</Text>
                            <Text>
                                {state?.opening_time.slice(0, -3)} -{' '}
                                {state?.closing_time.slice(0, -3)}
                            </Text>
                        </Flex>
                    </Group>
                </SimpleGrid>
                <Group mt={20} justify="flex-end" w={'100%'}>
                    <Button
                        leftSection={<CalendarMonth />}
                        onClick={handleMakeAppointment}
                        bg={'#5789cf'}
                    >
                        Đặt lịch khám bệnh
                    </Button>
                </Group>
            </Group>
        </Group>
    );
}

export default DoctorProfile;
