import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
export class UpdateTenantDto {
    @ApiProperty({ example: 'Empresa XYZ' })
    @IsOptional()
    @IsString()
    name: string;
}