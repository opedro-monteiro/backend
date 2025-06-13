import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateTenantDto {
    @ApiProperty({
        description: 'Nome da empresa (tenant)',
        example: 'Empresa XPTO',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
