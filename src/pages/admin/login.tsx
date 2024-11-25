import Login from '#components/Login';
import { RoleDto } from '#lib/enums/employees';

export default function AdminLoginPage() {
  return <Login role={RoleDto.ADMIN} />;
}
