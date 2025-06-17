import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { UpdateUserDto } from "src/modules/users/dto/update-user.dto";
import { UserEntity } from "src/modules/users/entities/user.entity";

export interface IUser {
    create(createUserDto: CreateUserDto, tenantId: string): Promise<UserEntity>;
    findAll(tenantId: string): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto, tenantId: string): Promise<UserEntity>;
    remove(id: string, tenantId: string): Promise<UserEntity>;
}