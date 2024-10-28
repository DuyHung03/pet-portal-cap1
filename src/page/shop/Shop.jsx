import { useState, useMemo, useEffect } from 'react';
import { Button, Group, Loader, Text } from '@mantine/core';
import { ArrowForward } from '@mui/icons-material';
import ShopBanner from '../../component/shop/shop-banner/ShopBanner';
import Product from '../../component/shop/shop-product/Product';
import useFetchData from '../../hooks/useFetchData';

function Shop() {
    const [skip, setSkip] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const params = useMemo(() => ({ limit: 8, skip }), [skip]);

    const { data, loading, error } = useFetchData('/products', params);

    useEffect(() => {
        if (data) {
            setAllProducts((prevProducts) => [...prevProducts, ...data.data]);
            if (data.data.length < 8) {
                setHasMore(false);
            }
        }
    }, [data]);

    const loadMoreProducts = () => {
        if (hasMore) {
            setSkip((prevSkip) => prevSkip + 8);
        }
    };

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

                {loading && allProducts.length === 0 ? (
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
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '20px',
                            width: '100%',
                        }}
                    >
                        {allProducts.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </Group>
                )}

                {hasMore && (
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
                        onClick={loadMoreProducts}
                    >
                        Xem thêm sản phẩm
                    </Button>
                )}
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
                    Đề xuất
                </Text>

                {loading && allProducts.length === 0 ? (
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
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '20px',
                            width: '100%',
                        }}
                    >
                        {allProducts.map((product, index) => (
                            <Product key={index} product={product} />
                        ))}
                    </Group>
                )}

                {hasMore && (
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
                        onClick={loadMoreProducts}
                    >
                        Xem thêm sản phẩm
                    </Button>
                )}
            </Group>
        </Group>
    );
}

export default Shop;
