import { Badge, Button, Group, Image, SimpleGrid, Text } from '@mantine/core';
import { useAppointment } from '@store/useAppointment';
import { isOpen } from '@util/checkOpeningHours';

function DoctorItem({ doctor, closeDoctorModal }) {
    const status = isOpen(doctor.opening_time, doctor.closing_time);

    const { setDoctor } = useAppointment();

    const onSelectPet = () => {
        setDoctor(doctor);
        closeDoctorModal();
    };

    console.log(doctor);

    return (
        <Group
            w={'100%'}
            p={20}
            style={{
                boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
                borderRadius: '16px',
            }}
            gap={20}
        >
            <SimpleGrid cols={2}>
                <Group w={'100%'}>
                    <Image
                        h={160}
                        fallbackSrc=""
                        src={
                            doctor.avatar_url
                                ? doctor.avatar_url
                                : 'https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-112928.jpg?semt=ais_hybrid'
                        }
                        radius={'12'}
                    />
                </Group>
                <Group gap={10}>
                    <Text w={'100%'}>
                        <b>BS.</b> {doctor.username}
                    </Text>
                    <Text w={'100%'}>
                        <b>{doctor.experience_years} năm kinh nghiệm</b>
                    </Text>
                    <Text w={'100%'}>
                        <b>Số điện thoại:</b> {doctor.phone}
                    </Text>
                    <Text w={'100%'}>
                        <b>Địa chỉ:</b> {doctor.clinic_address}
                    </Text>
                    {status ? (
                        <Badge color="green">Đang hoạt động</Badge>
                    ) : (
                        <Badge color="red">Đã đóng cửa</Badge>
                    )}
                </Group>
            </SimpleGrid>
            <Button onClick={onSelectPet} w={'100%'} bg="#5789cf">
                Chọn bác sĩ
            </Button>
        </Group>
    );
}

export default DoctorItem;
