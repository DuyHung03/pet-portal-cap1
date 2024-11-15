import {
    Button,
    Divider,
    FileButton,
    Flex,
    Group,
    Image,
    Input,
    InputLabel,
    InputWrapper,
    Select,
    SimpleGrid,
    Stepper,
    Text,
    Textarea,
    TextInput,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { hasLength, useForm } from '@mantine/form';
import { AddAPhoto, ArrowBack } from '@mui/icons-material';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { uploadImage } from '@util/firebaseUtils';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRef, useState } from 'react';
import { IMaskInput } from 'react-imask';
import { useNavigate } from 'react-router-dom';
import entrepreneur from '../../../assets/entrepreneur.png';
import registeredDocument from '../../../assets/registered-document.png';
import ShopSummary from './ShopSummary';

function ShopRegister() {
    dayjs.extend(customParseFormat);
    const [active, setActive] = useState(0);
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [storeLogo, setStoreLogo] = useState(null);
    const [businessLicenseUrl, setBusinessLicenseUrl] = useState(null);
    const resetRef = useRef(null);
    const [front_ID, setFront_ID] = useState(null);
    const [back_ID, setBack_ID] = useState(null);
    const [loading, setLoading] = useState(false);

    const personal_info_form = useForm({
        initialValues: {
            fullName: user.username,
            gender: user.gender,
            birthDate: user.date_of_birth
                ? dayjs(user.date_of_birth, 'DD/MM/YYYY').isValid()
                    ? dayjs(user.date_of_birth, 'DD/MM/YYYY').toDate()
                    : null
                : null,
            phoneNumber: user.phone,
            email: user.email,
            id_number: user.cccd,
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
            id_number: hasLength(12, 'Số CCCD không hợp lệ'),
        },
    });

    const shop_info_form = useForm({
        initialValues: {
            store_name: '',
            store_address: '',
            business_license: '',
            store_description: '',
        },
        validate: {
            store_name: (value) =>
                value ? null : 'Vui lòng nhập tên cửa hàng',
            store_address: (value) =>
                value ? null : 'Vui lòng nhập địa chỉ cửa hàng',
            business_license: (value) =>
                value ? null : 'Vui lòng nhập mã giấy phép kinh doanh',
            store_description: (value) =>
                value ? null : 'Vui lòng nhập mô tả cửa hàng',
        },
    });
    const nextStep = () => {
        if (active === 0) {
            if (personal_info_form.validate().hasErrors) return;
        } else if (active === 1) {
            if (shop_info_form.validate().hasErrors) return;
        }
        setActive((current) => Math.min(current + 1, 3));
    };

    const prevStep = () => setActive((current) => Math.max(current - 1, 0));

    const handleRegisterSeller = async () => {
        setLoading(true);
        try {
            const logoUrl = await uploadImage(storeLogo);
            const licenseUrl = await uploadImage(businessLicenseUrl);
            let front_id = null;
            let back_id = null;
            if (!user.cccd) {
                front_id = await uploadImage(front_ID, (process) =>
                    console.log(process),
                );
                back_id = await uploadImage(back_ID, (process) =>
                    console.log(process),
                );
            }

            const res = await axiosInstance.post(
                'admin/upgrade-to-seller',
                {
                    userId: user.id,
                    store_name: shop_info_form.getValues().store_name,
                    store_logo: logoUrl,
                    store_address: shop_info_form.getValues().store_address,
                    business_license:
                        shop_info_form.getValues().business_license,
                    business_license_url: licenseUrl,
                    store_description:
                        shop_info_form.getValues().store_description,
                    ...(user.cccd
                        ? {}
                        : {
                              cccd: personal_info_form.getValues().id_number,
                              cccd_front_image: front_id,
                              cccd_back_image: back_id,
                              date_of_birth: dayjs(
                                  personal_info_form.getValues().birthDate,
                              ).format('DD/MM/YYYY'),
                              phone: personal_info_form.getValues().phoneNumber,
                          }),
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

    if (user.store_name) {
        return (
            <Flex
                direction={'column'}
                w={'100%'}
                justify="center"
                align="center"
                p={60}
                gap={20}
            >
                <Image src={registeredDocument} w={160} />
                <Text c={'green'} fw={600} size="28px">
                    Đã đăng kí
                </Text>
                <Text size="lg">
                    Tài khoản đã được đăng kí dịch vụ <b>Nhà bán hàng</b>.
                </Text>
                <Button
                    leftSection={<ArrowBack />}
                    onClick={() => navigate(-1)}
                >
                    Quay lại
                </Button>
            </Flex>
        );
    }

    return (
        <Group w={'100%'} justify="center" mb={80} mt={30}>
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
                                            { value: 'Nam', label: 'Nam' },
                                            {
                                                value: 'Nữ',
                                                label: 'Nữ',
                                            },
                                            {
                                                value: 'Khác',
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
                                        disabled
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
                                {storeLogo ? (
                                    <Image
                                        w={250}
                                        mah={350}
                                        src={URL.createObjectURL(storeLogo)}
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
                                    onChange={setStoreLogo}
                                >
                                    {(props) => (
                                        <Button
                                            w={'100%'}
                                            {...props}
                                            leftSection={<AddAPhoto />}
                                            c={'#5789cf'}
                                            variant="transparent"
                                        >
                                            Chọn ảnh đại diện
                                        </Button>
                                    )}
                                </FileButton>
                            </Group>
                        </SimpleGrid>
                    </Stepper.Step>

                    <Stepper.Step
                        label="Thông tin cửa hàng"
                        description="Shop information"
                    >
                        <Group w={'100%'} justify="center">
                            <Flex direction={'column'} w={600} gap={10}>
                                <TextInput
                                    w={'100%'}
                                    label="Tên cửa hàng"
                                    placeholder="Nhập tên cửa hàng"
                                    {...shop_info_form.getInputProps(
                                        'store_name',
                                    )}
                                    required
                                />
                                <TextInput
                                    w={'100%'}
                                    label="Địa chỉ cửa hàng"
                                    placeholder="Nhập địa chỉ cửa hàng"
                                    {...shop_info_form.getInputProps(
                                        'store_address',
                                    )}
                                    required
                                />
                                <TextInput
                                    w={'100%'}
                                    label="Mã giấy phép kinh doanh"
                                    placeholder="Nhập mã giấy phép kinh doanh"
                                    {...shop_info_form.getInputProps(
                                        'business_license',
                                    )}
                                    required
                                />
                                <TextInput
                                    w={'100%'}
                                    label="Số Căn cước công dân (CCCD)"
                                    placeholder="Nhập số CCCD"
                                    {...personal_info_form.getInputProps(
                                        'id_number',
                                    )}
                                    required
                                    type="number"
                                    disabled={user.cccd}
                                    maxLength={12}
                                />
                                <Textarea
                                    w={'100%'}
                                    label="Mô tả cửa hàng"
                                    placeholder="Mô tả ngắn về cửa hàng của bạn"
                                    {...shop_info_form.getInputProps(
                                        'store_description',
                                    )}
                                />

                                <Group justify="center" w={'100%'}>
                                    <InputLabel
                                        required
                                        w={'100%'}
                                        ta={'start'}
                                    >
                                        Hình ảnh giấy phép kinh doanh
                                    </InputLabel>
                                    {businessLicenseUrl ? (
                                        <Image
                                            w={180}
                                            mah={180}
                                            src={URL.createObjectURL(
                                                businessLicenseUrl,
                                            )}
                                        />
                                    ) : null}
                                    <FileButton
                                        resetRef={resetRef}
                                        accept="image/png,image/jpeg,image/jpg"
                                        onChange={setBusinessLicenseUrl}
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

                                {!user.cccd ? (
                                    <Group>
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
                                    </Group>
                                ) : null}

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
                            </Flex>
                        </Group>
                    </Stepper.Step>

                    <Stepper.Step label="Hoàn thành" description="Done">
                        <ShopSummary
                            data={{
                                personalInfo: personal_info_form.values,
                                shopInfo: shop_info_form.values,
                                storeLogo: storeLogo
                                    ? URL.createObjectURL(storeLogo)
                                    : null,
                                businessLicenseUrl: businessLicenseUrl
                                    ? URL.createObjectURL(businessLicenseUrl)
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
                                onClick={handleRegisterSeller}
                                loading={loading}
                            >
                                Đăng kí
                            </Button>
                        </Group>
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Group w={'100%'} justify="center">
                            <Image src={registeredDocument} w={150} />
                            <Text fw={600} w={'100%'} ta={'center'}>
                                Hoàn thành đăng kí
                            </Text>
                            <Text w={'100%'} ta={'center'}>
                                Yêu cầu đăng kí của bạn đang được xem xét và phê
                                duyệt
                            </Text>
                            <a href="/">
                                <Button bg={'#5789cf'}>
                                    Quay về trang chủ
                                </Button>
                            </a>
                        </Group>
                    </Stepper.Completed>
                </Stepper>
            </Group>
        </Group>
    );
}

export default ShopRegister;
