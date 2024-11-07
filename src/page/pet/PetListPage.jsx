import {
    Button,
    Divider,
    Flex,
    Grid,
    Group,
    Image,
    Loader,
    Text,
} from '@mantine/core';
import { Add } from '@mui/icons-material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import petFood from '../../assets/pet-food.png';
import PetItem from '../../component/pet/PetItem';
import useFetchData from '../../hooks/useFetchData';
import { useAuthStore } from '../../store/authStore';

function PetListPage() {
    const { user } = useAuthStore();

    const params = useMemo(() => [], []);

    const { data, loading, error } = useFetchData(
        `/pets/owner/${user.id}`,
        params,
    );
    console.log(data);

    console.log(error);

    return (
        <Group w={'100%'} justify="center">
            <Group w={1200} p={20}>
                <Flex justify={'space-between'} w={'100%'} align={'center'}>
                    <Text fw={500} c={'#5789CF'} size={'26px'}>
                        Danh sách thú cưng của bạn
                    </Text>
                    <Link to={'add-new-pet'}>
                        <Button leftSection={<Add />} bg={'#5789CF'}>
                            Thêm thú cưng của bạn
                        </Button>
                    </Link>
                </Flex>
                <Divider w={'100%'} />
                {loading ? (
                    <Group w={'100%'} justify="center" align="center">
                        <Loader type="bars" />
                    </Group>
                ) : null}
                {data?.data?.length > 0 ? (
                    <Grid gutter={'xl'} w={'100%'}>
                        {data?.data?.map((pet, index) => (
                            <PetItem key={index} pet={pet} />
                        ))}
                    </Grid>
                ) : (
                    <Group mt={30} w={'100%'} justify="center">
                        <Image src={petFood} w={200} />
                        <Text w={'100%'} ta={'center'} c={'gray'} fs={'italic'}>
                            Bạn chưa có thú cưng nào trong danh sách, hãy đăng
                            kí thú cưng mới
                        </Text>
                    </Group>
                )}
            </Group>
        </Group>
    );
}

export default PetListPage;
