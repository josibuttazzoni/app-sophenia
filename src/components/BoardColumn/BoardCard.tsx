import useTranslation from 'next-translate/useTranslation';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import AddComment from '#assets/add.svg';
import CommentModal from '#components/CommentModal';
import { Dialog, DialogContent } from '#components/ui/dialog';
import { TRANSLATIONS_NAMESPACES } from '#constants/translations';
import { useTask } from '#lib/api/tasks';
import { TaskStatusDto } from '#lib/enums/tasks';

import { MAX_LENGTH, STATUS_COLORS } from './constants';

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
  const { t: tCommon } = useTranslation(TRANSLATIONS_NAMESPACES.COMMON);

  const [commentModalOpen, setCommentModalOpen] = useState(false);

  const { data } = useTask({ variables: { id } });

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const getTruncatedDescription = (text: string) => {
    if (text.length > MAX_LENGTH && !isDescriptionExpanded) {
      return text.substring(0, MAX_LENGTH) + '...';
    }
    return text;
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
            <span className="text-sm font-semibold">{title}</span>
            <span className="text-xs font-medium text-gray-700">
              {/* {t('workerAssigned')} <span className="font-normal">{data?.workerAssigned.fullname}</span> */}
              {t('workerAssigned')} <span className="font-normal">Cristian</span>
            </span>
            <span className="text-xs text-gray-500">
              {getTruncatedDescription(description)}{' '}
              {description.length > MAX_LENGTH && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-[0.7rem] font-medium text-gray-600 hover:underline"
                >
                  {isDescriptionExpanded ? tCommon('readLess') : tCommon('readMore')}
                </button>
              )}
            </span>
          </div>
          {(status === TaskStatusDto.REVIEW || status === TaskStatusDto.DONE) && (
            <Dialog
              open={commentModalOpen}
              onOpenChange={isOpen => {
                setCommentModalOpen(isOpen);
              }}
            >
              <DialogTrigger
                onClick={() => setCommentModalOpen(true)}
                className="mt-4 flex flex-row items-center gap-x-1 hover:underline"
              >
                {data?.rating ? (
                  <span className="cursor-pointer text-left text-[0.65rem] font-medium">
                    {t('viewRating')}
                  </span>
                ) : (
                  status !== TaskStatusDto.DONE && (
                    <>
                      <AddComment />
                      <span className="cursor-pointer text-left text-[0.65rem] font-medium">
                        {t('addRating')}
                      </span>
                    </>
                  )
                )}
              </DialogTrigger>
              <DialogContent className="w-full max-w-lg rounded-xl bg-white p-8">
                <CommentModal
                  id={id}
                  rating={data?.rating}
                  ratingComment={data?.ratingComment}
                  title={title}
                  setCommentModalOpen={setCommentModalOpen}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </Draggable>
  );
}
