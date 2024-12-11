import { Flex, Image, Text, Badge, Group, Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuthStore } from '@store/authStore';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart, loadCartFromStorage } from '@redux/slice/cartSlice';

function CategoryPet({ product }) {
    const [hovered, setHovered] = useState(false);
    const [searchButtonHovered, setSearchButtonHovered] = useState(false);
    const [cartButtonHovered, setCartButtonHovered] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(loadCartFromStorage(user.id));
        }
    }, [isAuthenticated, user, dispatch]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            try {
                const item = { ...product, quantity: 1 };
                await dispatch(addToCart({ userId: user.id, item }));
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
            } catch (error) {
                console.error(
                    'Error adding item to API:',
                    error.response?.data || error.message,
                );
            }
        }
    };

    const handleViewDetails = () => {
        navigate(`/shop/product/${product.id}`, { state: { product } });
    };

    return (
        <>
            {addedToCart && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0px',
                        right: '0px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '15px 20px',
                        borderRadius: '8px',
                        zIndex: 1000,
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.2)',
                    }}
                >
                    🐾 Sản phẩm đã được thêm vào giỏ hàng!
                </div>
            )}
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
                    boxShadow: hovered
                        ? '0px 10px 20px rgba(0, 0, 0, 0.15)'
                        : 'none',
                    transform: hovered ? 'scale(1.03)' : 'scale(1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Biểu tượng chân thú cưng */}
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        color: '#f59e0b',
                        fontSize: '30px',
                        opacity: 0.7,
                    }}
                >
                    <PetsIcon />
                </div>

                <Image
                    src={product.image || 'https://via.placeholder.com/150'}
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
                    <Badge
                        style={{
                            backgroundColor: '#f59e0b',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '5px 10px',
                            fontWeight: 'bold',
                        }}
                    >
                        {product.Category?.name || 'Thú cưng'}
                    </Badge>
                </Group>

                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    bg="rgba(0, 0, 0, 0.8)"
                    style={{
                        position: 'absolute',
                        bottom: hovered ? '0' : '-100%',
                        left: 0,
                        right: 0,
                        height: '50%',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '10px',
                        opacity: hovered ? 1 : 0,
                        transition: 'bottom 0.3s ease, opacity 0.3s ease',
                    }}
                >
                    <Button
                        variant="filled"
                        color="yellow"
                        radius="xl"
                        style={{
                            backgroundColor: searchButtonHovered
                                ? 'rgba(255, 200, 0, 0.5)'
                                : 'rgba(255, 255, 255, 0.2)',
                            marginBottom: '8px',
                            fontWeight: 'bold',
                        }}
                        onMouseEnter={() => setSearchButtonHovered(true)}
                        onMouseLeave={() => setSearchButtonHovered(false)}
                        onClick={handleViewDetails}
                    >
                        <SearchIcon style={{ marginRight: '8px' }} />
                        Xem Chi Tiết
                    </Button>
                    <Button
                        variant="filled"
                        color="yellow"
                        radius="xl"
                        style={{
                            backgroundColor: cartButtonHovered
                                ? 'rgba(255, 200, 0, 0.5)'
                                : 'rgba(255, 255, 255, 0.2)',
                            fontWeight: 'bold',
                        }}
                        onMouseEnter={() => setCartButtonHovered(true)}
                        onMouseLeave={() => setCartButtonHovered(false)}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCartIcon style={{ marginRight: '8px' }} />
                        Thêm Vào Giỏ
                    </Button>
                </Flex>
            </Flex>
        </>
    );
}

export default CategoryPet;
