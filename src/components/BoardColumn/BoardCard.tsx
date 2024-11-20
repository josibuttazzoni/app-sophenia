import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { Draggable } from 'react-beautiful-dnd';
import { AddRatingRequestVariables } from 'src/types/tasks';

import AddComment from '#assets/add.svg';
import CommentModal from '#components/CommentModal';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useTask } from '#lib/api/tasks';
import { useRating } from '#lib/api/tasks/useRating';
import { TaskStatusDto } from '#lib/enums/tasks';

import { STATUS_COLORS } from './constants';

const DialogTrigger = dynamic(() => import('#components/ui/dialog').then(mod => mod.DialogTrigger), {
  ssr: false
});

export type BoardCardProps = {
  id: string;
  index: number;
  status: TaskStatusDto;
  title: string;
  description: string;
};

export function BoardCard({ id, status, title, description, index }: BoardCardProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.BOARD);

  // TODO: check if necessary [martina]
  const { data } = useTask({ variables: { id } });
  const { mutate: editMutate } = useRating();
  console.log('data', data);

  const handleRateTask = ({ rating, ratingComment }: AddRatingRequestVariables) => {
    editMutate({ id, rating, ratingComment });
  };

  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={status === TaskStatusDto.DONE}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex h-fit min-h-28 w-full flex-col items-start justify-between rounded-lg border-l-4 bg-athens-gray ${STATUS_COLORS[status].stroke} p-2`}
        >
          <div className="flex flex-col gap-y-2">
            <span className="text-sm font-medium">{title}</span>
            <span className="text-xs text-gray-500">{description}</span>
          </div>
          {status === TaskStatusDto.REVIEW && (
            <Dialog>
              <DialogTrigger className="flex flex-row items-center gap-x-1 hover:underline">
                {data?.rating ? (
                  <span>ver comentario</span>
                ) : (
                  <>
                    <AddComment />
                    <span className="cursor-pointer text-left text-[0.65rem] font-medium">
                      {t('addComment')}
                    </span>
                  </>
                )}
              </DialogTrigger>
              <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
                {data?.rating ? <span>ver comentario</span> : <CommentModal title={title} />}
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </Draggable>
  );
}
