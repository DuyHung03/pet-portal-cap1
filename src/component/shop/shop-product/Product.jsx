import { Flex, Image, Text, Rating, Badge, Group } from '@mantine/core';
import { Link } from 'react-router-dom';

function Product({ product }) {
  return (
    <Link
      state={{ product }}
      to={`product/${product.id}`}
      style={{
        padding: '10px',
        // border: "1px solid #e0e0e0",
        borderRadius: '12px',
        // boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        },
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
          // src={product.image}
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
          {product.name.length > 20
            ? `${product.name.slice(0, 17)}...`
            : product.name}
        </Text>
        <Text
          ta="center"
          size="sm"
          c="gray"
          style={{
            minHeight: '30px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.description}
        </Text>
        <Group position="center" mt={'xs'}>
          <Badge color="blue">{product.Category.name}</Badge>
          <Text c={'red'} fw={700}>
            $ {product.price}
          </Text>
        </Group>
        <Group position="center" mt={'md'}>
          <Rating
            value={
              product.ProductReviews.reduce(
                (acc, review) => acc + review.rating,
                0,
              ) / product.ProductReviews.length
            }
            readOnly
          />
          <Text size="xs" color="dimmed">
            ({product.ProductReviews.length} đánh giá)
          </Text>
        </Group>
      </Flex>
    </Link>
  );
}

export default Product;
