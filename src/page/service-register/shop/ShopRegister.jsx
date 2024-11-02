import {
    Button,
    Divider,
    FileButton,
    Flex,
    Group,
    Image,
    Input,
    InputWrapper,
    NumberInput,
    Select,
    SimpleGrid,
    Stepper,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { AddAPhoto } from '@mui/icons-material';
import { useAuthStore } from '@store/authStore';
import 'dayjs/locale/vi';
import { useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import entrepreneur from '../../../assets/entrepreneur.png';

function ShopRegister() {
    const [active, setActive] = useState(0);
    const { user } = useAuthStore();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [certificateUrl, setCertificateUrl] = useState(null);
    const resetRef = useRef(null);

    const personal_info_form = useForm({
        initialValues: {
            fullName: user.username,
            gender: user.gender,
            birthDate: user.date_of_birth,
            phoneNumber: user.phone,
            email: user.email,
        },
        validate: {
            fullName: (value) => (value ? null : 'Vui lòng nhập họ và tên'),
            gender: (value) => (value ? null : 'Vui lòng chọn giới tính'),
            birthDate: (value) => (value ? null : 'Vui lòng chọn ngày sinh'),
            phoneNumber: (value) =>
                /^\d{10}$/.test(value)
                    ? null
                    : 'Số điện thoại phải có đúng 10 chữ số',
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Email không hợp lệ',
        },
    });

    const doctor_info_form = useForm({
        initialValues: {
            clinicAddress: '',
            certification_number: null,
            experience: null,
            bio: null,
            workingHourOpen: null,
            workingHourClose: null,
        },
        validate: {
            certification_number: (value) =>
                value ? null : 'Vui lòng nhập chứng chỉ hành nghề',
            experience: (value) =>
                value ? null : 'Vui lòng nhập số năm kinh nghiệm',
            workingHourOpen: (value) =>
                value ? null : 'Vui lòng nhập giờ mở cửa',
            workingHourClose: (value) =>
                value ? null : 'Vui lòng nhập giờ đóng cửa',
            clinicAddress: (value) =>
                value ? null : 'Vui lòng nhập địa chỉ phòng khám',
        },
    });

    const nextStep = () => {
        if (active === 0) {
            if (personal_info_form.validate().hasErrors) return;
        } else if (active === 1) {
            if (doctor_info_form.validate().hasErrors) return;
        }
        setActive((current) => Math.min(current + 1, 3));
    };

    const prevStep = () => setActive((current) => Math.max(current - 1, 0));

    const handleRegisterDoctor = async () => {
        // try {
        //     const avatar = await uploadImage(avatarUrl);
        //     const certificate = await uploadImage(certificateUrl);
        nextStep();
        // } catch (error) {
        //     console.log(error);
        // }
    };

    return (
        <Group w={'100%'} justify="center">
            <Group w={1000} p={20}>
                <Group w={'100%'}>
                    <Image src={entrepreneur} w={60} />

                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Đăng kí dịch vụ nhà bán hàng
                    </Text>
                    <Divider w={'100%'} />
                </Group>

                <Stepper
                    active={active}
                    onStepClick={setActive}
                    w={'100%'}
                    allowNextStepsSelect={false}
                >
                    <Stepper.Step
                        label="Thông tin cá nhân"
                        description="Personal information"
                    >
                        <SimpleGrid cols={2}>
                            <Group
                                justify="center"
                                align="flex-start"
                                w={'100%'}
                            >
                                <TextInput
                                    w={'100%'}
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    {...personal_info_form.getInputProps(
                                        'fullName',
                                    )}
                                    required
                                />
                                <SimpleGrid cols={2} w={'100%'}>
                                    <Select
                                        label="Giới tính"
                                        placeholder="Chọn giới tính"
                                        data={[
                                            { value: 'male', label: 'Nam' },
                                            {
                                                value: 'female',
                                                label: 'Nữ',
                                            },
                                            {
                                                value: 'other',
                                                label: 'Khác',
                                            },
                                        ]}
                                        {...personal_info_form.getInputProps(
                                            'gender',
                                        )}
                                        required
                                    />
                                    <DateInput
                                        valueFormat="DD/MM/YYYY"
                                        label="Ngày sinh"
                                        placeholder="Chọn ngày sinh"
                                        {...personal_info_form.getInputProps(
                                            'birthDate',
                                        )}
                                        required
                                        locale="vi"
                                    />
                                </SimpleGrid>
                                <SimpleGrid w={'100%'} cols={2}>
                                    <InputWrapper
                                        label="Số điện thoại"
                                        withAsterisk
                                        required
                                        error={
                                            personal_info_form.errors
                                                .phoneNumber
                                        }
                                    >
                                        <Input
                                            component={IMaskInput}
                                            mask="0000000000"
                                            placeholder="+84"
                                            {...personal_info_form.getInputProps(
                                                'phoneNumber',
                                            )}
                                        />
                                    </InputWrapper>
                                    <TextInput
                                        label="Email"
                                        placeholder="Nhập email"
                                        {...personal_info_form.getInputProps(
                                            'email',
                                        )}
                                        required
                                    />
                                </SimpleGrid>
                                <Group w={'100%'} justify="flex-end" mt="md">
                                    <Button onClick={nextStep}>
                                        Tiếp theo
                                    </Button>
                                </Group>
                            </Group>
                            <Group
                                w={'100%'}
                                justify="center"
                                align="flex-start"
                            >
                                {avatarUrl ? (
                                    <Image
                                        size={200}
                                        mah={350}
                                        src={URL.createObjectURL(avatarUrl)}
                                    />
                                ) : (
                                    <Text
                                        w={'100%'}
                                        ta={'center'}
                                        c={'gray'}
                                        fs={'italic'}
                                    >
                                        Hãy thêm ảnh đại diện của bạn
                                    </Text>
                                )}
                                <FileButton
                                    resetRef={resetRef}
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={setAvatarUrl}
                                >
                                    {(props) => (
                                        <Button
                                            w={'100%'}
                                            {...props}
                                            leftSection={<AddAPhoto />}
                                            c={'#5789cf'}
                                            variant="transparent"
                                        >
                                            Thêm ảnh bác sĩ
                                        </Button>
                                    )}
                                </FileButton>
                            </Group>
                        </SimpleGrid>
                    </Stepper.Step>

                    <Stepper.Step
                        label="Thông tin bác sĩ"
                        description="Doctor information"
                    >
                        <Flex direction={'column'} w={'100%'}>
                            <Group w={'100%'}>
                                <SimpleGrid w={'100%'} cols={2}>
                                    <TextInput
                                        label="Số chứng chỉ hành nghề"
                                        placeholder="Nhập số chứng chỉ hành nghề"
                                        {...doctor_info_form.getInputProps(
                                            'certification_number',
                                        )}
                                        required
                                    />
                                    <NumberInput
                                        label="Kinh nghiệm"
                                        placeholder="Nhập số năm kinh nghiệm"
                                        min={0}
                                        {...doctor_info_form.getInputProps(
                                            'experience',
                                        )}
                                        required
                                    />
                                </SimpleGrid>
                                <TextInput
                                    w={'100%'}
                                    label="Địa chỉ phòng khám"
                                    placeholder="Nhập địa chỉ phòng khám"
                                    {...doctor_info_form.getInputProps(
                                        'clinicAddress',
                                    )}
                                    required
                                />
                                <Textarea
                                    w={'100%'}
                                    maxRows={2}
                                    label="Giới thiệu ngắn"
                                    placeholder="Mô tả ngắn về kinh nghiệm và chuyên môn"
                                    {...doctor_info_form.getInputProps('bio')}
                                />
                                <SimpleGrid cols={2} w={'100%'}>
                                    <TimeInput
                                        withAsterisk
                                        label="Giờ mở cửa"
                                        placeholder="Chọn giờ mở cửa"
                                        {...doctor_info_form.getInputProps(
                                            'workingHourOpen',
                                        )}
                                        format="24"
                                    />
                                    <TimeInput
                                        label="Giờ đóng cửa"
                                        placeholder="Chọn giờ đóng cửa"
                                        {...doctor_info_form.getInputProps(
                                            'workingHourClose',
                                        )}
                                        withAsterisk
                                    />
                                </SimpleGrid>
                                <Group
                                    w={'100%'}
                                    mt="md"
                                    justify="space-between"
                                >
                                    <Button
                                        onClick={prevStep}
                                        variant="transparent"
                                    >
                                        Quay lại
                                    </Button>
                                    <Button onClick={nextStep}>
                                        Tiếp theo
                                    </Button>
                                </Group>
                            </Group>
                            <Group justify="center" align="flex-start">
                                {certificateUrl ? (
                                    <Image
                                        w={'100%'}
                                        mah={350}
                                        src={URL.createObjectURL(
                                            certificateUrl,
                                        )}
                                    />
                                ) : (
                                    <Text
                                        w={'100%'}
                                        ta={'center'}
                                        c={'gray'}
                                        fs={'italic'}
                                    >
                                        Hãy thêm ảnh của chứng chỉ hành nghề
                                    </Text>
                                )}
                                <FileButton
                                    resetRef={resetRef}
                                    accept="image/png,image/jpeg,image/jpg"
                                    onChange={setCertificateUrl}
                                >
                                    {(props) => (
                                        <Button
                                            w={'100%'}
                                            {...props}
                                            leftSection={<AddAPhoto />}
                                            c={'#5789cf'}
                                            variant="transparent"
                                        >
                                            Thêm ảnh chứng chỉ hành nghề
                                        </Button>
                                    )}
                                </FileButton>
                            </Group>
                        </Flex>
                    </Stepper.Step>

                    <Stepper.Step label="Hoàn thành" description="Done">
                        Done
                        <Group w={'100%'} mt="md" justify="center" gap={50}>
                            <Button onClick={prevStep} variant="transparent">
                                Quay lại
                            </Button>
                            <Button onClick={handleRegisterDoctor}>
                                Hoàn tất
                            </Button>
                        </Group>
                    </Stepper.Step>
                    <Stepper.Completed>Hoàn thành đăng kí</Stepper.Completed>
                </Stepper>
            </Group>
        </Group>
    );
}

export default ShopRegister;
