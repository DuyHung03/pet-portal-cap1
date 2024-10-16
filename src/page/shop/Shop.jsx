import { Button, Group, Image, Loader, Text } from '@mantine/core';
import { ArrowForward } from '@mui/icons-material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ShopBanner from '../../component/shop/shop-banner/ShopBanner';
import Product from '../../component/shop/shop-product/Product';
import useFetchData from '../../hooks/useFetchData';

function Shop() {
    const params = useMemo(() => ({ limit: 10 }), []);

<<<<<<< HEAD
    const { data, loading, error } = useFetchData('/products', params);

    const products = data?.products || [];

    return (
        <Group w={'100%'} gap={0} bg='#f9f9f9'>
            <ShopBanner />
            <Group
                w='80%'
                mx='auto'
                justify='center'
                align='center'
                bg='#f9f9f9'
                p={24}
                radius='md'
                shadow='lg'
                style={{
                    paddingTop: '40px',
                    paddingBottom: '40px',
                }}
            >
                <Text
                    ff='Roboto Slab'
                    size='39px'
                    ta='center'
                    w='100%'
                    c='#003594'
                    style={{
                        fontWeight: 'bold',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                        paddingBottom: '20px',
                        borderBottom: '2px solid #003594',
                    }}
                >
                    Đề xuất
                </Text>

                {loading ? (
                    <Group mt={20} mb={20} w='100%' justify='center'>
                        <Loader type='bars' />
                    </Group>
                ) : (
                    <Group
                        mt={20}
                        mb={20}
                        wrap='wrap'
                        justify='space-between'
                        spacing='lg'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '20px',
                            width: '100%',
                        }}
                    >
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </Group>
                )}

                <Link to='/'>
                    <Button
                        size='xl'
                        rightSection={<ArrowForward />}
                        variant='gradient'
                        gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                        radius='xl'
                        style={{
                            marginTop: '20px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Xem thêm sản phẩm
                    </Button>
                </Link>
            </Group>
            <Group
                w='80%'
                mx='auto'
                justify='center'
                align='center'
                bg='#f9f9f9'
                p={24}
                radius='md'
                shadow='lg'
                style={{
                    paddingTop: '40px',
                    paddingBottom: '40px',
                }}
            >
                <Text
                    ff='Roboto Slab'
                    size='39px'
                    ta='center'
                    w='100%'
                    c='#003594'
                    style={{
                        fontWeight: 'bold',
                        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
                        paddingBottom: '20px',
                        borderBottom: '2px solid #003594',
                    }}
                >
                    Sản Phẩm Bán Chạy
                </Text>

                {loading ? (
                    <Group mt={20} mb={20} w='100%' justify='center'>
                        <Loader type='bars' />
                    </Group>
                ) : (
                    <Group
                        mt={20}
                        mb={20}
                        wrap='wrap'
                        justify='space-between'
                        spacing='lg'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '20px',
                            width: '100%',
                        }}
                    >
                        {products.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </Group>
                )}

                <Link to='/'>
                    <Button
                        size='xl'
                        rightSection={<ArrowForward />}
                        variant='gradient'
                        gradient={{ from: 'teal', to: 'lime', deg: 45 }}
                        radius='xl'
                        style={{
                            marginTop: '20px',
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Xem thêm sản phẩm
                    </Button>
                </Link>
            </Group>
            <div
                style={{
                    width: '100%',
                    height: '400px',
                    position: 'relative',
                }}
            >
                <Image
                    src={'https://shop.akc.org/cdn/shop/files/Why_AKC_2_1440x440.png?v=1634144065'}
                    alt='Shop Banner'
                    style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
                <Text
                    size='40px'
                    ff={'Roboto Slab'}
                    pos={'absolute'}
                    top={'40%'}
                    left={'35%'}
                    c={'white'}
                >
                    Sản phẩm dành cho cún yêu của bạn
                </Text>
            </div>
        </Group>
    );
=======
  const { data, loading, error } = useFetchData('/products', params);

  const products = data?.data || [];

  return (
    <Group w={'100%'} gap={0} bg="#f9f9f9">
      <ShopBanner />
      <Group
        w="80%"
        mx="auto"
        justify="center"
        align="center"
        bg="#f9f9f9"
        p={24}
        radius="md"
        shadow="lg"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <Text
          ff="Roboto Slab"
          size="39px"
          ta="center"
          w="100%"
          c="#003594"
          style={{
            fontWeight: 'bold',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
            paddingBottom: '20px',
            borderBottom: '2px solid #003594',
          }}
        >
          Đề xuất
        </Text>

        {loading ? (
          <Group mt={20} mb={20} w="100%" justify="center">
            <Loader type="bars" />
          </Group>
        ) : (
          <Group
            mt={20}
            mb={20}
            wrap="wrap"
            justify="space-between"
            spacing="lg"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              width: '100%',
            }}
          >
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </Group>
        )}

        <Link to="/">
          <Button
            size="xl"
            rightSection={<ArrowForward />}
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 45 }}
            radius="xl"
            style={{
              marginTop: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              textTransform: 'uppercase',
            }}
          >
            Xem thêm sản phẩm
          </Button>
        </Link>
      </Group>
      <Group
        w="80%"
        mx="auto"
        justify="center"
        align="center"
        bg="#f9f9f9"
        p={24}
        radius="md"
        shadow="lg"
        style={{
          paddingTop: '40px',
          paddingBottom: '40px',
        }}
      >
        <Text
          ff="Roboto Slab"
          size="39px"
          ta="center"
          w="100%"
          c="#003594"
          style={{
            fontWeight: 'bold',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
            paddingBottom: '20px',
            borderBottom: '2px solid #003594',
          }}
        >
          Sản Phẩm Bán Chạy
        </Text>

        {loading ? (
          <Group mt={20} mb={20} w="100%" justify="center">
            <Loader type="bars" />
          </Group>
        ) : (
          <Group
            mt={20}
            mb={20}
            wrap="wrap"
            justify="space-between"
            spacing="lg"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              width: '100%',
            }}
          >
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </Group>
        )}

        <Link to="/">
          <Button
            size="xl"
            rightSection={<ArrowForward />}
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 45 }}
            radius="xl"
            style={{
              marginTop: '20px',
              paddingLeft: '20px',
              paddingRight: '20px',
              textTransform: 'uppercase',
            }}
          >
            Xem thêm sản phẩm
          </Button>
        </Link>
      </Group>
      <div
        style={{
          width: '100%',
          height: '400px',
          position: 'relative',
        }}
      >
        <Image
          src={
            'https://shop.akc.org/cdn/shop/files/Why_AKC_2_1440x440.png?v=1634144065'
          }
          alt="Shop Banner"
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <Text
          size="40px"
          ff={'Roboto Slab'}
          pos={'absolute'}
          top={'40%'}
          left={'35%'}
          c={'white'}
        >
          Sản phẩm dành cho cún yêu của bạn
        </Text>
      </div>
    </Group>
  );
>>>>>>> 22787f03128bd5c87206b03e4350024b292b0c52
}

export default Shop;
