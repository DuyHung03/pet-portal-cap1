import { Button, Group, Image, Loader, Text } from '@mantine/core';
import { ArrowForward } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ShopBanner from '../../component/shop/shop-banner/ShopBanner';
import Product from '../../component/shop/shop-product/Product';
import axiosInstance from '../../network/httpRequest';

function Shop() {
    const getBooks = async () => {
        const res = await axiosInstance.get('/products', {
            params: {
                limit: 10,
            },
        }); 
        console.log(res.data);

        return res.data.products;
    };

    const { data = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => getBooks(),
        staleTime: 1000 * 60 * 5, //5 mins
    });

    return (
        <Group w={'100%'} gap={0}>
            <ShopBanner />
            <Group w={'100%'} justify='center' bg={'#E5F4FF'} pt={24} pb={24}>
                <Group w={1440} justify='center'>
                    <Text ff={'Roboto Slab'} size='39px' ta={'center'} w={'100%'} c={'#003594'}>
                        Đề xuất
                    </Text>
                    {isLoading ? (
                        <Group mt={20} mb={20} w={'100%'} justify='center'>
                            <Loader type='bars' />
                        </Group>
                    ) : (
                        <Group mt={20} mb={20} wrap='wrap' justify='space-between'>
                            {data.map((product, index) => (
                                <Product key={index} product={product} />
                            ))}
                        </Group>
                    )}
                    <Link to='/'>
                        <Button
                            size='xl'
                            rightSection={<ArrowForward />}
                            variant='subtle'
                            radius={'xl'}
                        >
                            Xem thêm sản phẩm
                        </Button>
                    </Link>
                </Group>
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
}

export default Shop;