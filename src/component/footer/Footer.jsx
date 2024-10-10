import { Group, Text } from '@mantine/core';

function Footer() {
    return (
        <Group
            w={'100%'}
            bg={'#5789CF'}
            p={24}
            justify='center'
            align='center'
            c={'#fff'}
            gap={100}
        >
            <Text size='lg' fw={500}>
                Cổng thông tin thú cưng - Capstone 1
            </Text>
            <Text size='lg' fw={500}>
                Liên hệ: 0987654321
            </Text>
            <Text size='lg' fw={500}>
                Email: group1@gmail.com
            </Text>
        </Group>
    );
}

export default Footer;
