import { AsyncCounterActions } from './AsyncCounterActions';
import { AsyncCounterDisplay } from './AsyncCounterDisplay';

export function AsyncCounter() {
  return (
    <>
      <p>
        This counter works via local storage and async re-hydration, check the page source to see the data
        that comes back
      </p>
      <AsyncCounterDisplay />
      <AsyncCounterActions />
    </>
  );
}
