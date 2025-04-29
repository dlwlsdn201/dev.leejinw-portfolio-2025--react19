import { Modal, Paper } from '@mantine/core';
import { CommentInputForm } from '@/features/comment';
import { RiAddLine } from 'react-icons/ri';
import { COLOR_THEME } from '@/app/config/colors';
import { useState } from 'react';

export const CommentInputWidget = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="w-full mobile:hidden tablet:flex tablet:flex-[0.4] h-[80vh]">
        <Paper
          styles={{
            root: {
              backgroundColor: 'rgba(17, 24, 39, 0.2)',
              backdropFilter: 'blur(0.25rem)',
            },
          }}
          radius="md"
          p="xl"
          className="w-full h-[100%] "
        >
          <CommentInputForm />
        </Paper>
      </div>

      {/* Mobile 사이즈 기기일 때, 입력 폼 Modal 실행 트리거 버튼 */}
      <button
        className={`tablet:hidden fixed bottom-6 right-6 p-2  rounded flex z-[9999] bg-[${COLOR_THEME.light.primary}]`}
        type="button"
        onClick={() => setOpenModal(true)}
      >
        <RiAddLine color={COLOR_THEME.light.default} />
      </button>
      <Modal
        title="새 방명록"
        opened={openModal}
        onClose={() => setOpenModal(false)}
        size="md"
        centered
        padding={'lg'}
      >
        <div className="py-4">
          <CommentInputForm />
        </div>
      </Modal>
    </>
  );
};
