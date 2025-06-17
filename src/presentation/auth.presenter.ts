import { plainToInstance } from 'class-transformer';
import { ResponseLoginDto } from 'src/modules/auth/dto/response-login.dto';

export class AuthPresenter {
    static toResponse(user: ResponseLoginDto): ResponseLoginDto {
        return plainToInstance(ResponseLoginDto, user, {
            excludeExtraneousValues: true,
        });
    }
}
