import { Card, CardSection, Flex, Image, Rating, Text, UnstyledButton } from '@mantine/core';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function SearchItem({ product }) {
    return (
        <Link state={{ product }} to={`/shop/product/${product.id}`}>
            <Card withBorder w={250} shadow='md' radius={'md'}>
                <CardSection>
                    <Image
                        src={product.images}
                        h={250}
                        fallbackSrc={'https://images.penguinrandomhouse.com/cover/9781250301697'}
                        alt={product.name}
                    />
                </CardSection>

                <Text fw={600} truncate={'end'} size='xl' mt={'md'}>
                    {product.name}
                </Text>
                <Text c='blue' fw={500} size='xl' mb={'xs'}>
                    $ {product.price}
                </Text>
                <Flex direction={'row'} justify={'space-between'} align={'center'}>
                    <Rating value={product.rating ?? 4} />
                    <UnstyledButton>
                        <FavoriteBorderOutlined />
                    </UnstyledButton>
                </Flex>
            </Card>
        </Link>
    );
}

export default SearchItem;
