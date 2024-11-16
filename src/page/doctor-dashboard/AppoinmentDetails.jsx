import {
    Avatar,
    Badge,
    Button,
    Card,
    Divider,
    Flex,
    Group,
    SimpleGrid,
    Text,
} from '@mantine/core';
import {
    AccessTimeOutlined,
    CalendarMonthOutlined,
    EmailOutlined,
    EventNote,
    KeyboardBackspace,
    Notes,
    PersonOutline,
    PetsOutlined,
    PhoneOutlined,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDate } from '../../util/getTimeFromIsoDate';

function AppointmentDetails() {
    const location = useLocation();
    const appointment = location.state;
    const navigate = useNavigate();
    console.log(appointment);

    return (
        <Flex direction="column" align="center" p={30} w="100%">
            <Card
                shadow="lg"
                radius="lg"
                p="xl"
                mb="xl"
                w="100%"
                maw={900}
                bg="linear-gradient(135deg, #e3f2fd, #ffffff)"
            >
                <Flex justify="space-between" align="center">
                    <div>
                        <Text fw={700} size="28px" c="#5789cf">
                            Chi tiết cuộc hẹn
                        </Text>
                        <Text mt={8} size="sm" c="dimmed">
                            Mã cuộc hẹn:{' '}
                            <Badge color="#5789cf">{appointment.id}</Badge>
                        </Text>
                    </div>
                    <Badge
                        size="lg"
                        radius="lg"
                        color={
                            appointment.status === 'Đã đặt lịch'
                                ? 'green'
                                : appointment.status === 'Đã hủy'
                                  ? 'red'
                                  : 'yellow'
                        }
                    >
                        {appointment.status}
                    </Badge>
                </Flex>
            </Card>

            <Group w={'100%'} maw={900} justify="flex-start">
                <Button
                    leftSection={<KeyboardBackspace />}
                    variant="transparent"
                    color="blue"
                    onClick={() => navigate(-1)}
                    mb="xl"
                >
                    Quay lại
                </Button>
            </Group>

            <Card shadow="sm" radius="lg" p="lg" w="100%" maw={900} withBorder>
                <SimpleGrid cols={2} spacing="lg">
                    <Flex direction="column" gap="md">
                        <Text fw={600} size="xl" mb="sm" c="#5789cf">
                            Thông tin chủ thú cưng
                        </Text>
                        <Flex align="flex-start" gap="md">
                            <Avatar
                                size="lg"
                                src={appointment.Pet.PetOwner.avatar || ''}
                                name={appointment.Pet.PetOwner.username}
                                color="initials"
                                radius="xl"
                                alt="Chủ nuôi"
                            />
                            <Flex h={'100%'} gap={10} direction="column">
                                <Flex align="center" gap="sm">
                                    <PersonOutline
                                        fontSize="small"
                                        htmlColor="#5789cf"
                                    />
                                    <Text fw={600} size="md">
                                        {appointment.Pet.PetOwner.username}
                                    </Text>
                                </Flex>
                                <Flex align="center" gap="sm">
                                    <EmailOutlined
                                        fontSize="small"
                                        htmlColor="#5789cf"
                                    />
                                    <Text size="md">
                                        {appointment.Pet.PetOwner.email}
                                    </Text>
                                </Flex>
                                <Flex align="center" gap="sm">
                                    <PhoneOutlined
                                        fontSize="small"
                                        htmlColor="#5789cf"
                                    />
                                    <Text size="md">
                                        {appointment.Pet.PetOwner.phone ||
                                            'N/A'}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex direction="column" gap="md">
                        <Text fw={600} size="xl" mb="sm" c="#5789cf">
                            Thông tin thú cưng
                        </Text>
                        <Flex align="center" gap="sm">
                            <PetsOutlined
                                fontSize="small"
                                htmlColor="#5789cf"
                            />
                            <Text fw={500}>Tên: {appointment.Pet.name}</Text>
                        </Flex>
                        <Flex align="center" gap="sm">
                            <Text fw={500}>Giống loài:</Text>
                            <Text>{appointment.Pet.Category.name}</Text>
                        </Flex>
                        <Flex align="center" gap="sm">
                            <Text fw={500}>Tuổi:</Text>
                            <Text>{appointment.Pet.age} tuổi</Text>
                        </Flex>
                        <Flex align="center" gap="sm">
                            <Text fw={500}>Giới tính:</Text>
                            <Text>{appointment.Pet.gender}</Text>
                        </Flex>
                    </Flex>
                </SimpleGrid>
                <Divider my="lg" />

                <Text fw={600} size="xl" mb="sm" c="#5789cf">
                    Chi tiết cuộc hẹn
                </Text>
                <Flex direction="column" gap="md">
                    <Flex align="center" gap="sm">
                        <EventNote fontSize="small" htmlColor="#5789cf" />
                        <Text fw={500}>
                            Tên dịch vụ:{' '}
                            {appointment?.service_name ||
                                'Khám sức khỏe thú cưng'}
                        </Text>
                    </Flex>
                    <Flex align="center" gap="sm">
                        <AccessTimeOutlined
                            fontSize="small"
                            htmlColor="#5789cf"
                        />
                        <Text fw={500}>Thời gian:</Text>
                        <Text>{appointment.appointment_time.slice(0, -3)}</Text>
                    </Flex>
                    <Flex align="center" gap="sm">
                        <CalendarMonthOutlined
                            fontSize="small"
                            htmlColor="#5789cf"
                        />
                        <Text fw={500}>Ngày hẹn:</Text>
                        <Text>{getDate(appointment.appointment_date)}</Text>
                    </Flex>
                    <Flex align="center" gap="sm">
                        <Notes fontSize="small" htmlColor="#5789cf" />
                        <Text fw={500}>
                            Ghi chú: {appointment.notes || 'Không có ghi chú'}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
}

export default AppointmentDetails;
