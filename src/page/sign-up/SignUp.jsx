import { Button, Center, Flex, Group, Image, Loader, Text, TextInput } from '@mantine/core';
import { isNotEmpty, matchesField, useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.png';
import axiosInstance from '../../network/httpRequest';
const SignUp = () => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '', confirmPassword: '', username: '' },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) =>
                value.length < 8 ? 'Password must have at least 8 characters' : null,
            confirmPassword: matchesField('password', 'Passwords are not the same'),
            username: isNotEmpty('Username must not empty'),
        },
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleSignUp = async () => {
        try {
            setLoading(true);
            const formData = {
                username: form.getValues().username,
                password: form.getValues().password,
                email: form.getValues().email,
            };
            const res = await axiosInstance.post('auth/register', JSON.stringify(formData));
            console.log(res);
            if (res.status === 201) {
                toast.success('Register successfully;');
                setTimeout(() => {
                    navigate('/auth/verify');
                }, 1000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <Group w={'100%'} justify='center' align='center'>
                <Group p={24} display={'flex'} align='center' justify='center'>
                    <Flex justify={'center'} align={'center'} direction={'column'}>
                        <Link to={'/'}>
                            <Image src={logo} alt='logo' w={200} />
                        </Link>

                        <Text fw={600} size={'xl'} lts={1.5} mt={'lg'} c={'cyan'}>
                            CREATE NEW ACCOUNT
                        </Text>
                        <Group mt={30}>
                            <form onSubmit={form.onSubmit(handleSignUp)}>
                                <TextInput
                                    w={300}
                                    size='md'
                                    label='Email'
                                    placeholder='Email'
                                    key={form.key('email')}
                                    {...form.getInputProps('email')}
                                />

                                <TextInput
                                    w={300}
                                    size='md'
                                    mt='sm'
                                    label='Username'
                                    placeholder='Username'
                                    key={form.key('username')}
                                    {...form.getInputProps('username')}
                                />

                                <TextInput
                                    type='password'
                                    size='md'
                                    mt='sm'
                                    label='Password'
                                    placeholder='Password'
                                    key={form.key('password')}
                                    {...form.getInputProps('password')}
                                />

                                <TextInput
                                    type='password'
                                    size='md'
                                    mt='sm'
                                    label='Confirm Password'
                                    placeholder='Confirm Password'
                                    key={form.key('confirmPassword')}
                                    {...form.getInputProps('confirmPassword')}
                                />

                                <Group justify='flex-end' mt='md' grow c='cyan'>
                                    {loading ? (
                                        <Center>
                                            <Loader size={26} />
                                        </Center>
                                    ) : (
                                        <Button type='submit' mt={'sm'}>
                                            SignUp
                                        </Button>
                                    )}
                                </Group>

                                <Group justify='flex-start' mt='md' mb={'md'}>
                                    <Link to='/login'>
                                        <Text size='md' c='cyan' fw='500'>
                                            Login
                                        </Text>
                                    </Link>
                                </Group>
                            </form>
                        </Group>
                    </Flex>
                </Group>
            </Group>
        </>
    );
};

export default SignUp;
