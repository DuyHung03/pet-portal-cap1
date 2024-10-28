import { GridCol, Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function PetItem({ pet }) {
    return (
        <Link to={`${pet.id}`} state={pet}>
            <GridCol span={'content'} w={350}>
                <Group
                    w={'100%'}
                    p={20}
                    style={{
                        boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
                        borderRadius: '16px',
                    }}
                >
                    <Image
                        w={350}
                        h={270}
                        fallbackSrc=""
                        src={
                            pet.images
                                ? pet.images
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MOu_ZPbXm9CeVnuM73D2sbQgohkJrMdD4Q&s'
                        }
                        radius={'12'}
                    />

                    <Text w={'100%'}>Tên {pet.name}</Text>
                    <Text w={'100%'}>
                        {pet.Category.name}: {pet.breed}
                    </Text>
                    <Text w={'100%'}>Tuổi: {pet.age}</Text>
                </Group>
            </GridCol>
        </Link>
    );
}

export default PetItem;
