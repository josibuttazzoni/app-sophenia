import { useState } from 'react';

import EditTasksContent from './EditTasksContent';
import GenerateTasksContent from './GenerateTasksContent';

export default function GenerateTasksModal() {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? <EditTasksContent /> : <GenerateTasksContent setIsEditing={setIsEditing} />;
}
