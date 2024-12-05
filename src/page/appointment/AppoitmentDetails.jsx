import {
    Avatar,
    Button,
    Divider,
    Flex,
    Group,
    Modal,
    SimpleGrid,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    ArrowBack,
    CalendarMonthOutlined,
    Cancel,
    CheckCircle,
    EmailOutlined,
    EventBusy,
    LocationOnOutlined,
    Notes,
    PhoneOutlined,
} from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { getDate } from '@util/getTimeFromIsoDate';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function AppoitmentDetails() {
    const { state } = useLocation();
    console.log(state);
    const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCancelSchedule = async () => {
        setLoading(true);
        try {
            await axiosInstance.put(`appointments/${state.id}`, {
                status: 'Đã hủy',
            });
            closeModal();
            toast.success('Đã hủy lịch hẹn khám');
            setTimeout(() => {
                navigate(-1);
            }, 3000);
        } catch (error) {
            console.log(error);
            toast.error('Đã xảy ra lỗi');
        } finally {
            setLoading(false);
        }
    };

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
                <ToastContainer />
                <Modal
                    opened={modalOpened}
                    onClose={loading ? () => {} : closeModal}
                    centered
                    withCloseButton={false}
                    title="Hủy lịch hẹn khám"
                >
                    <Text mb={20}>Bạn muốn hủy lịch hẹn khám?</Text>
                    <Group mt="lg" justify="flex-end">
                        <Button
                            onClick={closeModal}
                            variant="default"
                            disabled={loading}
                        >
                            Quay lại
                        </Button>
                        <Button
                            onClick={handleCancelSchedule}
                            color="red"
                            loading={loading}
                        >
                            Hủy
                        </Button>
                    </Group>
                </Modal>
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
                <Flex w={'100%'} justify={'space-between'} align={'center'}>
                    <Group align="center">
                        {state.status == 'Đã hủy' ? (
                            <Cancel sx={{ fontSize: 40 }} htmlColor="red" />
                        ) : (
                            <CheckCircle
                                sx={{ fontSize: 40 }}
                                htmlColor="#40C057"
                            />
                        )}
                        <Text
                            fw={500}
                            size="lg"
                            c={state.status == 'Đã hủy' ? 'red' : 'green'}
                        >
                            {state.status}
                        </Text>
                        <Text c={'gray'} fs={'italic'}>
                            {`(ID: ${state?.id})`}
                        </Text>
                    </Group>
                    {state.status == 'Đã đặt lịch' ? (
                        <Button
                            size="xs"
                            variant="subtle"
                            leftSection={<EventBusy />}
                            color="red.5"
                            onClick={openModal}
                        >
                            Hủy cuộc hẹn
                        </Button>
                    ) : null}
                </Flex>
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
                    <Flex align="center" gap="sm">
                        <Notes htmlColor="#5789cf" />
                        <Text fw={500}>
                            Ghi chú: {state.notes || 'Không có ghi chú'}
                        </Text>
                    </Flex>
                </Group>
            </Group>
        </Group>
    );
}

export default AppoitmentDetails;
