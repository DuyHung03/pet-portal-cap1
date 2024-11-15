import {
    Avatar,
    Button,
    Flex,
    Group,
    Image,
    Modal,
    Progress,
    Select,
    SimpleGrid,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Add } from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { useAppointment } from '@store/useAppointment';
import { generateTimeSlots } from '@util/generateTimeSlots';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DoctorItem from './DoctorItem';
import PetItem from './PetItem';

function MakeAppointment() {
    const { doctor, pet } = useAppointment();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [openedPetModal, { open: openPetModal, close: closePetModal }] =
        useDisclosure(false);
    const [
        openedDoctorModal,
        { open: openDoctorModal, close: closeDoctorModal },
    ] = useDisclosure(false);
    console.log(doctor);
    const [pets, setPets] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const form = useForm({
        initialValues: {
            date: null,
            time: '',
            ownerName: user.username,
            ownerEmail: user.email,
            ownerPhone: user.phone,
            notes: '',
        },
        validate: {
            date: (value) => (value ? null : 'Vui lòng chọn ngày hẹn'),
            time: (value) => (value ? null : 'Vui lòng chọn giờ hẹn'),
            ownerName: (value) =>
                value ? null : 'Vui lòng nhập tên chủ thú cưng',
            ownerEmail: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Vui lòng nhập email hợp lệ',
            ownerPhone: (value) =>
                /^\d{10,11}$/.test(value)
                    ? null
                    : 'Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)',
        },
    });

    let timeSlots = [];
    if (doctor != null) {
        timeSlots = generateTimeSlots(
            doctor?.opening_time,
            doctor?.closing_time,
        );
    }

    const formattedDate = form.getValues().date
        ? dayjs(form.getValues().date).format('DD-MM-YYYY')
        : null;

    // const pets = JSON.parse(localStorage.getItem('pets'));
    // const doctors = JSON.parse(localStorage.getItem('doctors'));

    const fetchPets = async () => {
        const res = await axiosInstance.get(`pets/owner/${user.id}`, {
            withCredentials: true,
        });
        setDoctors(res.data?.data);
        localStorage.setItem('pets', JSON.stringify(res.data?.data));
    };
    const fetchDoctors = async () => {
        const res = await axiosInstance.get(`auth/doctors`, {
            withCredentials: true,
        });
        console.log(res);

        setDoctors(res.data?.doctors);
        localStorage.setItem('doctors', JSON.stringify(res.data?.doctors));
    };

    useEffect(() => {
        if (openedPetModal && pets.length === 0) {
            const storedPets = JSON.parse(localStorage.getItem('pets'));
            if (storedPets) {
                setPets(storedPets);
            } else {
                fetchPets();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedPetModal]);

    useEffect(() => {
        if (openedDoctorModal && doctors.length === 0) {
            const storedDoctors = JSON.parse(localStorage.getItem('doctors'));
            if (storedDoctors) {
                setDoctors(storedDoctors);
            } else {
                fetchDoctors();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedDoctorModal]);

    const onSubmitBookingForm = () => {
        if (!pet) {
            alert('Vui lòng chọn thú cưng mà bạn muốn đặt lịch khám');
            return;
        }
        if (!doctor) {
            alert('Vui lòng chọn bác sĩ mà bạn muốn đặt lịch khám');
            return;
        }
        if (form.validate().hasErrors) {
            return;
        }

        const formData = {
            pet: pet,
            doctor: doctor,
            date: formattedDate,
            time: form.getValues().time,
            ownerName: form.getValues().ownerName,
            ownerEmail: form.getValues().ownerEmail,
            ownerPhone: form.getValues().ownerPhone,
            notes: form.getValues().notes,
        };
        console.log(formData);
        navigate('confirmation', { state: { formData } });
    };

    return (
        <Group w={'100%'} justify="center" mb={100}>
            <Modal
                size={800}
                opened={openedPetModal}
                onClose={closePetModal}
                centered
                withCloseButton={false}
            >
                <Text w={'100%'} ta={'center'} p={20} fw={500} size="lg">
                    Chọn thú cưng để đặt lịch
                </Text>
                {pets?.length > 0 ? (
                    <SimpleGrid w={'100%'} cols={2}>
                        {pets.map((pet, index) => (
                            <PetItem
                                key={index}
                                pet={pet}
                                closePetModal={closePetModal}
                            />
                        ))}
                    </SimpleGrid>
                ) : (
                    <Group w={'100%'} justify="center">
                        <Text fs={'italic'} c={'gray'} w={'100%'} ta={'center'}>
                            Bạn chưa có thú cưng nào trong danh sách
                        </Text>
                        <Link to={'/your-pet/add-new-pet'}>
                            <Button leftSection={<Add />}>
                                Thêm thú cưng của bạn
                            </Button>
                        </Link>
                    </Group>
                )}
            </Modal>

            <Modal
                centered
                size={800}
                opened={openedDoctorModal}
                onClose={closeDoctorModal}
                withCloseButton={false}
            >
                <Text w={'100%'} ta={'center'} p={20} fw={500} size="lg">
                    Chọn bác sĩ để đặt lịch
                </Text>
                {!doctors?.length > 0 ? (
                    <Text w={'100%'} p={20} ta={'center'} fs={'italic'}>
                        Không tìm thấy bác sĩ
                    </Text>
                ) : (
                    <SimpleGrid w={'100%'} cols={2}>
                        {doctors.map((doctor, index) => (
                            <DoctorItem
                                key={index}
                                doctor={doctor}
                                closeDoctorModal={closeDoctorModal}
                            />
                        ))}
                    </SimpleGrid>
                )}
            </Modal>

            <Group
                w={800}
                mt={20}
                p={20}
                style={{
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                    borderRadius: '12px',
                }}
            >
                <Text fw={500} w={'100%'} c={'#5789cf'} size="xl">
                    Đặt lịch khám
                </Text>
                <Progress w={'100%'} value={50} color="green" animated />
                <Group w={'100%'}>
                    <SimpleGrid cols={2} w={'100%'}>
                        <Group>
                            <Group w={'100%'}>
                                <Flex gap={30} justify={'center'}>
                                    <Text fw={500}>Thông tin thú cưng:</Text>
                                    <Button
                                        style={{
                                            border: '1px dashed #ddd',
                                        }}
                                        variant="transparent"
                                        c={'#5789cf'}
                                        onClick={openPetModal}
                                    >
                                        <Add />
                                        Chọn thú cưng
                                    </Button>
                                </Flex>
                                {pet ? (
                                    <Flex
                                        w={'100%'}
                                        pr={30}
                                        pl={30}
                                        direction={'row'}
                                        align={'center'}
                                        gap={30}
                                    >
                                        <Image
                                            radius={'md'}
                                            w={104}
                                            src={
                                                pet.images
                                                    ? pet.images
                                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MOu_ZPbXm9CeVnuM73D2sbQgohkJrMdD4Q&s'
                                            }
                                        />
                                        <Flex direction={'column'}>
                                            <Flex
                                                gap={10}
                                                w={'100%'}
                                                align="center"
                                            >
                                                <Text fw={500}>
                                                    Tên thú cưng:
                                                </Text>
                                                <Text>{pet.name}</Text>
                                            </Flex>
                                            <Flex
                                                gap={10}
                                                w={'100%'}
                                                align="center"
                                            >
                                                <Text fw={500}>
                                                    Giống, loài:
                                                </Text>
                                                <Text>{pet.name}</Text>
                                            </Flex>
                                            <Flex
                                                gap={10}
                                                w={'100%'}
                                                align="center"
                                            >
                                                <Text fw={500}>Tuổi:</Text>
                                                <Text>{pet.age}</Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                ) : null}
                            </Group>
                            <Group w={'100%'}>
                                <Flex gap={30} justify={'center'}>
                                    <Text fw={500}>Thông tin bác sĩ:</Text>
                                    <Button
                                        style={{
                                            border: '1px dashed #ddd',
                                        }}
                                        variant="transparent"
                                        c={'#5789cf'}
                                        onClick={openDoctorModal}
                                    >
                                        <Add />
                                        Chọn bác sĩ
                                    </Button>
                                </Flex>
                                {doctor ? (
                                    <Flex
                                        w={'100%'}
                                        pr={30}
                                        pl={30}
                                        gap={30}
                                        align={'center'}
                                        direction={'row'}
                                    >
                                        <Avatar
                                            size={'xl'}
                                            src={
                                                doctor.avatar_url
                                                    ? doctor.avatar_url
                                                    : 'https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-112928.jpg?semt=ais_hybrid'
                                            }
                                        />
                                        <Flex direction={'column'}>
                                            <Flex
                                                gap={10}
                                                w={'100%'}
                                                align="center"
                                            >
                                                <Text fw={500}>BS:</Text>
                                                <Text>{doctor.username}</Text>
                                            </Flex>
                                            <Flex
                                                gap={10}
                                                w={'100%'}
                                                align="center"
                                            >
                                                <Text fw={500}>
                                                    Số điện thoại
                                                </Text>
                                                <Text>{doctor.phone}</Text>
                                            </Flex>
                                            <Flex
                                                gap={0}
                                                w={'100%'}
                                                align="center"
                                                wrap={'wrap'}
                                            >
                                                <Text fw={500} mr={10}>
                                                    Địa chỉ phòng khám:
                                                </Text>
                                                <Text>
                                                    {doctor.clinic_address}
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                ) : null}
                            </Group>
                            <Group w={'100%'} mt={20}>
                                <SimpleGrid cols={2} w={'100%'}>
                                    <TextInput
                                        label="Tên chủ thú cưng"
                                        placeholder="Nhập tên chủ thú cưng"
                                        {...form.getInputProps('ownerName')}
                                    />
                                    <TextInput
                                        label="Số điện thoại"
                                        placeholder="Nhập số điện thoại"
                                        {...form.getInputProps('ownerPhone')}
                                    />
                                </SimpleGrid>
                                <TextInput
                                    w={'100%'}
                                    label="Email"
                                    placeholder="Nhập email"
                                    {...form.getInputProps('ownerEmail')}
                                />
                                <SimpleGrid cols={2} w={'100%'}>
                                    <Select
                                        w={'100%'}
                                        withAsterisk
                                        label="Giờ Hẹn"
                                        placeholder="Chọn giờ"
                                        data={timeSlots.map((time) => ({
                                            value: time,
                                            label: time.slice(0, -3),
                                        }))}
                                        comboboxProps={{
                                            position: 'bottom-start',
                                            width: 150,
                                            dropdownPadding: 10,
                                        }}
                                        {...form.getInputProps('time')}
                                    />
                                    <Group w={'100%'} justify="center">
                                        <DatePickerInput
                                            withAsterisk
                                            label="Ngày hẹn"
                                            readOnly
                                            w={250}
                                            placeholder="Chọn ngày hẹn"
                                            valueFormat="DD-MM-YYYY"
                                            value={formattedDate}
                                            {...form.getInputProps('date')}
                                        />
                                    </Group>
                                </SimpleGrid>
                                <Textarea
                                    w={'100%'}
                                    label="Ghi Chú"
                                    placeholder="Ghi chú về cuộc hẹn (nếu có)"
                                    {...form.getInputProps('notes')}
                                />
                            </Group>
                        </Group>
                        {/* <Flex
                            w={'100%'}
                            direction={'column'}
                            justify="center"
                            align="flex-start"
                            gap={20}
                        > */}
                        <Group w={'100%'} justify="center" align="center">
                            <DatePicker
                                label="Ngày Hẹn"
                                placeholder="Chọn ngày"
                                {...form.getInputProps('date')}
                                locale="vi"
                                minDate={new Date()}
                                defaultChecked
                            />
                        </Group>
                        {/* </Flex> */}
                    </SimpleGrid>
                    <Group w={'100%'} justify="flex-end" mt="md">
                        <Button
                            w={200}
                            onClick={onSubmitBookingForm}
                            type="submit"
                        >
                            Tiến hành đặt Lịch
                        </Button>
                    </Group>
                </Group>
            </Group>
        </Group>
    );
}

export default MakeAppointment;
