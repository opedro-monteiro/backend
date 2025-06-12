import { plainToInstance } from 'class-transformer';
import { ResponseLoginDto } from 'src/modules/auth/dto/response-login.dto';
import { UserToken } from 'src/modules/auth/models/UserToken';

export class AuthPresenter {
    static toResponse(user: UserToken): ResponseLoginDto {
        return plainToInstance(ResponseLoginDto, user, {
            excludeExtraneousValues: true,
        });
    }
}
