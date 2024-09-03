// TODO: change when back is ready
export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  time: string;
  withDetail: boolean;
};

export type TaskStatus = 'pending' | 'progress' | 'review' | 'completed';
