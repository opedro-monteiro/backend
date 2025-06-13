import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateAddressDto {
    @ApiProperty({
        description: 'Rua do endereço',
        example: 'Rua das Flores',
    })
    @IsString({ message: 'A rua deve ser uma string.' })
    @Length(1, 100, { message: 'A rua deve ter entre 1 e 100 caracteres.' })
    street: string;

    @ApiProperty({
        description: 'Bairro do endereço',
        example: 'Centro',
    })
    @IsString({ message: 'O bairro deve ser uma string.' })
    @Length(1, 100, { message: 'O bairro deve ter entre 1 e 100 caracteres.' })
    neighborhood: string;

    @ApiProperty({
        description: 'Número do endereço',
        example: '123',
    })
    @IsString({ message: 'O número deve ser uma string.' })
    @Length(1, 20, { message: 'O número deve ter entre 1 e 20 caracteres.' })
    number: string;

    @ApiProperty({
        description: 'Estado do endereço',
        example: 'SP',
    })
    @IsString({ message: 'O estado deve ser uma string.' })
    @Length(2, 2, { message: 'O estado deve ter 2 caracteres.' })
    state: string;
}
