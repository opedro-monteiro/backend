import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreateAddressDto } from './address/create-address.dto';

export class CreateCostumerDto {
    @ApiProperty({
        description: 'Nome do cliente',
        example: 'Maria Oliveira',
    })
    @IsString({ message: 'O nome deve ser uma string.' })
    @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
    name: string;

    @ApiProperty({
        description: 'Email do cliente',
        example: 'maria@exemplo.com',
    })
    @IsEmail({}, { message: 'O email deve ser válido.' })
    email: string;

    @ApiProperty({
        description: 'Indica se o cliente está ativo',
        example: true,
        default: true,
    })
    @IsBoolean()
    isActive: boolean;

    @ApiProperty({
        description: 'Contato do cliente',
        example: '(11) 91234-5678',
    })
    @IsString({ message: 'O contato deve ser uma string.' })
    @MinLength(8, { message: 'O contato deve ter no mínimo 8 caracteres.' })
    @MaxLength(20, { message: 'O contato deve ter no máximo 20 caracteres.' })
    contact: string;

    @ApiPropertyOptional({
        description: 'URL da imagem do cliente',
        example: 'https://exemplo.com/imagem.jpg',
    })
    @IsOptional()
    @IsString({ message: 'A URL da imagem deve ser uma string.' })
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'Endereço do cliente',
        type: () => CreateAddressDto,
    })
    @ValidateNested()
    @Type(() => CreateAddressDto)
    address: CreateAddressDto;
}