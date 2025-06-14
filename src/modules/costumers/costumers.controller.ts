import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CostumerPresenter } from 'src/presentation/costumer.presenter';
import { Roles } from '../auth/decorators/roles.decorator';
import { TenantId } from '../auth/decorators/tenant.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { CostumerResponseDto } from './dto/response-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@ApiTags('Clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) { }

  @Post()
  @Roles(Role.USER)
  @ApiBody({ type: CreateCostumerDto })
  @ApiOkResponse({ type: CostumerResponseDto })
  @ApiOperation({ summary: 'Rota para cadastrar cliente' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCostumerDto: CreateCostumerDto, @TenantId() tenantId: string) {
    const costumer = await this.costumersService.create(createCostumerDto, tenantId);
    return CostumerPresenter.toResponse(costumer);
  }

  @Get()
  @Roles(Role.USER, Role.GUEST)
  @ApiOperation({ summary: 'Rota para listar todos os clientes' })
  @ApiOkResponse({ type: CostumerResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAll() {
    const costumers = await this.costumersService.findAll();
    return CostumerPresenter.toManyResponse(costumers);
  }

  @Get(':id')
  @Roles(Role.USER, Role.GUEST)
  @ApiOperation({ summary: 'Rota para buscar cliente por ID' })
  @ApiOkResponse({ type: CostumerResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findOne(@Param('id') id: string) {
    const costumer = await this.costumersService.findOne(id);
    return CostumerPresenter.toResponse(costumer);
  }

  @Patch(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Rota para atualizar cliente' })
  @ApiBody({ type: UpdateCostumerDto })
  @ApiOkResponse({ type: CostumerResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(@Param('id') id: string, @Body() updateCostumerDto: UpdateCostumerDto) {
    const costumer = await this.costumersService.update(id, updateCostumerDto);
    return CostumerPresenter.toResponse(costumer);
  }

  @Delete(':id')
  @Roles(Role.USER)
  @ApiOperation({ summary: 'Rota para remover cliente' })
  @ApiOkResponse({ type: CostumerResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async remove(@Param('id') id: string) {
    const costumer = await this.costumersService.remove(id);
    return CostumerPresenter.toResponse(costumer);
  }
}
