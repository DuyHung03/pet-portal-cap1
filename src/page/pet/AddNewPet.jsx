import {
    Avatar,
    Button,
    FileButton,
    Flex,
    Grid,
    GridCol,
    Group,
    Loader,
    NumberInput,
    Select,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { AddAPhoto, Pets } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../network/httpRequest';
import { useAuthStore } from '../../store/authStore';

function AddNewPet() {
    const { user } = useAuthStore();
    const [file, setFile] = useState(null);
    const resetRef = useRef(null);
    const navigate = useNavigate();
    console.log(file);

    const form = useForm({
        initialValues: {
            owner_id: user.id,
            category_id: 1,
            name: '',
            breed: '',
            age: 0,
            gender: '',
            description: '',
            medical_history: '',
        },

        validate: {
            name: (value) => (value ? null : 'Tên thú cưng là bắt buộc'),
            breed: (value) => (value ? null : 'Giống là bắt buộc'),
            age: (value) => (value > 0 ? null : 'Tuổi phải lớn hơn 0'),
            gender: (value) => (value ? null : 'Giới tính là bắt buộc'),
        },
    });

    const addPet = async () => {
        await axiosInstance.post(
            'pets',
            {
                owner_id: form.getValues().owner_id,
                category_id: parseInt(form.getValues().category_id),
                name: form.getValues().name,
                breed: form.getValues().breed,
                age: form.getValues().age,
                gender: form.getValues().gender,
                description: form.getValues().description,
                medical_history: form.getValues().medical_history,
            },
            { withCredentials: true },
        );
    };

    const addPetMutation = useMutation({
        mutationFn: addPet,
        onMutate: () => {},
        onError: (err) => {
            console.log(err);
        },
        onSuccess: () => {
            navigate(-1);
        },
    });

    const handleSubmit = async () => {
        addPetMutation.mutate();
    };

    return (
        <Group w={'100%'} justify="center">
            <Group w={1000}>
                {addPetMutation.isPending ? (
                    <Group w={'100%'} justify="center" align="center">
                        <Loader type="bar" />
                    </Group>
                ) : null}
                <Group w={'100%'} align="center" pt={20} pl={20}>
                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Thêm thú cưng
                    </Text>
                    <Pets htmlColor="#5789cf" fontSize={'large'} />
                </Group>
                <Grid justify="center" p={20} gutter={'xl'}>
                    <GridCol span={'auto'}>
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

                            <Button type="submit" mt="md" bg={'#5789CF'}>
                                Gửi
                            </Button>
                        </form>
                    </GridCol>
                    <GridCol w={300} span={'content'}>
                        <Flex
                            gap={20}
                            direction={'column'}
                            w={'100%'}
                            justify="center"
                            align="center"
                        >
                            <Avatar size={200} />
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
                                        Thêm ảnh của thú cưng
                                    </Button>
                                )}
                            </FileButton>
                        </Flex>
                    </GridCol>
                </Grid>
            </Group>
        </Group>
    );
}

export default AddNewPet;
