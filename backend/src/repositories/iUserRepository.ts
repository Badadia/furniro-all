import { User, UserCreateDTO } from "../model/user";

export default interface IUserRepository {
  create(data: UserCreateDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
