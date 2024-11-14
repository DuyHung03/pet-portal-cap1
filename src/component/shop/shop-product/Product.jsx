import {
    Flex,
    Image,
    Text,
    Rating,
    Badge,
    Group,
    Tooltip,
    Button,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Product({ product }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            state={{ product }}
            to={`product/${product.id}`}
            style={{
                padding: '10px',
                borderRadius: '12px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                },
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Flex
                direction={'column'}
                w={240}
                p={20}
                bg={'#fff'}
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Image
                    // src={product.images || 'https://via.placeholder.com/240'}
                    src={
                        'https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg'
                    }
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
                    ta="center"
                    fw={500}
                    size="md"
                    mt="md"
                    c="dark"
                    style={{
                        minHeight: '40px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {product.name}
                </Text>

                <Group position="center" mt={'xs'}>
                    <Badge color="blue">
                        {product.Category?.name || 'N/A'}
                    </Badge>
                </Group>

                <Text
                    ta="center"
                    fw={700}
                    c="red"
                    mt="xs"
                    style={{ fontSize: '18px', lineHeight: '1.2' }}
                >
                    {parseInt(product.price).toLocaleString()} VND
                </Text>

                <Group position="center" mt={'md'}>
                    <Rating
                        value={
                            product.ProductReviews.length
                                ? product.ProductReviews.reduce(
                                      (acc, review) => acc + review.rating,
                                      0,
                                  ) / product.ProductReviews.length
                                : 0
                        }
                        readOnly
                    />
                    <Text size="xs" color="dimmed">
                        ({product.ProductReviews.length} đánh giá)
                    </Text>
                </Group>

                {hovered && (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        bg="rgba(0, 0, 0, 0.7)"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '15px',
                            textAlign: 'center',
                            opacity: 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        <Text fw={700} size="lg">
                            {product.name}
                        </Text>
                        <Text size="sm" mt="xs">
                            {product.description}
                        </Text>
                        <Button mt="md" color="yellow" size="xs">
                            Xem chi tiết
                        </Button>
                    </Flex>
                )}
            </Flex>
        </Link>
    );
}

export default Product;
