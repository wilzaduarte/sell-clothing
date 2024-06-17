import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClothingService } from './clothing.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseRoles } from 'src/auth/roles/roles.enum';
import { Roles } from 'src/auth/roles/rodes.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateClothDto, UpdateClothDto } from './schema/dto';
import { Roles as PrismaRoles } from '@prisma/client';

@Controller('clothing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class clothingController {
  constructor(private readonly clothingService: ClothingService) {}

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('name') name?: string,
  ) {
    page = page && page > 0 ? page : 1;
    perPage = perPage && perPage > 0 ? perPage : 10;
    return this.clothingService.findAll(page, perPage, name);
  }

  @Post()
  @Roles(PrismaRoles.ADMIN) // Apenas para administradores
  async create(@Body() createClothingDto: CreateClothDto) {
    return this.clothingService.create(createClothingDto);
  }

  @Patch(':id')
  @Roles(PrismaRoles.ADMIN)
  @UseGuards(JwtAuthGuard) // Autenticacao JWT
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClothingDto: UpdateClothDto,
  ) {
    return this.clothingService.update(id, updateClothingDto);
  }

  @Delete(':id')
  @Roles(PrismaRoles.ADMIN)
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.clothingService.remove(id);
  }
}
