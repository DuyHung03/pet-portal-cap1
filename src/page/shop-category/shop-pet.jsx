import { useState, useEffect } from 'react';
import { Group, Loader, Text } from '@mantine/core';
import CategoryPet from '../../component/shop/category-product/CategoryProduct';
import axiosInstance from '@network/httpRequest';

function ShopPet() {
    const [categoryPets, setCategoryPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(
                    '/categories/search?type=Thú cưng',
                );
                console.log(response.data);
                const allProducts = response.data.data.flatMap(
                    (category) => category.CategoryPets,
                );
                console.log(allProducts);

                setCategoryPets(allProducts);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
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
                    Danh Mục Thú Cưng
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
                        {categoryPets.map((product, index) => (
                            <CategoryPet key={product.id} product={product} />
                        ))}
                    </Group>
                )}
            </Group>
        </Group>
    );
}

export default ShopPet;
