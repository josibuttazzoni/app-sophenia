

import { useHealth } from '#lib/api/health';
import { ApiHealth } from 'src/types';

export function StatusIndicator() {
  const { data } = useHealth();

  const indicatorColors = {
    connected: 'bg-mountain-meadow',
    disconnected: 'bg-flamingo'
  } as Record<ApiHealth['mongo'], string>;

  return (
    <div className="flex items-center gap-x-2 rounded-sm bg-black/50 px-3 py-2">
      <p>Server {data?.mongo}</p>
      <span className={`${data && indicatorColors[data.mongo]} h-3 w-3 rounded-full`} />
    </div>
  );
}
