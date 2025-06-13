import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { AddressEntity } from 'src/modules/costumers/entities/address.entity';
import { AddressDto } from './address/address.dto';

export class CostumerResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    tenantId: string;

    @ApiProperty()
    @Expose()
    publicId: string;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    email: string;

    @ApiProperty()
    @Expose()
    isActive: boolean;

    @ApiProperty()
    @Expose()
    contact: string;

    @ApiPropertyOptional()
    @Expose()
    imageUrl?: string;

    @ApiPropertyOptional({ type: () => AddressDto })
    @Expose()
    @Type(() => AddressDto)
    address?: AddressDto;

    @ApiProperty()
    @Expose()
    createdAt: Date;

    @ApiProperty()
    @Expose()
    updatedAt: Date;
}
