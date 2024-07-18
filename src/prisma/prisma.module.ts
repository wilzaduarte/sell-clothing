import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PaymentsController } from 'src/payments/payments.controller';
import { PaymentsService } from 'src/payments/payments.service';


@Global()
@Module({
  imports: [
    JwtModule.register({
      secret: 'MY SECRET',
    }),
  ],
  controllers: [PaymentsController],
  providers: [PrismaService, AuthService,PaymentsService],
  exports: [PrismaService],
})
export class PrismaModule {}
