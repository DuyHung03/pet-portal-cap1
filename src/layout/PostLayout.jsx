import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';

function PostLayout() {
<<<<<<< HEAD
    return (
        <div>
            <Group pos={'fixed'} style={{ zIndex: '10' }} w={'100%'}>
                <Header title={'Diễn đàn'} />
            </Group>
            <Group w={'100%'} justify='center' pt={150}>
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
=======
  return (
    <div>
      <Header title={'Diễn đàn'} />
      <Group w={'100%'} justify="center">
        <Outlet />
      </Group>
      <Footer />
    </div>
  );
>>>>>>> 22787f03128bd5c87206b03e4350024b292b0c52
}

export default PostLayout;
