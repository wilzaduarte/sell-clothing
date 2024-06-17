import { Module } from '@nestjs/common';
import { clothingController } from './clothing.controller';
import { ClothingService } from './clothing.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [clothingController],
  providers: [ClothingService, PrismaService],
})
export class ClothingModule {}
