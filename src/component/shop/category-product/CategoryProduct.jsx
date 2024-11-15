import { Flex, Image, Text, Badge, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function CategoryProduct({ product }) {
    return (
        <Link
            to={`product/${product.id}`}
            style={{
                padding: '10px',
                borderRadius: '12px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
            }}
        >
            <Flex
                direction={'column'}
                w={240}
                p={20}
                bg={'#fff'}
                style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}
            >
                <Image
                    src={product.images}
                    alt={product.name}
                    style={{
                        borderRadius: '8px',
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        marginBottom: '10px',
                    }}
                />
                <Text
                    align="center"
                    weight={500}
                    size="md"
                    mt="md"
                    color="dark"
                    style={{
                        minHeight: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {product.name.length > 20
                        ? `${product.name.slice(0, 17)}...`
                        : product.name}
                </Text>
                <Text
                    align="center"
                    size="sm"
                    color="gray"
                    style={{
                        minHeight: '30px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {product.description}
                </Text>
                <Group position="center" mt="xs">
                    <Badge color="blue">Danh mục: {product.category_id}</Badge>{' '}
                    <Text color="red" weight={700}>
                        $ {product.price}
                    </Text>
                </Group>
            </Flex>
        </Link>
    );
}

export default CategoryProduct;
