import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome do usuário',
        example: 'João Silva',
    })
    @IsString()
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
    name: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao@exemplo.com',
    })
    @IsEmail({}, { message: 'O email deve ser válido.' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: 'senha123',
    })
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    @MaxLength(20, { message: 'A senha deve ter no máximo 20 caracteres.' })
    password: string;

    @ApiProperty({
        description: 'Função do usuário',
        enum: ['ADMIN', 'USER', 'GUEST'],
        default: 'USER',
    })
    @IsEnum(['ADMIN', 'USER', 'GUEST'])
    @IsOptional()
    role?: 'ADMIN' | 'USER' | 'GUEST';
}
