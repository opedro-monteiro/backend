import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        description: 'O e-mail deve ser um endereço de e-mail válido. Não deve estar vazio e deve conter um símbolo "@".'
    })
    @IsString()
    @MinLength(1)
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'A senha deve ter entre 6 e 12 caracteres. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial.'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(12)
    password: string;
}