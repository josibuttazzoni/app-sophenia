import { Translate } from 'next-translate';

import { RoleDto } from '#lib/enums/employees';

const { WORKER, ADMIN } = RoleDto;

export const getRoleTitle = (t: Translate) => {
  return {
    [WORKER]: t('roleDto.worker'),
    [ADMIN]: t('roleDto.admin')
  };
};

export const getRoles = (t: Translate) =>
  [WORKER, ADMIN].map(role => ({
    label: getRoleTitle(t)[role],
    value: role
  }));
