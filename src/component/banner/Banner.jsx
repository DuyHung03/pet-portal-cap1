import { Flex, Group, Image, TextInput } from '@mantine/core';
import { Send } from '@mui/icons-material';

function Banner() {
    return (
        <Flex w={'100%'}>
            <Group w={360} bg={'#B1D4EE'} justify='center' align='center' p={20}>
                <Image
                    src={
                        'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2023/12/07171554/bulldog.webp'
                    }
                />
                <Image
                    src={
                        'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2024/04/22113705/If-youve-got-dog-questions-weve-got-dog-answers.webp'
                    }
                />
                <TextInput
                    w={250}
                    radius={'xl'}
                    size='md'
                    placeholder='Email của bạn'
                    rightSectionPointerEvents='all'
                    rightSection={<Send color='primary' />}
                />
            </Group>

            <Group>
                <Image
                    src={
                        'https://png.pngtree.com/background/20210710/original/pngtree-cute-pet-cartoon-fresh-hand-painted-banner-picture-image_1031084.jpg'
                    }
                />
            </Group>
        </Flex>
    );
}

export default Banner;
