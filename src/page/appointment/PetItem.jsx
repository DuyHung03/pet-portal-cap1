import { Button, Group, Image, SimpleGrid, Text } from '@mantine/core';
import { useAppointment } from '@store/useAppointment';

function PetItem({ pet, closePetModal }) {
    const { setPet } = useAppointment();

    const onSelectPet = () => {
        setPet(pet);
        closePetModal();
    };

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
                            pet.images
                                ? pet.images
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MOu_ZPbXm9CeVnuM73D2sbQgohkJrMdD4Q&s'
                        }
                        radius={'12'}
                    />
                </Group>
                <Group align="flex-start" justify="center">
                    <Text w={'100%'}>
                        <b>Tên:</b> {pet.name}
                    </Text>
                    <Text w={'100%'}>
                        <b>{pet.Category.name}:</b> {pet.breed}
                    </Text>
                    <Text w={'100%'}>
                        <b>Tuổi:</b> {pet.age}
                    </Text>
                </Group>
            </SimpleGrid>
            <Button onClick={onSelectPet} w={'100%'} bg="#5789cf">
                Chọn thú cưng
            </Button>
        </Group>
    );
}

export default PetItem;
