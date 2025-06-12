import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Expose } from 'class-transformer';


export class ResponseLoginDto {
  @ApiProperty({ required: false })
  @Expose()
  token: string;

  @Expose()
  @ApiProperty({ required: false })
  id: string;

  @Expose()
  @ApiProperty({ enum: [Role.ADMIN, Role.USER], required: false })
  role: Role;

}
