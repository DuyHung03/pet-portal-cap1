import {
  Avatar,
  Button,
  FileButton,
  Flex,
  Group,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AddPhotoAlternate } from '@mui/icons-material';
import { useAuthStore } from '../../../store/authStore';
function AddPost() {
  const { user } = useAuthStore();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Flex
        bg={'#f8f8f8'}
        p={20}
        w={700}
        justify="center"
        style={{ borderRadius: '24px' }}
        gap={20}
      >
        <Avatar
          src={user.avatar_url}
          size={'md'}
          name={user.username}
          color="initials"
        />
        <TextInput
          onClick={open}
          readOnly
          placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
          radius={'xl'}
          w={'100%'}
        />
      </Flex>
      <Modal size={500} opened={opened} onClose={close}>
        <Text ta={'center'} size="24px" c={'#5a5f64'} fw={500}>
          Tạo bài viết
        </Text>
        <Group p={20}>
          <Flex align={'center'} gap={10}>
            <Avatar
              src={user.avatar_url}
              size={'md'}
              name={user.username}
              color="initials"
            />
            <Text fw={500} c={'#5a5f64'} size="lg">
              {user.username}
            </Text>
          </Flex>

          <Group w={'100%'}>
            <TextInput
              w={'100%'}
              placeholder="Tiêu đề"
              label="Tiêu đề"
              withAsterisk
            />
            <Textarea
              autosize
              size="xl"
              maxRows={6}
              minRows={4}
              w={'100%'}
              mb={20}
              placeholder={`${user.username} ơi, hãy chia sẻ vài điều nào!`}
            />
            <Flex w={'100%'} justify={'flex-end'} mb={20}>
              <FileButton accept="image/png,image/jpeg">
                {(props) => (
                  <Button {...props} variant="transparent">
                    <AddPhotoAlternate fontSize="large" color="action" />
                  </Button>
                )}
              </FileButton>
            </Flex>
            <Button w={'100%'}>Tạo bài viết</Button>
          </Group>
        </Group>
      </Modal>
    </>
  );
}

export default AddPost;
