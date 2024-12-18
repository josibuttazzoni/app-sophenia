import Login from '#components/Login';
import { RoleDto } from '#lib/enums/employees';

export default function LoginPage() {
  return <Login role={RoleDto.WORKER} />;
}
