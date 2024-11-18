import { GetTaskByIdResponse } from 'src/types/tasks';

export const mapTask = ({ _id, ...task }: GetTaskByIdResponse) => {
  return {
    id: _id,
    ...task
  };
};
