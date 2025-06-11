import { ApiProperty } from '@nestjs/swagger';

export class DeleteOneFileDto {
  @ApiProperty()
  id?: string;
}
