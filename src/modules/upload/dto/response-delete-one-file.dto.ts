import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteOneFileDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  imageUrl?: string;
  @ApiProperty()
  tenantId?: string;
}
