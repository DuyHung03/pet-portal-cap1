import { GridCol, Group, Image, Text } from '@mantine/core';

function PetItem({ pet }) {
    return (
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
                    w={'100%'}
                    fallbackSrc=""
                    src={
                        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png'
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
    );
}

export default PetItem;
