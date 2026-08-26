export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}
