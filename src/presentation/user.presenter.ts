import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/modules/users/dto/response-user.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class UserPresenter {
    static toResponse(user: UserEntity): UserResponseDto {
        return plainToInstance(UserResponseDto, user, {
            excludeExtraneousValues: true,
        });
    }

    static toManyResponse(users: UserEntity[]): UserResponseDto[] {
        return plainToInstance(UserResponseDto, users, {
            excludeExtraneousValues: true,
        });
    }
}
