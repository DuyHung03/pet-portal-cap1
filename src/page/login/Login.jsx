import { Button, Center, Flex, Group, Image, Loader, Text, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.png';

const Login = () => {
    // const { setUser } = useUserStore();
    // const { login, isAuthenticated } = useAuthStore();
    // const navigate = useNavigate();
    // const location = useLocation();

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate('/');
    //     }
    // }, [isAuthenticated, navigate]);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },

        validate: {
            email: isEmail('Invalid email'),
            password: hasLength({ min: 8, max: 20 }, 'Password must have at least 8 letters'),
        },
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // try {
        //     setLoading(true);
        //     const formData = {
        //         email: form.getValues().email,
        //         password: form.getValues().password,
        //     };
        //     const res = await axiosInstance.post('auth/login', JSON.stringify(formData));
        //     if (res.data.code === 200) {
        //         const user = res.data.result.user;
        //         const role = res.data.result.user.role;
        //         if (role.id == 1) {
        //             setUser({
        //                 userId: user.userId,
        //                 email: user.email,
        //                 phone: user.phone,
        //                 address: user.address,
        //                 photoUrl: user.photoUrl,
        //                 name: user.name,
        //                 birthday: user.birthday,
        //                 gender: user.gender,
        //             });
        //             login(role.name);
        //             console.log(location);
        //             navigate(location?.state?.prevUrl ? location.state.prevUrl : '/');
        //         } else {
        //             toast.error('Invalid user');
        //         }
        //     } else {
        //         form.setFieldError('email', 'Wrong email or password');
        //         form.setFieldError('password', 'Wrong email or password');
        //     }
        // } catch (error) {
        //     console.error('Login failed:', error);
        //     toast.error('Server error !');
        // } finally {
        //     setLoading(false);
        // }
    };

    return (
        <>
            <ToastContainer />
            <Group p={24} display={'flex'} align='center' justify='center'>
                <Flex justify={'center'} align={'center'} direction={'column'}>
                    <Link to={'/'}>
                        <Image src={logo} alt='logo' w={200} />
                    </Link>

                    <Text fw={600} size={'xl'} lts={1.5} mt={'lg'} c={'cyan'}>
                        PLEASE LOGIN
                    </Text>
                    <Group mt={30}>
                        <form onSubmit={form.onSubmit(handleLogin)}>
                            <TextInput
                                w={300}
                                size='md'
                                label='Email'
                                placeholder='Email'
                                key={form.key('email')}
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                type='password'
                                size='md'
                                mt='sm'
                                max={20}
                                min={8}
                                label='Password'
                                placeholder='Password'
                                key={form.key('password')}
                                {...form.getInputProps('password')}
                            />

                            <Group justify='flex-start' mt='md'>
                                <Link to='/signup'>
                                    <Text size='sm' c='cyan' fw='500'>
                                        Forgot password?
                                    </Text>
                                </Link>
                            </Group>

                            <Group justify='flex-end' mt='md' grow c='cyan'>
                                {loading ? (
                                    <Center>
                                        <Loader size={26} />
                                    </Center>
                                ) : (
                                    <Button type='submit' size=''>
                                        Login
                                    </Button>
                                )}
                            </Group>

                            <Group justify='space-between' mt='md' mb={'md'}>
                                <Link to='/signup'>
                                    <Text size='md' c='cyan' fw='500'>
                                        Sign up
                                    </Text>
                                </Link>
                            </Group>
                        </form>
                    </Group>

                    {/* <Button
                        h={36}
                        leftSection={<Image src={gg_logo} alt='' w={24} />}
                        variant='outline'
                        c={'gray'}
                        color='gray'
                        fullWidth
                    >
                        Connect with Google
                    </Button> */}
                </Flex>
            </Group>
        </>
    );
};

export default Login;
