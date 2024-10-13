import { Button, Flex, Group, Image, Text, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/logo.png';
import axiosInstance from '../../network/httpRequest';
function VerifyOtp() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { otp: '' },

        validate: {
            otp: isNotEmpty('OTP should not empty'),
        },
    });

    const navigate = useNavigate();

    const handleVerifyOpt = async () => {
        try {
            const res = await axiosInstance.post('/auth/verify-email', {
                code: form.getValues().otp,
            });
            console.log(res);
            if (res.status === 200) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.data.error);
        }
    };

    return (
        <>
            <ToastContainer />
            <Flex direction={'column'} w={'100%'} p={30} justify='center' align='center'>
                <Image src={logo} alt='logo' w={200} />

                <Text fw={600} size={'xl'} lts={1.5} mt={'lg'} c={'#165D94'}>
                    Please enter the OTP we sent to your email
                </Text>
                <Group>
                    <form onSubmit={form.onSubmit(handleVerifyOpt)}>
                        <TextInput
                            mt={'lg'}
                            w={300}
                            size='md'
                            type='number'
                            placeholder='OTP'
                            key={form.key(' ')}
                            {...form.getInputProps('otp')}
                        />

                        <Button type='submit' w={300} mt={'lg'}>
                            Verify Otp
                        </Button>
                    </form>
                </Group>
            </Flex>
        </>
    );
}

export default VerifyOtp;
