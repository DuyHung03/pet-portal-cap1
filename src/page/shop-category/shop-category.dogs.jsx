import { useState, useEffect } from 'react';
import { Button, Group, Loader, Text } from '@mantine/core';
import { ArrowForward } from '@mui/icons-material';
import ShopNavBar from '../../component/shop/shop-nav/ShopNavBar';
import CategoryProduct from '../../component/shop/category-product/CategoryProduct';
import useFetchData from '../../hooks/useFetchData';

function ShopCategory() {
    const [skip, setSkip] = useState(0);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const params = { limit: 10, skip };

    const { data, loading, error } = useFetchData('/categories/type/', params);

    useEffect(() => {
        if (data) {
            setCategoryProducts((prevProducts) => [
                ...prevProducts,
                ...data.data,
            ]);
            if (data.data.length < 8) {
                setHasMore(false);
            }
        }
    }, [data]);

    const loadMoreCategoryProducts = () => {
        if (hasMore) {
            setSkip((prevSkip) => prevSkip + 8);
        }
    };

    return (
        <Group w={'100%'} gap={0} bg="#f9f9f9">
            <ShopNavBar />
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
                    Danh mục sản phẩm
                </Text>

                {loading && categoryProducts.length === 0 ? (
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
                        {categoryProducts.map((product, index) => (
                            <CategoryProduct key={index} product={product} />
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
                        onClick={loadMoreCategoryProducts}
                    >
                        Xem thêm sản phẩm
                    </Button>
                )}
            </Group>
        </Group>
    );
}

export default ShopCategory;
