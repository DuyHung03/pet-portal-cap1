import { Divider, Flex, Group, Image, SimpleGrid, Text } from '@mantine/core';

function DetailSummary({ data }) {
    console.log(data);

    return (
        <Group w={'100%'} p={20} mb={100}>
            <Group w={'100%'}>
                <Text fw={500} size="24px" w={'100%'} ta={'center'}>
                    Quá trình đăng kí sắp hoàn tất
                </Text>
                <Text w={'100%'} ta={'center'}>
                    Vui lòng kiểm tra lại thông tin dưới đây trước khi hoàn tất
                    thủ tục đăng kí
                </Text>
                <Divider w={'100%'} />
            </Group>
            <SimpleGrid cols={{ base: 1, lg: 2 }} w={'100%'}>
                <Flex direction="column" w={'100%'} gap={20}>
                    {/* Personal Info Section */}
                    <Text fw={700} size="lg">
                        Thông tin cá nhân
                    </Text>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Họ và tên:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.personalInfo.fullName}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Giới tính:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.personalInfo.gender}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Ngày sinh:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.personalInfo.birthDate
                                ? new Date(
                                      data.personalInfo.birthDate,
                                  ).toLocaleDateString('vi-VN', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })
                                : 'N/A'}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Số điện thoại:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.personalInfo.phoneNumber}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Email:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.personalInfo.email}
                        </Text>
                    </Flex>
                </Flex>
                <Flex direction="column" w={'100%'} gap={20}>
                    <Text fw={700} size="lg">
                        Thông tin bác sĩ
                    </Text>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Số CCCD:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.id_number}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Địa chỉ phòng khám:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.clinicAddress}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Chứng chỉ hành nghề:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.certification_number}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Kinh nghiệm:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.experience} năm
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Giờ mở cửa:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.workingHourOpen}
                        </Text>
                    </Flex>
                    <Flex align={'center'} gap={10} w={'100%'}>
                        <Text fs={'italic'} fw={600} c={'dark.2'}>
                            Giờ đóng cửa:
                        </Text>
                        <Text fw={600} c={'dark.5'}>
                            {data.doctorInfo.workingHourClose}
                        </Text>
                    </Flex>
                </Flex>
            </SimpleGrid>
            {/* Avatar and Certificate Images */}
            <Text fw={700} size="lg">
                Ảnh đại diện và chứng chỉ
            </Text>
            <Flex justify={'space-between'} wrap="wrap" w={'100%'}>
                <Flex align={'center'} direction={'column'} gap={10}>
                    <Text fs={'italic'} fw={600} c={'dark.2'}>
                        Ảnh đại diện
                    </Text>
                    <Image
                        src={data.avatarUrl}
                        mah={350}
                        radius="md"
                        w={'fit-content'}
                    />
                </Flex>
                <Flex align={'center'} direction={'column'} gap={10}>
                    <Text fs={'italic'} fw={600} c={'dark.2'}>
                        Chứng chỉ hành nghề
                    </Text>
                    <Image
                        src={data.certificateUrl}
                        w={'fit-content'}
                        mah={350}
                        radius="md"
                    />
                </Flex>
            </Flex>
            <Text fw={700} size="lg">
                Hình ảnh CCCD
            </Text>
            <Flex justify={'space-between'} wrap="wrap" w={'100%'}>
                <Flex align={'center'} direction={'column'} gap={10}>
                    <Text fs={'italic'} fw={600} c={'dark.2'}>
                        Mặt trước
                    </Text>
                    <Image src={data.front_ID} mah={350} radius="md" w={350} />
                </Flex>
                <Flex align={'center'} direction={'column'} gap={10}>
                    <Text fs={'italic'} fw={600} c={'dark.2'}>
                        Mặt sau
                    </Text>
                    <Image src={data.back_ID} w={350} mah={350} radius="md" />
                </Flex>
            </Flex>
        </Group>
    );
}

export default DetailSummary;
