import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class ResponseLoginDto {
  @ApiProperty({ required: false })
  token: string;

  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ enum: [Role.ADMIN, Role.USER], required: false })
  role: Role;

}
