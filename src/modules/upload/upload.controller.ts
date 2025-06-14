import {
  BadRequestException,
  Controller,
  Delete,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { DeleteOneFileDto } from './dto/delete-one-file.dto';
import { ResponseDeleteOneFileDto } from './dto/response-delete-one-file.dto';
import { ResponseOneFileDto } from './dto/response-one-file.dto';
import { UploadService } from './upload.service';
import { IsPublic } from '../auth/decorators/public.decorator';

@ApiTags('Upload de arquivos')
@Controller()
export class UploadController {
  constructor(
    private readonly _uploadService: UploadService,
    private readonly _configService: ConfigService,
  ) { }

  @IsPublic()
  @Post('upload/one-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Rota para upload de um arquivo.',
    description:
      'Essa rota aceita arquivos dos tipos png, jpg, jpeg, pdf. Armazena local/nuvem e retorna o link do local de armazenagem.',
  })
  @ApiResponse({ status: 201, type: ResponseOneFileDto })
  @ApiResponse({ status: 422, description: 'Tamanho ou tipo de arquivo inválido.' })
  @ApiBody({
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  })
  async uploadOneFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /png|jpg|jpeg|pdf/ })
        .addMaxSizeValidator({ maxSize: 8388608 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    const response = await this._uploadService.uploadOneFile(file);
    return { ...response };
  }


  @IsPublic()
  @Delete('profile-photo')
  @ApiOperation({ summary: 'Rota para deletar foto de perfil dos usuários.' })
  @ApiResponse({ status: 200, type: ResponseDeleteOneFileDto })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'O id do cliente para excluir a foto de perfil.',
  })
  async deleteProfilePhoto(@Query() query: DeleteOneFileDto) {
    const { id } = query;
    if (!id) throw new BadRequestException('ID do cliente não informado.');
    
    return this._uploadService.deleteProfilePhoto(id);
  }
}
