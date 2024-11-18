import { Translate } from 'next-translate';

import { TaskStatusDto } from '#lib/enums/tasks';

const { PENDING, PROGRESS, REVIEW, DONE } = TaskStatusDto;

export const getStatusTitle = (t: Translate) => {
  return {
    [PENDING]: t('status.pending'),
    [PROGRESS]: t('status.progress'),
    [REVIEW]: t('status.review'),
    [DONE]: t('status.completed')
  };
};

export const STATUS_COLORS = {
  [PENDING]: {
    stroke: 'border-prim',
    bg: 'bg-prim'
  },
  [PROGRESS]: {
    stroke: 'border-mystic',
    bg: 'bg-mystic'
  },
  [REVIEW]: {
    stroke: 'border-snuff',
    bg: 'bg-snuff'
  },
  [DONE]: {
    stroke: 'border-willow-grove',
    bg: 'bg-willow-grove'
  }
};
