import { Flex, Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function PostItem() {
  return (
    <Link to={'/'}>
      <Flex direction={'column'}>
        <Group
          w={360}
          h={250}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        >
          <Image
            src={
              'https://png.pngtree.com/background/20210710/original/pngtree-cute-pet-cartoon-fresh-hand-painted-banner-picture-image_1031084.jpg'
            }
            w={'100%'}
            h={'100%'}
          />
        </Group>
        <Text size="xl" w={360} p={24} c={'#5789CF'}>
          Hôm nay trời đẹp vcl dắt cho đi dạo đi mấy m
        </Text>
      </Flex>
    </Link>
  );
}

export default PostItem;
