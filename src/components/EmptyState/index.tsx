import Image, { StaticImageData } from 'next/image';

interface EmptyStateProps {
  title: string;
  icon: StaticImageData;
}

export default function EmptyState({ title, icon }: EmptyStateProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-5">
      <Image src={icon} alt="" className="h-auto w-32 md:w-40 lg:w-52" />
      <p className="text-small whitespace-pre-line text-center md:text-lg lg:text-xl">{title}</p>
    </div>
  );
}
