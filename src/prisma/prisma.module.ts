import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'MY SECRET',
    }),
  ],
  providers: [PrismaService, AuthService],
  exports: [PrismaService],
})
export class PrismaModule {}
