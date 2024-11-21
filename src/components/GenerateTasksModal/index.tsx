import { useState } from 'react';

import EditTasksContent from './EditTasksContent';
import GenerateTasksContent from './GenerateTasksContent';

export default function GenerateTasksModal({
  setTasksModalOpen
}: {
  setTasksModalOpen: (open: boolean) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditTasksContent setTasksModalOpen={setTasksModalOpen} />
  ) : (
    <GenerateTasksContent setIsEditing={setIsEditing} />
  );
}
