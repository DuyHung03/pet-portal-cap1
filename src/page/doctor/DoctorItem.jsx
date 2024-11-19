import { Badge, Button, Group, Image, Text } from '@mantine/core';
import { useAppointment } from '@store/useAppointment';
import { isOpen } from '@util/checkOpeningHours';
import { Link } from 'react-router-dom';

function DoctorItem({ doctor }) {
    let status;
    if (doctor) {
        status = isOpen(doctor?.opening_time, doctor?.closing_time);
    }
    const { setDoctor } = useAppointment();
    const handleMakeAppointment = () => {
        setDoctor(doctor);
    };

    return (
        <Link to={`${doctor.id}`} state={doctor} style={{ width: '100%' }}>
            <Group
                gap={20}
                bg={'white'}
                p={20}
                style={{
                    borderRadius: '16px',
                    boxShadow:
                        'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
                }}
            >
                <Group w={'100%'} justify="center">
                    <Image
                        src={
                            doctor.avatar_url
                                ? doctor.avatar_url
                                : 'https://img.freepik.com/premium-vector/vector-doctor-medical-hospital-health-medicine-illustration-care-man-clinic-people-profes_1013341-112928.jpg?semt=ais_hybrid'
                        }
                        alt="img"
                        w={'100%'}
                        h={160}
                        radius={'12px'}
                    />
                </Group>
                <Text w={'100%'} fw={600} size="lg" ta={'center'}>
                    BS.{doctor.username}
                </Text>
                <Text ta={'center'} w={'100%'} lineClamp={2}>
                    <b>Địa chỉ:</b> {doctor.clinic_address}
                </Text>
                <Group w={'100%'} justify="center">
                    {status ? (
                        <Badge color="green">Đang hoạt động</Badge>
                    ) : (
                        <Badge color="red">Đã đóng cửa</Badge>
                    )}
                </Group>
                <Group>
                    <Button radius={'xl'} w={'100%'} variant="light">
                        Xem thông tin
                    </Button>
                    <Link
                        style={{ width: '100%' }}
                        to={'/appointment/make-appointment'}
                    >
                        <Button
                            bg={'#5789cf'}
                            radius={'xl'}
                            w={'100%'}
                            onClick={handleMakeAppointment}
                        >
                            Đặt lịch hẹn
                        </Button>
                    </Link>
                </Group>
            </Group>
        </Link>
    );
}

export default DoctorItem;
