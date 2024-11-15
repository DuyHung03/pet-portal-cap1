import {
    Avatar,
    Button,
    CheckIcon,
    Divider,
    FileButton,
    Flex,
    Group,
    Input,
    Radio,
    RadioGroup,
    SimpleGrid,
    Text,
    TextInput,
} from '@mantine/core';
import { AddPhotoAlternate, Save } from '@mui/icons-material';
import { useAuthStore } from '@store/authStore';
import { useRef, useState } from 'react';

function Profile() {
    const { user } = useAuthStore();
    console.log(user);

    const [gender, setGender] = useState(user.gender || 'Male');
    const [avatarUrl, setAvatarUrl] = useState(null);
    const resetRef = useRef(null);

    console.log(gender);

    return (
        <Group w={'100%'} justify="center" m={20}>
            <Group
                w={800}
                style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                p={20}
            >
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
                            <TextInput size="md" value={user.username} />
                        </Flex>

                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Số điện thoại:</Input.Label>
                            <TextInput size="md" value={user.phone} />
                        </Flex>

                        <Flex align={'center'} gap={10}>
                            <Input.Label size="md">Giới tính:</Input.Label>
                            <RadioGroup value={gender} onChange={setGender}>
                                <Flex gap={20}>
                                    <Radio
                                        icon={CheckIcon}
                                        value="Male"
                                        label="Nam"
                                    />
                                    <Radio
                                        icon={CheckIcon}
                                        value="Female"
                                        label="Nữ"
                                    />
                                    <Radio
                                        icon={CheckIcon}
                                        value="Other"
                                        label="Khác"
                                    />
                                </Flex>
                            </RadioGroup>
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
                    <Button rightSection={<Save />} bg={'#5789cf'}>
                        Lưu
                    </Button>
                </Group>
            </Group>
        </Group>
    );
}

export default Profile;
