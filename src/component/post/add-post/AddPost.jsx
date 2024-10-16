import {
  Avatar,
  Button,
  FileButton,
  Flex,
  Group,
  LoadingOverlay,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Add, AddPhotoAlternate } from '@mui/icons-material';
import axiosInstance from '../../../network/httpRequest';
import { useAuthStore } from '../../../store/authStore';

function AddPost() {
    const { user } = useAuthStore();
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { close: closeLoading, open: showLoading }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
        },

        validate: {
            title: (value) => (value.length < 5 ? 'Tiêu đề phải dài ít nhất 5 ký tự' : null),
            content: (value) => (value.length < 10 ? 'Nội dung phải dài ít nhất 10 ký tự' : null),
        },
    });

    const handleSubmit = async (values) => {
        console.log('Form submitted:', values);
        try {
            showLoading();
            const res = await axiosInstance.post(
                'posts',
                {
                    petOwner_Id: user.id,
                    title: form.getValues().title,
                    content: form.getValues().content,
                    image_url: '',
                },
                {}
            );
            if (res.status == 201) {
                form.reset();
                close();
            }
        } catch (error) {
            console.log(error);
        } finally {
            closeLoading();
        }
    };

    return (
        <>
            <Group bg={'#f8f8f8'} p={20} w={700} style={{ borderRadius: '24px' }}>
                <Flex justify='center' align={'center'} gap={20} w={'100%'}>
                    <Avatar
                        src={user.avatar_url}
                        size={'lg'}
                        name={user.username}
                        color='initials'
                    />
                    <TextInput
                        onClick={open}
                        readOnly
                        placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
                        radius={'xl'}
                        w={'100%'}
                    />
                </Flex>
                <Flex justify={'flex-end'} w={'100%'}>
                    <Button onClick={open} leftSection={<Add />} radius={'xl'}>
                        Tạo bài viết mới
                    </Button>
                </Flex>
            </Group>
            <Modal size={500} opened={opened} onClose={close} centered>
                <LoadingOverlay
                    pos={'absolute'}
                    visible={visible}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'pink', type: 'bars' }}
                />
                <Text ta={'center'} size='24px' c={'#5a5f64'} fw={500}>
                    Tạo bài viết
                </Text>
                <Group p={20}>
                    <Flex align={'center'} gap={10}>
                        <Avatar
                            src={user.avatar_url}
                            size={'md'}
                            name={user.username}
                            color='initials'
                        />
                        <Text fw={500} c={'#5a5f64'} size='lg'>
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
                            label='Tiêu đề'
                            placeholder='Tiêu đề'
                            withAsterisk
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            autosize
                            maxRows={6}
                            minRows={4}
                            w={'100%'}
                            label='Nội dung'
                            placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
                            withAsterisk
                            mb={20}
                            {...form.getInputProps('content')}
                        />
                        <Flex w={'100%'} justify={'flex-end'} mb={20}>
                            <FileButton accept='image/png,image/jpeg'>
                                {(props) => (
                                    <Button {...props} variant='transparent'>
                                        <AddPhotoAlternate fontSize='large' color='action' />
                                    </Button>
                                )}
                            </FileButton>
                        </Flex>
                        <Button type='submit' w={'100%'}>
                            Tạo bài viết
                        </Button>
                    </form>
                </Group>
            </Modal>
        </>
    );
}

export default AddPost;
