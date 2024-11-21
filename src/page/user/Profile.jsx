import {
    Avatar,
    Button,
    CheckIcon,
    Divider,
    FileButton,
    Flex,
    Group,
    Input,
    LoadingOverlay,
    Modal,
    Radio,
    RadioGroup,
    SimpleGrid,
    Text,
    TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
    AddPhotoAlternate,
    ArrowBack,
    CheckCircle,
    Save,
} from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { uploadImage } from '@util/firebaseUtils';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
    const { user, setUserInfo } = useAuthStore();
    console.log(user);
    const [gender, setGender] = useState(user.gender || 'Nam');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const resetRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            username: user.username,
            phone: user.phone,
            birthday: user.date_of_birth
                ? dayjs(user.date_of_birth, 'DD/MM/YYYY').isValid()
                    ? dayjs(user.date_of_birth, 'DD/MM/YYYY').toDate()
                    : null
                : null,
        },
        validate: {
            username: (value) =>
                value.length < 3
                    ? 'Username must be at least 3 characters long'
                    : null,
            phone: (value) =>
                /^[0-9]{10}$/.test(value)
                    ? null
                    : 'Phone number must be exactly 10 digits',
        },
    });

    const onSaveProfile = async () => {
        setLoading(true);
        try {
            let avatar = null;
            if (avatarUrl) {
                avatar = await uploadImage(avatarUrl, (process) => {
                    console.log(process);
                });
            }
            const res = await axiosInstance.put(
                `auth/users/${user.id}`,
                {
                    username: form.getValues().username,
                    phone: form.getValues().phone,
                    gender: gender,
                    avatar_url: avatar,
                },
                { withCredentials: true },
            );
            if (res.status == 200) {
                setUserInfo(res.data.user);
                open();
                setTimeout(() => {
                    close();
                }, 6000);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Group w={'100%'} justify="center" m={20}>
            <LoadingOverlay visible={loading} />
            <ToastContainer style={{ marginTop: '100px' }} />
            <Modal
                centered
                opened={opened}
                onClose={close}
                withCloseButton={false}
            >
                <Group p={30} w={'100%'} justify="center" align="center">
                    <CheckCircle htmlColor="success" sx={{ fontSize: 60 }} />
                    <Text size="lg" fw={500} w={'100%'} ta={'center'}>
                        Thay đổi thông tin cá nhân thành công
                    </Text>
                </Group>
            </Modal>
            <Group
                w={800}
                style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                p={20}
            >
                <Group w={'100%'}>
                    <Button
                        leftSection={<ArrowBack />}
                        variant="transparent"
                        onClick={() => navigate(-1)}
                        c={'#5789cf'}
                    >
                        Quay lại
                    </Button>
                    {/* <Divider w={'100%'} /> */}
                </Group>
                <Text fw={600} size="xl" c={'#5789cf'}>
                    Thông tin cá nhân
                </Text>
                <Divider w={'100%'} />

                <SimpleGrid w={'100%'} cols={2}>
                    <Flex p={20} w={'100%'} direction={'column'} gap={20}>
                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Email:</Input.Label>
                            <Text size="md">{user.email}</Text>
                        </Flex>
                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Họ và tên:</Input.Label>
                            <TextInput
                                size="md"
                                key={form.key('username')}
                                {...form.getInputProps('username')}
                            />
                        </Flex>

                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Số điện thoại:</Input.Label>
                            <TextInput
                                size="md"
                                key={form.key('phone')}
                                {...form.getInputProps('phone')}
                            />
                        </Flex>

                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Giới tính:</Input.Label>
                            <RadioGroup value={gender} onChange={setGender}>
                                <Flex gap={20}>
                                    <Radio
                                        icon={CheckIcon}
                                        value="Nam"
                                        label="Nam"
                                    />
                                    <Radio
                                        icon={CheckIcon}
                                        value="Nữ"
                                        label="Nữ"
                                    />
                                    <Radio
                                        icon={CheckIcon}
                                        value="Khác"
                                        label="Khác"
                                    />
                                </Flex>
                            </RadioGroup>
                        </Flex>
                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Ngày sinh:</Input.Label>
                            <DateInput
                                size="md"
                                valueFormat="DD/MM/YYYY"
                                placeholder="Chọn ngày sinh"
                                {...form.getInputProps('birthday')}
                                required
                                locale="vi"
                            />
                        </Flex>
                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Địa chỉ:</Input.Label>
                            <Text size="md">
                                {user.address || 'Chưa có địa chỉ'}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        direction={'column'}
                        justify={'center'}
                        align={'center'}
                        gap={16}
                    >
                        <Avatar
                            size={150}
                            src={
                                avatarUrl
                                    ? URL.createObjectURL(avatarUrl)
                                    : user.avatar_url
                            }
                        />
                        <FileButton
                            resetRef={resetRef}
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={setAvatarUrl}
                        >
                            {(props) => (
                                <Button
                                    {...props}
                                    leftSection={<AddPhotoAlternate />}
                                    variant="outline"
                                    color={'gray'}
                                >
                                    Chọn ảnh đại diện
                                </Button>
                            )}
                        </FileButton>
                        <Text c={'gray'} size="sm" fs={'italic'}>
                            Dụng lượng file tối đa 1 MB <br></br> Định
                            dạng:.JPEG, .PNG
                        </Text>
                    </Flex>
                </SimpleGrid>
                <Group w={'100%'} justify="center">
                    <Button
                        rightSection={<Save />}
                        onClick={onSaveProfile}
                        bg={'#5789cf'}
                    >
                        Lưu
                    </Button>
                </Group>
            </Group>
        </Group>
    );
}

export default Profile;
