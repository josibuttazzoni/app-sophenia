import { CounterActions } from './CounterActions';
import { CounterDisplay } from './CounterDisplay';

export function Counter() {
  return (
    <>
      <p>This counter works via context and dependency injection</p>
      <CounterDisplay />
      <CounterActions />
    </>
  );
}
