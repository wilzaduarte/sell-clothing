import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClothDto, UpdateClothDto } from './schema/dto';

@Injectable()
export class ClothingService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, perPage: number, name?: string) {
    const [skip, take] = [(page - 1) * perPage, perPage];

    const where: any = {};

    if (name && name.trim() !== '') {
      where['name'] = {
        contains: name,
        mode: 'insensitive',
      };
    }
    return this.prisma.clothing.findMany({
      where,
      skip,
      take,
    }); // obtem tud kes ropa
  }

  async create(data: CreateClothDto) {
    const cloth = await this.prisma.clothing.create({
      data: {
        ...data,
      },
    });
    return {
      message: 'Successfully created',
      cloth,
    };
  }

  async update(id: number, updateClothingDto: UpdateClothDto) {
    const existingClothing = await this.prisma.clothing.findUnique({
      where: { id },
    });
    if (!existingClothing) {
      throw new NotFoundException('Clothing not found'); //pdta excecao sel k existi
    }
    return this.prisma.clothing.update({
      where: { id },
      data: updateClothingDto,
    }); // Atualiza a roupa
  }

  async remove(id: number) {
    return this.prisma.clothing.delete({ where: { id } }); // remover roupa
  }

  async findAllUsers() {
    return this.prisma.user.findMany(); //obtem todos os usuarios
  }

  async findAllProducts() {
    const products = await this.prisma.clothing.findMany(); //p encontrar  todos os produtos(clothing)
    return products;
  }
}
