import { Translate } from 'next-translate';

export const STATUS = {
  PENDING: 'pending',
  PROGRESS: 'progress',
  REVIEW: 'review',
  COMPLETED: 'completed'
};

export const getStatusTitle = (t: Translate) => {
  return {
    [STATUS.PENDING]: t('status.pending'),
    [STATUS.PROGRESS]: t('status.progress'),
    [STATUS.REVIEW]: t('status.review'),
    [STATUS.COMPLETED]: t('status.completed')
  };
};

export const STATUS_COLORS = {
  [STATUS.PENDING]: {
    stroke: 'border-prim',
    bg: 'bg-prim'
  },
  [STATUS.PROGRESS]: {
    stroke: 'border-mystic',
    bg: 'bg-mystic'
  },
  [STATUS.REVIEW]: {
    stroke: 'border-snuff',
    bg: 'bg-snuff'
  },
  [STATUS.COMPLETED]: {
    stroke: 'border-willow-grove',
    bg: 'bg-willow-grove'
  }
};
