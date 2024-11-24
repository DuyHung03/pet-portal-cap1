import { useState, useEffect } from 'react';
import { Group, Loader, Text } from '@mantine/core';
import CategoryProduct from '../../component/shop/category-product/CategoryProduct';
import axiosInstance from '@network/httpRequest';
import Product from 'component/shop/shop-product/Product';

function ShopProduce() {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(
                    '/categories/search?type=Sản phẩm',
                );
                const allProducts = response.data.data.flatMap(
                    (category) => category.CategoryProducts,
                );
                setCategoryProducts(allProducts);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Group w="100%" gap={0} bg="#f9f9f9">
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

                {loading ? (
                    <Group mt={20} mb={20} w="100%" justify="center">
                        <Loader type="bars" />
                    </Group>
                ) : error ? (
                    <Text color="red" mt={20}>
                        Lỗi tải dữ liệu: {error}
                    </Text>
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
                        {categoryProducts.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </Group>
                )}
            </Group>
        </Group>
    );
}

export default ShopProduce;
