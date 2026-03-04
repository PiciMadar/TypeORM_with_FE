import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export class UserService {
  private userRepository : Repository<User> = AppDataSource.getRepository(User);

  async createUser(name : string, email: string,password: string) {
    const user = this.userRepository.create({ name, email, password});
    await this.userRepository.save(user);
    return user;
  }

  async listUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(id: string, userData: Partial<User>) {
    await this.userRepository.update(id, userData);
    return this.getUserById(id);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }

  async listUsersWithTasks() {
    return this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect("user.tasks", "task")
      .getMany();
  }
}