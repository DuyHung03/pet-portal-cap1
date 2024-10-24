import { Flex, Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import DoctorSideBar from '../component/doctor-dashboard/sidebar/DoctorSideBar';

function DoctorDashboardLayout() {
    return (
        <Flex gap={0} w={'100%'} justify="center">
            <Flex w={1440} align={'flex-start'}>
                <Group w={300}>
                    <DoctorSideBar />
                </Group>
                <Group w={1140}>
                    <Outlet />
                </Group>
            </Flex>
        </Flex>
    );
}

export default DoctorDashboardLayout;
