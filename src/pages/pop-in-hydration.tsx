import { AsyncCounter } from '#components/AsyncCounter';
import { Header } from '#components/Layout/Header';
import { PageHead } from '#components/PageHead';
import { StatusIndicator } from '#components/StatusIndicator';

export default function PopInHydration() {
  return (
    <>
      <PageHead />
      <Header />
      <StatusIndicator />
      <p>The count message will pop in after hydration</p>
      <AsyncCounter />
    </>
  );
}
