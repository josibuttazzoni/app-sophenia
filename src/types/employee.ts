// TODO: change when back is ready
export type Employee = {
  id: string;
  name: string;
  isAvailable: boolean;
  role: Roles;
  genre: Genres;
  email: string;
};

export enum Roles {
  Operativo = 'Operativo',
  Gerencial = 'Gerencial'
}

export enum Genres {
  Male = 'Masculino',
  Female = 'Femenino'
}
