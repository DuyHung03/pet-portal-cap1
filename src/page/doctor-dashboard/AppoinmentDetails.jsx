import { Button, Divider, Flex, Group, SimpleGrid, Text } from '@mantine/core';
import { KeyboardBackspace } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import { getDate, getTime } from '../../util/getTimeFromIsoDate';

function AppoinmentDetails() {
    const location = useLocation();
    const appointment = location.state;
    const navigate = useNavigate();

    return (
        <Group p={30} w={'100%'}>
            <Flex
                justify={'space-between'}
                w={'100%'}
                mb={30}
                align={'center'}
                bg={'#FAFAFC'}
                p={20}
                style={{ borderRadius: '12px' }}
            >
                <Text fw={600} c={'#5789cf'} size={'32px'}>
                    Chi tiết cuộc hẹn{' '}
                    <Text
                        fs={'italic'}
                        c={'gray'}
                        size="12px"
                    >{`(ID: ${appointment.id})`}</Text>
                </Text>
                <Text c={'gray'} size="lg">
                    {vietnameseDate}
                </Text>
            </Flex>
            <Button
                td={'underline'}
                leftSection={<KeyboardBackspace />}
                variant="transparent"
                c={'#5789cf'}
                onClick={() => navigate(-1)}
            >
                Quay lại
            </Button>
            <Group
                p={20}
                style={{
                    borderRadius: '12px',
                }}
                bg={'#FAFAFC'}
                w={'100%'}
            >
                <Flex align={'center'} gap={10} w={'100%'}>
                    <Text fs={'italic'} fw={600} size="18px" c={'dark.3'}>
                        Tên chủ nuôi:
                    </Text>
                    <Text fw={600} size="22px" c={'dark.5'}>
                        {appointment.Pet.PetOwner.username}
                    </Text>
                </Flex>
                <Flex align={'center'} gap={10} w={'100%'}>
                    <Text fs={'italic'} fw={600} size="18px" c={'dark.3'}>
                        Email:
                    </Text>
                    <Text fw={600} size="22px" c={'dark.5'}>
                        {appointment.Pet.PetOwner.email}
                    </Text>
                </Flex>
                <Divider w={'100%'} />
                <SimpleGrid cols={2} w={'100%'}>
                    <Flex direction={'column'} align={'flex-start'} gap={20}>
                        <Group w={'100%'}>
                            <Text fw={500} size="xl">
                                Thông tin thú cưng
                            </Text>
                            <Divider w={'100%'} />
                        </Group>
                        <Flex direction={'column'} gap={20}>
                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Tên thú cưng:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Pet.name}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Giống loài:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Pet.Category.name},{' '}
                                    {appointment.Pet.breed}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Tuổi:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Pet.age} tuổi
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Giới tính:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Pet.gender}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} align={'flex-start'} gap={20}>
                        <Group w={'100%'}>
                            <Text fw={500} size="xl">
                                Cuộc hẹn
                            </Text>
                            <Divider w={'100%'} />
                        </Group>
                        <Flex direction={'column'} gap={20}>
                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Tên dịch vụ:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Service.name}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Mô tả dịch vụ:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Service.description}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Giá dịch vụ:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.Service.price} USD
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Ngày hẹn:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {getDate(appointment.appointment_date)}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Thời gian hẹn:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {getTime(appointment.appointment_date)}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Ghi chú:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.notes || 'Không có ghi chú'}
                                </Text>
                            </Flex>

                            <Flex align={'center'} gap={10} w={'100%'}>
                                <Text fs={'italic'} fw={600} c={'dark.3'}>
                                    Trạng thái:
                                </Text>
                                <Text fw={600} c={'dark.5'}>
                                    {appointment.status}
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Group>
        </Group>
    );
}

export default AppoinmentDetails;
