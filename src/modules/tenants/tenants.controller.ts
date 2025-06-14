import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TenantPresenter } from 'src/presentation/tenant.presenter';
import { Roles } from '../auth/decorators/roles.decorator';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { UserId } from '../auth/decorators/user.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { TenantResponseDto } from './dto/TenantResponseDto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenants.service';

@ApiTags('Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) { }

  @Post()
  @ApiBody({ type: CreateTenantDto })
  @ApiOkResponse({ type: TenantResponseDto })
  @ApiOperation({ summary: 'Rota para cadastrar tenant' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTenantDto: CreateTenantDto, @UserId() userId: string) {
    const tenant = await this.tenantsService.create(createTenantDto, userId);
    return TenantPresenter.toResponse(tenant);
  }

  @Get()
  @ApiOkResponse({ type: TenantResponseDto, isArray: true })
  @ApiOperation({ summary: 'Rota para listar todos os tenants' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAll(@UserId() userId: string) {
    const tenants = await this.tenantsService.findAll(userId);
    return TenantPresenter.toManyResponse(tenants);
  }

  @Get(':id')
  @ApiOkResponse({ type: TenantResponseDto })
  @ApiOperation({ summary: 'Rota para buscar tenant por ID' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findOne(@Param('id') id: string) {
    const tenant = await this.tenantsService.findOne(id);
    return TenantPresenter.toResponse(tenant);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: UpdateTenantDto })
  @ApiOkResponse({ type: TenantResponseDto })
  @ApiOperation({ summary: 'Rota para atualizar tenant' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto, @TenantId() tenantId: string, @UserId() userId: string) {
    if (id !== tenantId)
      throw new ForbiddenException('Você só pode editar seu próprio tenant.');

    const tenant = await this.tenantsService.update(id, updateTenantDto, userId);
    return TenantPresenter.toResponse(tenant);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOkResponse({ type: TenantResponseDto })
  @ApiOperation({ summary: 'Rota para remover tenant' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async remove(@Param('id') id: string, @TenantId() tenantId: string, @UserId() userId: string) {
    if (id !== tenantId)
      throw new ForbiddenException('Você só pode excluir seu próprio tenant.');

    const tenant = await this.tenantsService.remove(id, userId);
    return TenantPresenter.toResponse(tenant);
  }
}
