import { ApiProperty } from '@nestjs/swagger';

export class ResponseOneFileDto {
  @ApiProperty()
  imageUrl: string;
}
