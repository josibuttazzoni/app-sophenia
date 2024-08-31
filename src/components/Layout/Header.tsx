import { signIn } from 'next-auth/react';
import Image from 'next/image';

import logo from '#assets/logo.svg';
import Button from '#components/Button';
import { useLoggedUser } from '#lib/hooks/user/query/useLoggedUser';

import { HeaderUser } from './components/HeaderUser';

export function Header() {
  const { isLogged, data: user } = useLoggedUser();

  return (
    <div className="flex w-full items-center justify-between pb-20">
      <Image width={154} src={logo} alt="logo" />
      {isLogged && user ? <HeaderUser user={user} /> : <Button onClick={() => signIn('auth0')}>Login</Button>}
    </div>
  );
}
