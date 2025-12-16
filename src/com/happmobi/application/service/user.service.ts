import { Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { User } from "../../infrastructure/database/schema/user.schema";
import { hash } from 'bcrypt'

@Injectable()
export class UserService implements OnModuleInit {

  constructor(private readonly userRepository: UserRepository) { }

  auth(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async findOne(user): Promise<User | null> {
    return this.userRepository.findOne(user);
  }

  async findById(userId): Promise<User | null> {
    return this.userRepository.findById(userId);
  }

  async delete(userId) {
    return this.userRepository.deleteOne(userId);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async newUser(userRequest: any): Promise<User> {
    const user = await this.findOne(userRequest.userName);
    if (user) throw new UnauthorizedException("Usuário já existe");
    return this.userRepository.newUser(userRequest);
  }

async updateUser(userId: string, userRequest: any) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException("Usuário não existe");

    const hashedPassword =  await hash(userRequest.password, 10)
    userRequest.password = hashedPassword;
    return this.userRepository.update(userId, userRequest);
  }

  async onModuleInit() {
    const admin = await this.userRepository.findOne("admin@gmail.com");
    if(!admin){
      const admin = { userName: "admin@gmail.com", name: "Administrador", password: "123", admin: true};
      await this.userRepository.newUser(admin);

    }    
  }
}
