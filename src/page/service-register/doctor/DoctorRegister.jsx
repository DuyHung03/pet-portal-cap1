import {
    Avatar,
    Button,
    Divider,
    FileButton,
    Flex,
    Group,
    Image,
    Input,
    InputLabel,
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
import { hasLength, useForm } from '@mantine/form';
import { AddAPhoto } from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { uploadImage } from '@util/firebaseUtils';
import 'dayjs/locale/vi';
import { useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import registeredDocument from '../../../assets/registered-document.png';
import vet from '../../../assets/vet.png';
import DetailSummary from './DetailSummary';

function DoctorRegister() {
    const [active, setActive] = useState(0);
    const { user } = useAuthStore();
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [certificateUrl, setCertificateUrl] = useState(null);
    const [front_ID, setFront_ID] = useState(null);
    const [back_ID, setBack_ID] = useState(null);
    const resetRef = useRef(null);
    const [loading, setLoading] = useState(false);
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
                /^\d{10}$/.test(value) ? null : 'Số điện thoại không hợp lệ',
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
            id_number: null,
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
            id_number: hasLength(12, 'Số CCCD không hợp lệ'),
        },
    });

    const nextStep = () => {
        if (active === 0) {
            if (personal_info_form.validate().hasErrors) return;
        } else if (active === 1) {
            if (doctor_info_form.validate().hasErrors) return;
            if (!certificateUrl && !front_ID && !back_ID) {
                alert('Vui lòng cung cấp đầy đủ hình ảnh chứng từ.');
                return;
            }
        }
        setActive((current) => Math.min(current + 1, 3));
    };

    const prevStep = () => setActive((current) => Math.max(current - 1, 0));

    const handleRegisterDoctor = async () => {
        setLoading(true);
        try {
            // const avatar = await uploadImage(avatarUrl);
            const certificate = await uploadImage(certificateUrl, (process) =>
                console.log(process),
            );
            const front_id = await uploadImage(front_ID, (process) =>
                console.log(process),
            );
            const back_id = await uploadImage(back_ID, (process) =>
                console.log(process),
            );

            const res = await axiosInstance.post(
                'admin/upgrade-to-doctor',
                {
                    userId: user.id,
                    cccd: doctor_info_form.getValues().id_number,
                    clinic_address: doctor_info_form.getValues().clinicAddress,
                    practice_certificate:
                        doctor_info_form.getValues().certification_number,
                    experience_years: doctor_info_form.getValues().experience,
                    opening_time: doctor_info_form.getValues().workingHourOpen,
                    closing_time: doctor_info_form.getValues().workingHourClose,
                    cccd_front_image: front_id,
                    cccd_back_image: back_id,
                    certificate_image: certificate,
                },
                {
                    withCredentials: true,
                },
            );
            if (res.status == 200) {
                nextStep();
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            } else {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Group w={'100%'} justify="center" mb={80} mt={30}>
            <Group
                w={1000}
                p={20}
                style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                bg={'white'}
            >
                <Group w={'100%'}>
                    <Image src={vet} w={60} />
                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Đăng kí dịch vụ bác sĩ thú y
                    </Text>
                    <Divider w={'100%'} />
                </Group>

                <Stepper
                    active={active}
                    onStepClick={setActive}
                    w={'100%'}
                    // allowNextStepsSelect={false}
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
                                    <Avatar
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
                                            Thêm ảnh đại diện
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
                        <Flex
                            direction={'column'}
                            w={'100%'}
                            gap={20}
                            justify="center"
                        >
                            <Group w={'100%'} justify="center">
                                <Group w={800} justify="center" gap={20}>
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
                                        label="Số Căn cước công dân (CCCD)"
                                        placeholder="Nhập số CCCD"
                                        {...doctor_info_form.getInputProps(
                                            'id_number',
                                        )}
                                        required
                                        type="number"
                                        maxLength={15}
                                    />
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
                                        {...doctor_info_form.getInputProps(
                                            'bio',
                                        )}
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
                                    <Group justify="center" w={'100%'}>
                                        <InputLabel
                                            required
                                            w={'100%'}
                                            ta={'start'}
                                        >
                                            Hình ảnh của chứng chỉ hành nghề thú
                                            y
                                        </InputLabel>
                                        {certificateUrl ? (
                                            <Image
                                                w={180}
                                                mah={180}
                                                src={URL.createObjectURL(
                                                    certificateUrl,
                                                )}
                                            />
                                        ) : null}
                                        <FileButton
                                            resetRef={resetRef}
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={setCertificateUrl}
                                        >
                                            {(props) => (
                                                <Button
                                                    style={{
                                                        border: '1px dashed #ddd',
                                                    }}
                                                    w={96}
                                                    h={96}
                                                    {...props}
                                                    variant="transparent"
                                                    c={'#5789cf'}
                                                >
                                                    <AddAPhoto fontSize="large" />
                                                </Button>
                                            )}
                                        </FileButton>
                                    </Group>
                                    <Group justify="center" w={'100%'}>
                                        <InputLabel
                                            required
                                            w={'100%'}
                                            ta={'start'}
                                        >
                                            Hình ảnh mặt trước của CCCD
                                        </InputLabel>
                                        {front_ID ? (
                                            <Image
                                                w={180}
                                                mah={180}
                                                src={URL.createObjectURL(
                                                    front_ID,
                                                )}
                                            />
                                        ) : null}
                                        <FileButton
                                            resetRef={resetRef}
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={setFront_ID}
                                        >
                                            {(props) => (
                                                <Button
                                                    style={{
                                                        border: '1px dashed #ddd',
                                                    }}
                                                    w={96}
                                                    h={96}
                                                    {...props}
                                                    variant="transparent"
                                                    c={'#5789cf'}
                                                >
                                                    <AddAPhoto fontSize="large" />
                                                </Button>
                                            )}
                                        </FileButton>
                                    </Group>
                                    <Group justify="center" w={'100%'}>
                                        <InputLabel
                                            required
                                            w={'100%'}
                                            ta={'start'}
                                        >
                                            Hình ảnh mặt sau của CCCD
                                        </InputLabel>
                                        {back_ID ? (
                                            <Image
                                                w={180}
                                                mah={180}
                                                src={URL.createObjectURL(
                                                    back_ID,
                                                )}
                                            />
                                        ) : null}
                                        <FileButton
                                            resetRef={resetRef}
                                            accept="image/png,image/jpeg,image/jpg"
                                            onChange={setBack_ID}
                                        >
                                            {(props) => (
                                                <Button
                                                    style={{
                                                        border: '1px dashed #ddd',
                                                    }}
                                                    w={96}
                                                    h={96}
                                                    {...props}
                                                    variant="transparent"
                                                    c={'#5789cf'}
                                                >
                                                    <AddAPhoto fontSize="large" />
                                                </Button>
                                            )}
                                        </FileButton>
                                    </Group>
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
                            </Group>
                        </Flex>
                    </Stepper.Step>

                    <Stepper.Step label="Hoàn thành" description="Done">
                        <DetailSummary
                            data={{
                                personalInfo: personal_info_form.values,
                                doctorInfo: doctor_info_form.values,
                                avatarUrl: avatarUrl
                                    ? URL.createObjectURL(avatarUrl)
                                    : null,
                                certificateUrl: certificateUrl
                                    ? URL.createObjectURL(certificateUrl)
                                    : null,
                                front_ID: front_ID
                                    ? URL.createObjectURL(front_ID)
                                    : null,
                                back_ID: back_ID
                                    ? URL.createObjectURL(back_ID)
                                    : null,
                            }}
                        />
                        <Group w={'100%'} mt="md" justify="center" gap={50}>
                            <Button
                                onClick={prevStep}
                                variant="transparent"
                                disabled={loading}
                            >
                                Quay lại
                            </Button>
                            <Button
                                onClick={handleRegisterDoctor}
                                loading={loading}
                            >
                                Hoàn tất
                            </Button>
                        </Group>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Group w={'100%'} justify="center">
                            <Image src={registeredDocument} w={150} />
                            <Text w={'100%'} ta={'center'}>
                                Hoàn thành đăng kí
                            </Text>
                            <Text w={'100%'} ta={'center'}>
                                Yêu cầu đăng kí của bạn đang được xem xét và phê
                                duyệt
                            </Text>
                            <a href="/">
                                <Button>Quay về trang chủ</Button>
                            </a>
                        </Group>
                    </Stepper.Completed>
                </Stepper>
            </Group>
        </Group>
    );
}

export default DoctorRegister;
