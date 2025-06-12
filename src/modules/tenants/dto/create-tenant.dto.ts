import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

class AdminUserDto {
    @ApiProperty({ example: 'Carlos Silva' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'carlos@empresa.com' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class CreateTenantDto {
    @ApiProperty({
        description: 'Nome da empresa (tenant)',
        example: 'Empresa XPTO',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Dados do usuário ADMIN que será criado junto com o tenant',
        type: AdminUserDto,
    })
    @ValidateNested()
    @Type(() => AdminUserDto)
    admin: AdminUserDto;
}
