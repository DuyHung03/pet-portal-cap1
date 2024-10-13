import { Flex, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function Product({ product }) {
    return (
        <Link state={{ product }} to={`product/${product.id}`}>
            <Flex
                direction={'column'}
                w={240}
                p={20}
                bg={'#fff'}
                style={{ border: '1px solid #000' }}
            >
                <Image
                    src={
                        'https://shop.akc.org/cdn/shop/files/customphotofrisby2_200x160.jpg?v=1709138424'
                    }
                />
                <Text ta={'center'} fw={500} size='md' mt={'md'} c={'dark'}>
                    {product.name}
                </Text>

                <Text ta={'center'} size='25px' fw={500} mt={'md'} c={'blue'}>
                    $ {product.price}
                </Text>
            </Flex>
        </Link>
    );
}

export default Product;
