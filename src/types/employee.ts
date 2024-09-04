// TODO: change when back is ready
export type Employee = {
    id: string;
    name: string;
    isAvailable: boolean;
    role: Roles;
  };

export enum Roles {Operativo="Operativo", Gerencial="Gerencial"}; 