import {
    Avatar,
    Button,
    FileButton,
    Flex,
    Group,
    Image,
    LoadingOverlay,
    Modal,
    ScrollAreaAutosize,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Add, AddPhotoAlternate, Close } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../network/httpRequest';
import { useAuthStore } from '../../../store/authStore';
import { uploadImage } from '../../../util/firebaseUtils';

function AddPost({ onPostCreated }) {
    const { user } = useAuthStore();
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { close: closeLoading, open: showLoading }] =
        useDisclosure(false);
    const [file, setFile] = useState('');
    const resetRef = useRef(null);
    const form = useForm({
        initialValues: {
            title: '',
            content: '',
        },

        validate: {
            title: (value) =>
                value.length < 5 ? 'Tiêu đề phải dài ít nhất 5 ký tự' : null,
            content: (value) =>
                value.length < 10 ? 'Nội dung phải dài ít nhất 10 ký tự' : null,
        },
    });

    const handleSubmit = async (values) => {
        console.log('Form submitted:', values);
        try {
            showLoading();
            let imgUrl = null;

            if (file) {
                imgUrl = await uploadImage(file, (process) =>
                    console.log(process),
                );
            }

            const res = await axiosInstance.post(
                'posts',
                {
                    petOwner_Id: user.id,
                    title: form.getValues().title,
                    content: form.getValues().content,
                    image_url: imgUrl,
                },
                {},
            );
            if (res.status == 201) {
                form.reset();
                close();
                onPostCreated();
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeLoading();
        }
    };

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };

    return (
        <>
            <Group
                bg={'#f8f8f8'}
                p={20}
                w={700}
                style={{ borderRadius: '24px' }}
            >
                <Flex justify="center" align={'center'} gap={20} w={'100%'}>
                    <Link to={'/account'}>
                        <Avatar
                            src={user.avatar_url}
                            size={'lg'}
                            name={user.username}
                            color="initials"
                        />
                    </Link>
                    <TextInput
                        onClick={open}
                        readOnly
                        placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
                        radius={'xl'}
                        w={'100%'}
                    />
                </Flex>
                <Flex justify={'flex-end'} w={'100%'}>
                    <Button
                        onClick={open}
                        leftSection={<Add />}
                        radius={'xl'}
                        bg={'#5789cf'}
                    >
                        Tạo bài viết mới
                    </Button>
                </Flex>
            </Group>
            <Modal
                size={500}
                opened={opened}
                onClose={visible ? () => {} : close}
                centered
                scrollAreaComponent={ScrollAreaAutosize}
            >
                <LoadingOverlay
                    pos={'absolute'}
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
                <Text ta={'center'} size="24px" c={'#5a5f64'} fw={500}>
                    Tạo bài viết
                </Text>
                <Group p={20}>
                    <Flex align={'center'} gap={10}>
                        <Avatar
                            src={user.avatar_url}
                            size={'md'}
                            name={user.username}
                            color="initials"
                        />
                        <Text fw={500} c={'#5a5f64'} size="lg">
                            {user.username}
                        </Text>
                    </Flex>

                    <form
                        onSubmit={form.onSubmit(handleSubmit)}
                        style={{ width: '100%', position: 'relative' }}
                    >
                        <TextInput
                            data-autofocus
                            w={'100%'}
                            label="Tiêu đề"
                            placeholder="Tiêu đề"
                            withAsterisk
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            autosize
                            maxRows={6}
                            minRows={4}
                            w={'100%'}
                            label="Nội dung"
                            placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
                            withAsterisk
                            mb={20}
                            {...form.getInputProps('content')}
                        />
                        {file ? (
                            <Group pos={'relative'} w={'100%'} justify="center">
                                <Image src={URL.createObjectURL(file)} />
                                <Button
                                    onClick={clearFile}
                                    pos={'absolute'}
                                    top={10}
                                    right={10}
                                    color="white"
                                    variant="subtle"
                                    bg={'red'}
                                >
                                    <Close />
                                </Button>
                            </Group>
                        ) : (
                            <Text>No image selected</Text>
                        )}

                        <Flex w={'100%'} justify={'flex-end'} mb={20}>
                            <FileButton
                                resetRef={resetRef}
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={setFile}
                            >
                                {(props) => (
                                    <Button {...props} variant="transparent">
                                        <AddPhotoAlternate
                                            fontSize="large"
                                            color="action"
                                        />
                                    </Button>
                                )}
                            </FileButton>
                        </Flex>
                        <Button type="submit" w={'100%'}>
                            Tạo bài viết
                        </Button>
                    </form>
                </Group>
            </Modal>
        </>
    );
}

export default AddPost;
