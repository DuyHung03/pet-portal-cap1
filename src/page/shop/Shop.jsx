import { useState, useEffect, useMemo } from 'react';
import { Group, Loader, Text, Pagination } from '@mantine/core';
import ShopBanner from '../../component/shop/shop-banner/ShopBanner';
import Product from '../../component/shop/shop-product/Product';
import useFetchData from '../../hooks/useFetchData';

function Shop() {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 8;

    const params = useMemo(() => {
        return { limit: pageSize, skip: (page - 1) * pageSize + 1 };
    }, [page]);

    const { data, loading, error } = useFetchData('/products', params);

    useEffect(() => {
        if (data && data.data) {
            setProducts(data.data);

            if (data.data.length < pageSize && page === 1) {
                setTotalPages(1);
            } else if (data.data.length === pageSize) {
                setTotalPages(page + 1);
            } else {
                setTotalPages(page);
            }
        }
    }, [data, page, pageSize]);

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

                {loading && products.length === 0 ? (
                    <Group mt={20} mb={20} w="100%" justify="center">
                        <Loader type="bars" />
                    </Group>
                ) : error ? (
                    <Text color="red">Đã xảy ra lỗi khi tải dữ liệu.</Text>
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
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </Group>
                )}

                <Pagination
                    page={page}
                    onChange={setPage}
                    total={totalPages}
                    size="lg"
                    radius="xl"
                    withControls
                    withEdges
                    style={{
                        marginTop: '20px',
                    }}
                />
            </Group>
        </Group>
    );
}

export default Shop;
