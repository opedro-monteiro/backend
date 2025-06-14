import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth, ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiOperation, ApiTags
} from '@nestjs/swagger';
import { UserPresenter } from 'src/presentation/user.presenter';
import { Roles } from '../auth/decorators/roles.decorator';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Role } from '../auth/enums/role.enum';

@ApiTags('Usuarios')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiOperation({ summary: 'Rota para cadastrar usuário' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto, @TenantId() tenantId: string) {
    const user = await this.usersService.create(createUserDto, tenantId);
    return UserPresenter.toResponse(user)
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Rota para listar todos os usuários' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAll() {
    const users = await this.usersService.findAll();
    return UserPresenter.toManyResponse(users);
  }

  @Get(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Rota para buscar usuário por ID' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return UserPresenter.toResponse(user)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rota para atualizar usuário' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return UserPresenter.toResponse(user)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Rota para remover usuário' })
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return UserPresenter.toResponse(user)
  }
}
