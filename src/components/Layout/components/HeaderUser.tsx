import { signOut } from 'next-auth/react';
import Image from 'next/image';

import { Button } from '#components/Button';

import { IHeaderUserProps } from './types';

export function HeaderUser({ user }: IHeaderUserProps) {
  return (
    <div className="flex items-center gap-4 font-semibold">
      <Button onClick={() => signOut()}>Logout</Button>
      {user.avatarUrl !== '' && (
        <Image
          src={user.avatarUrl}
          width={10}
          height={10}
          alt="user picture"
          className="h-8 w-8 rounded-full"
        />
      )}
    </div>
  );
}
