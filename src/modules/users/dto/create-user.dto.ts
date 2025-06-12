import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
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
