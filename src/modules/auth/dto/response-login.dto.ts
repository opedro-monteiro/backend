import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

class UserDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty({ enum: Role })
    @Expose()
    role: Role;

    @ApiProperty()
    @Expose()
    tenantId: string;
}

export class ResponseLoginDto {
    @ApiProperty({ required: false })
    @Expose()
    accessToken: string;

    @ApiProperty({ required: false })
    @Expose()
    refreshToken: string;

    @Expose()
    @ApiProperty({
        required: false,
    })
    @Type(() => UserDto)
    @ValidateNested()
    user: UserDto;
}