import {
  ActionIcon,
  Button,
  Group,
  Modal,
  PasswordInput,
  Text,
} from '@mantine/core';
import { IconSize } from '@/app/config/icon';
import { toolsIconProvider } from '@/shared/assets/icon/tools';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { DELETE_COMMENT_DATA } from '@/features/comment/api/comment';
import { readComments } from '@/entities/comment/api/comment';
import { useCommentStore } from '@/store';

export const CommentDeleteButton = ({ deleteId }: { deleteId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deletePassword, setDeletePassword] = useState('');
  const { updateComments } = useCommentStore();

  const deleteComment = async () => {
    await DELETE_COMMENT_DATA({
      deleteId,
      deletePassword,
      callback: () => {
        console.log('삭제 성공');
        close();
        readComments({
          dispatch: updateComments,
        });
      },
    });
  };

  const handleOpenDeleteModal = (id: string) => {
    setDeletePassword('');
    open();
  };

  const deleteIcon = toolsIconProvider({ keys: ['delete'] }).map(
    ({ IconElement }, idx) => <IconElement key={idx} size={IconSize.SMALL} />
  );

  return (
    <>
      <ActionIcon
        c="red"
        variant="subtle"
        onClick={() => handleOpenDeleteModal(deleteId)}
        className="hover:bg-red-50"
      >
        {...deleteIcon}
      </ActionIcon>

      <Modal opened={opened} onClose={close} title="방명록 삭제" centered>
        <div className="p-2">
          <Text size="sm" mb="md">
            방명록을 삭제하려면 작성 시 입력했던 비밀번호를 입력해주세요.
          </Text>
          <PasswordInput
            placeholder="비밀번호"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            mb="md"
          />
          <Group justify="flex-end">
            <Button variant="outline" onClick={close}>
              취소
            </Button>
            <Button c="red" onClick={deleteComment}>
              삭제
            </Button>
          </Group>
        </div>
      </Modal>
    </>
  );
};
