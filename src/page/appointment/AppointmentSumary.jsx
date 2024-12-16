import emailjs from '@emailjs/browser';
import {
    Avatar,
    Button,
    Flex,
    Group,
    LoadingOverlay,
    Progress,
    SimpleGrid,
    Text,
} from '@mantine/core';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function AppointmentSummary() {
    const { user } = useAuthStore();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formData = state.formData;

    console.log(formData);
    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-'); // Split by '-'
        return `${year}-${month}-${day}`; // Reorder to YYYY-MM-DD
    };

    console.log(formatDate(formData.date));

    const handleBooking = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.post(
                'appointments',
                {
                    pet_owner_id: user.id,
                    pet_id: formData.pet.id,
                    doctor_id: formData.doctor.id,
                    appointment_date: formatDate(formData.date),
                    appointment_time: formData.time,
                    notes: formData.notes || 'Không có ghi chú',
                },
                {
                    withCredentials: true,
                },
            );
            if (res.status == 201) {
                console.log(res);
                const templateParams = {
                    pet_owner: formData.ownerName,
                    time: formData.time.slice(0, -3),
                    date: formData.date,
                    to_email: formData.doctor.email,
                    doctor_name: formData.doctor.username,
                    clinic_address: formData.doctor.clinic_address,
                    note: formData.notes,
                };
                emailjs
                    .send('service_ubdnywu', 'template_qr6lqdi', templateParams)
                    .then(
                        () => {
                            // saveOptToServer(code)
                            console.log('Send email successfully');
                        },
                        (error) => {
                            console.log(error);
                        },
                    );
                toast.success('Đặt lịch thành công');
                navigate('/appointment');
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            return;
        } finally {
            setLoading(false);
        }
    };
    return (
        <Group w={'100%'} justify="center">
            <LoadingOverlay visible={loading} />
            <ToastContainer style={{ marginTop: '100px' }} />
            <Group
                w={800}
                m={20}
                p={20}
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    borderRadius: '12px',
                }}
            >
                <Flex gap={10} align={'center'}>
                    {/* <CheckCircle htmlColor="#40C057" /> */}
                    <Text w={'100%'} c={'#5789cf'} size="xl" fw={500}>
                        Xác nhận đặt lịch
                    </Text>
                </Flex>
                <Progress color={'green'} w={'100%'} animated value={80} />

                <SimpleGrid w={'100%'} cols={{ xl: 2, sm: 1 }}>
                    {/* User Information Section */}
                    <Flex justify="flex-start" direction={'column'} gap={20}>
                        <Text w={'100%'} fw={500}>
                            Thông tin người đặt:
                        </Text>
                        <Flex gap={20} direction={'column'}>
                            <Group>
                                <Avatar
                                    size={'lg'}
                                    src={user.avatar_url || null}
                                    name={formData.ownerName}
                                />
                                <Text fw={500}>{formData.ownerName}</Text>
                            </Group>
                            <Text>
                                <b>Số điện thoại: </b>
                                {formData.ownerPhone}
                            </Text>
                            <Text>
                                <b>Email: </b>
                                {formData.ownerEmail}
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex justify="flex-start" direction={'column'} gap={20}>
                        <Text w={'100%'} fw={500}>
                            Thông tin cuộc hẹn:
                        </Text>
                        <Flex gap={20} direction={'column'}>
                            <Text>
                                <b>Thú cưng: </b>
                                {formData.pet.name}
                            </Text>
                            <Text>
                                <b>Bác sĩ: </b>
                                {formData.doctor.username}
                            </Text>
                            <Text>
                                <b>Ngày: </b>
                                {formData.date}
                            </Text>
                            <Text>
                                <b>Giờ: </b>
                                {formData.time.slice(0, -3)}
                            </Text>
                            <Text>
                                <b>Ghi chú: </b>
                                {formData.notes || 'Không có ghi chú'}
                            </Text>
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Group>
            <Group w={'100%'} justify="center" gap={30}>
                <Button
                    onClick={() => navigate(-1)}
                    variant="transparent"
                    disabled={loading}
                >
                    Quay lại
                </Button>
                <Button onClick={handleBooking} loading={loading}>
                    Đặt lịch
                </Button>
            </Group>
        </Group>
    );
}

export default AppointmentSummary;
