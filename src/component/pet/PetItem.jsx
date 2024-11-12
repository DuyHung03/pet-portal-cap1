import { Button, Group, Image, Text } from '@mantine/core';
import { useAppointment } from '@store/useAppointment';
import { Link, useNavigate } from 'react-router-dom';

function PetItem({ pet }) {
    const navigate = useNavigate();
    const { setPet } = useAppointment();

    const handleMakeAppointment = () => {
        setPet(pet);
        navigate('');
    };

    return (
        <Link to={`${pet.id}`} state={pet}>
            <Group
                w={'100%'}
                p={20}
                style={{
                    boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
                    borderRadius: '16px',
                }}
            >
                <Image
                    h={160}
                    fallbackSrc=""
                    src={
                        pet.images
                            ? pet.images
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MOu_ZPbXm9CeVnuM73D2sbQgohkJrMdD4Q&s'
                    }
                    radius={'12'}
                />

                <Text w={'100%'}>
                    <b>Tên:</b> {pet.name}
                </Text>
                <Text w={'100%'}>
                    <b>{pet.Category.name}:</b> {pet.breed}
                </Text>
                <Text w={'100%'}>
                    <b>Tuổi:</b> {pet.age}
                </Text>
                <Link
                    to={'/appointment/make-appointment'}
                    style={{ width: '100%' }}
                >
                    <Button
                        onClick={handleMakeAppointment}
                        w={'100%'}
                        bg="#5789cf"
                    >
                        Đặt lịch khám bệnh
                    </Button>
                </Link>
            </Group>
        </Link>
    );
}

export default PetItem;
