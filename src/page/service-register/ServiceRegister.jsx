import { Button, Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import entrepreneur from '../../assets/entrepreneur.png';
import registration from '../../assets/registration.png';

import { Helmet } from 'react-helmet';
import vet from '../../assets/vet.png';

function ServiceRegister() {
    return (
        <Group w={'100%'} justify="center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Đăng kí dịch vụ - Cổng dịch vụ thú cưng</title>
            </Helmet>
            <Group w={1200} p={20}>
                <Group w={'100%'} justify="center">
                    <Image src={registration} w={150} />
                </Group>
                <Text
                    fw={500}
                    c={'#5789CF'}
                    size={'26px'}
                    w={'100%'}
                    ta={'center'}
                >
                    Lựa chọn dịch vụ dưới đây để đăng kí
                </Text>
                <Group w={'100%'} justify="space-around" mt={50}>
                    <Button
                        h={'fit-content'}
                        bg={'#5789cf'}
                        radius={12}
                        p={12}
                        style={{
                            boxShadow:
                                'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
                        }}
                    >
                        <Link to={'doctor-register'}>
                            <Group>
                                <Image src={vet} w={80} alt="vet" />
                                <Text size="20px" fw={500} c={'white'}>
                                    Đăng kí làm bác sĩ thú cưng
                                </Text>
                            </Group>
                        </Link>
                    </Button>
                    <Button
                        h={'fit-content'}
                        bg={'#5789cf'}
                        radius={12}
                        p={12}
                        style={{
                            boxShadow:
                                'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
                        }}
                    >
                        <Link to={'sale-register'}>
                            <Group>
                                <Image src={entrepreneur} w={80} alt="vet" />
                                <Text size="20px" fw={500} c={'white'}>
                                    Đăng kí làm nhà bán hàng
                                </Text>
                            </Group>
                        </Link>
                    </Button>
                </Group>
            </Group>
        </Group>
    );
}

export default ServiceRegister;
