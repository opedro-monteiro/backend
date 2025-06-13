import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class TenantResponseDto {
    @ApiProperty({ description: 'ID do tenant', example: '123e4567-e89b-12d3-a456-426614174000' })
    @Expose()
    id: string;

    @ApiProperty({ description: 'Nome do tenant', example: 'Empresa XPTO' })
    @Expose()
    name: string;
}
