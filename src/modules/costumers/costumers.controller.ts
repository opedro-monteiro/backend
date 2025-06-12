import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) { }

  @Post()
  @Roles(Role.USER)
  create(@Body() createCostumerDto: CreateCostumerDto) {
    return this.costumersService.create(createCostumerDto);
  }

  @Get()
  @Roles(Role.USER, Role.GUEST)
  findAll() {
    return this.costumersService.findAll();
  }

  @Get(':id')
  @Roles(Role.USER, Role.GUEST)
  findOne(@Param('id') id: string) {
    return this.costumersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.USER)
  update(@Param('id') id: string, @Body() updateCostumerDto: UpdateCostumerDto) {
    return this.costumersService.update(+id, updateCostumerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costumersService.remove(+id);
  }
}
