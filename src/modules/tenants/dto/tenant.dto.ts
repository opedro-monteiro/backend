import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { CostumerEntity } from 'src/modules/costumers/entities/costumer.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

export class TenantDto {
    @ApiProperty({ description: 'ID do tenant', example: '123e4567-e89b-12d3-a456-426614174000' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    id: string;

    @ApiProperty({ description: 'Nome do tenant', example: 'Empresa XPTO' })
    @IsString()
    @IsNotEmpty()
    @Expose()
    name: string;

    @ApiProperty({
        description: 'Lista de clientes associados ao tenant',
        type: () => CostumerEntity, isArray: true
    })
    clientes: CostumerEntity[];

    @ApiProperty({
        description: 'Lista de usuários associados ao tenant',
        type: () => UserEntity, isArray: true
    })
    usuarios: UserEntity[];
}