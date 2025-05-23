import { CommentPageLayout } from '@app/routes/layout/CommentPageLayout';
import {
  CommentInputWidget,
  CommentListWidget,
  CommentTitle,
} from '@widgets/comment';

export const CommentPage: React.FC = () => {
  return (
    <CommentPageLayout>
      <CommentTitle />
      <div className="w-full flex py-10 gap-x-6">
        <CommentListWidget />
        <CommentInputWidget />
      </div>
    </CommentPageLayout>
  );
};
