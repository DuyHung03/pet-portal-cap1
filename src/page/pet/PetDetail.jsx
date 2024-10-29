import {
    Button,
    Divider,
    FileButton,
    Flex,
    Group,
    Image,
    LoadingOverlay,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Modal,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
    AddAPhoto,
    ArrowBackIos,
    Close,
    Delete,
    Edit,
    Settings,
} from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uploadImage } from '../../util/firebaseUtils';

function PetDetail() {
    const [opened, { open, close }] = useDisclosure(false);
    const [
        openedUpdateModal,
        { open: openUpdateModal, close: closeUpdateModal },
    ] = useDisclosure(false);
    const [visible, { open: openLoading, close: closeLoading }] =
        useDisclosure(false);
    const location = useLocation();
    const pet = location.state;
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const resetRef = useRef(null);
    let changedFields = {};
    const form = useForm({
        initialValues: {
            category_id: pet.Category.id.toString(),
            name: pet.name,
            breed: pet.breed,
            age: pet.age,
            gender: pet.gender,
            description: pet.description,
            medical_history: pet.medical_history,
        },

        validate: {
            name: (value) => (value ? null : 'Tên thú cưng là bắt buộc'),
            breed: (value) => (value ? null : 'Giống là bắt buộc'),
            age: (value) => (value > 0 ? null : 'Tuổi phải lớn hơn 0'),
            gender: (value) => (value ? null : 'Giới tính là bắt buộc'),
        },
    });

    const clearFile = () => {
        setFile(null);
        resetRef.current?.();
    };

    const deletePet = async () => {
        await axiosInstance.delete(`pets/${pet.id}`, { withCredentials: true });
    };

    const updatePet = async (changedFields) => {
        await axiosInstance.put(`pets/${pet.id}`, changedFields, {
            withCredentials: true,
        });
    };

    const deletePetMutation = useMutation({
        mutationFn: deletePet,
        onSuccess: () => {
            navigate(-1);
        },
        onError: (err) => {
            close();
            console.log(err);
        },
    });

    const updatePetMutation = useMutation({
        mutationFn: updatePet,
        onSuccess: () => {
            navigate(-1);
        },
        onError: (err) => {
            closeUpdateModal();
            console.log(err);
        },
    });

    const handleDeletePet = () => {
        openLoading();
        deletePetMutation.mutate();
        closeLoading();
    };

    const handleSubmit = async () => {
        openLoading();

        for (const key in form.values) {
            if (form.isDirty(key)) {
                changedFields[key] = form.values[key];
            }
        }

        if (file) {
            const imgUrl = await uploadImage(file, (process) =>
                console.log(process),
            );
            changedFields.images = imgUrl;
        }

        if (Object.keys(changedFields).length > 0) {
            try {
                if (changedFields.category_id) {
                    changedFields.category_id = parseInt(
                        changedFields.category_id,
                    );
                }

                updatePetMutation.mutate(changedFields);
            } catch (error) {
                console.log('Error updating pet:', error);
            }
        }
        closeLoading();
    };

    return (
        <Group w={'100%'} justify="center" p={20}>
            <Group w={1200}>
                <Group w={'100%'} h={'100%'}>
                    <LoadingOverlay
                        visible={visible}
                        zIndex={100000}
                        overlayProps={{ radius: 'sm', blur: 2 }}
                        loaderProps={{ color: '#5789cf', type: 'bars' }}
                    />
                </Group>
                <Group w={'100%'} justify="space-between">
                    <Group align="center">
                        <Button
                            radius={'lg'}
                            onClick={() => navigate(-1)}
                            variant="subtle"
                            color={'#5789cf'}
                        >
                            <ArrowBackIos />
                        </Button>
                        <Text fw={500} c={'#5789CF'} size={'26px'}>
                            Thông tin thú cưng
                        </Text>
                        <Text
                            c={'gray'}
                            fs={'italic'}
                        >{`(ID: ${pet.id})`}</Text>
                    </Group>
                    <Menu>
                        <MenuTarget>
                            <Button variant="transparent" c={'gray'}>
                                <Settings color="action" />
                            </Button>
                        </MenuTarget>
                        <MenuDropdown>
                            <MenuItem
                                onClick={openUpdateModal}
                                leftSection={<Edit />}
                                color="gray"
                            >
                                Chỉnh sửa
                            </MenuItem>
                            <MenuItem
                                onClick={open}
                                leftSection={<Delete />}
                                color="red"
                            >
                                Xóa
                            </MenuItem>
                        </MenuDropdown>
                    </Menu>
                </Group>
                <Divider w={'100%'} />
                <Group align="flex-start" gap={60}>
                    <Group w={380}>
                        <Image
                            radius={'xl'}
                            style={{
                                boxShadow:
                                    'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                            }}
                            w={380}
                            h={380}
                            src={
                                pet.images
                                    ? pet.images
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8MOu_ZPbXm9CeVnuM73D2sbQgohkJrMdD4Q&s'
                            }
                        />
                    </Group>
                    <Flex direction={'column'} gap={10}>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Tên thú cưng:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.name}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Giống:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.Category.name}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Loài:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.breed}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Giới tính:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.gender}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Tuổi:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.age}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Mô tả:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.description}
                            </Text>
                        </Flex>
                        <Flex align={'center'} gap={10} w={'100%'}>
                            <Text fs={'italic'} fw={600} c={'dark.3'}>
                                Lịch sử y tế:
                            </Text>
                            <Text fw={600} c={'dark.5'}>
                                {pet.medical_history}
                            </Text>
                        </Flex>
                    </Flex>
                </Group>
            </Group>
            <Modal
                opened={opened}
                onClose={close}
                centered
                withCloseButton={false}
                title="Xóa thú cưng?"
            >
                <Text mb={20}>
                    Bạn có chắc muốn xóa <b>{pet.name}</b> khỏi danh sách thú
                    cưng?
                </Text>
                <Group w={'100%'} justify="space-evenly">
                    <Button color="red" onClick={handleDeletePet}>
                        Xóa
                    </Button>
                    <Button color="gray" onClick={close}>
                        Quay lại
                    </Button>
                </Group>
            </Modal>
            <Modal
                opened={openedUpdateModal}
                onClose={closeUpdateModal}
                centered
                title="Chỉnh sửa thông tin thú cưng"
            >
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        label="Tên thú cưng"
                        placeholder="Buddy"
                        {...form.getInputProps('name')}
                        required
                    />

                    <Group grow mt="md">
                        <Select
                            label="Loại thú cưng"
                            placeholder="Chọn loại thú cưng"
                            data={[
                                { value: '1', label: 'Chó' },
                                { value: '2', label: 'Mèo' },
                                { value: '9', label: 'Chim' },
                                { value: '10', label: 'Bò sát' },
                            ]}
                            {...form.getInputProps('category_id')}
                            required
                        />

                        <Select
                            label="Giới tính"
                            placeholder="Chọn giới tính"
                            data={[
                                { value: 'Male', label: 'Đực' },
                                { value: 'Female', label: 'Cái' },
                            ]}
                            {...form.getInputProps('gender')}
                            required
                        />
                        <NumberInput
                            label="Tuổi"
                            placeholder="Tuổi"
                            min={0}
                            {...form.getInputProps('age')}
                            required
                        />
                    </Group>
                    <TextInput
                        label="Giống"
                        placeholder="Golden Retriever"
                        {...form.getInputProps('breed')}
                        required
                    />

                    <Textarea
                        maxRows={6}
                        minRows={4}
                        autosize
                        label="Mô tả"
                        placeholder="Thân thiện và vui tươi"
                        {...form.getInputProps('description')}
                        required
                    />

                    <Textarea
                        label="Lịch sử y tế"
                        placeholder="Đã tiêm chủng"
                        {...form.getInputProps('medical_history')}
                    />
                    <Group mt={20}>
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
                            <FileButton
                                resetRef={resetRef}
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={setFile}
                            >
                                {(props) => (
                                    <Button
                                        {...props}
                                        leftSection={<AddAPhoto />}
                                        c={'#5789cf'}
                                        variant="transparent"
                                    >
                                        Thay ảnh đại diện
                                    </Button>
                                )}
                            </FileButton>
                        )}
                    </Group>

                    <Button w={'100%'} type="submit" mt="md" bg={'#5789CF'}>
                        Chỉnh sửa
                    </Button>
                </form>
            </Modal>
        </Group>
    );
}

export default PetDetail;
