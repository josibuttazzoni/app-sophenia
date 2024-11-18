import { GetBacklogResponse, GetTaskByIdResponse } from 'src/types/tasks';

export const mapTask = ({ _id, ...task }: GetTaskByIdResponse) => {
  return {
    id: _id,
    ...task
  };
};

export const mapTasks = (tasks: GetTaskByIdResponse[]) => {
  return tasks.map(({ _id, ...task }: GetTaskByIdResponse) => ({
    id: _id,
    ...task
  }));
};

export const mapBacklog = (backlog: GetBacklogResponse[]) => {
  return backlog.map(({ _id, ...backlog }: GetBacklogResponse) => ({
    id: _id,
    ...backlog
  }));
};
