import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsUUID, Length } from 'class-validator';
import { CostumerEntity } from '../../entities/costumer.entity';

export class AddressDto {
    @ApiProperty({
        description: 'ID do endereço',
        example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
    })
    @IsUUID()
    @Expose()
    id: string;

    @ApiProperty({
        description: 'Rua do endereço',
        example: 'Rua das Flores',
    })
    @IsString({ message: 'A rua deve ser uma string.' })
    @Length(1, 100, { message: 'A rua deve ter entre 1 e 100 caracteres.' })
    @Expose()
    street: string;

    @ApiProperty({
        description: 'Bairro do endereço',
        example: 'Centro',
    })
    @IsString({ message: 'O bairro deve ser uma string.' })
    @Length(1, 100, { message: 'O bairro deve ter entre 1 e 100 caracteres.' })
    @Expose()
    neighborhood: string;

    @ApiProperty({
        description: 'Número do endereço',
        example: '123',
    })
    @IsString({ message: 'O número deve ser uma string.' })
    @Length(1, 20, { message: 'O número deve ter entre 1 e 20 caracteres.' })
    @Expose()
    number: string;

    @ApiProperty({
        description: 'Estado do endereço',
        example: 'SP',
    })
    @IsString({ message: 'O estado deve ser uma string.' })
    @Length(2, 2, { message: 'O estado deve ter 2 caracteres.' })
    @Expose()
    state: string;
}