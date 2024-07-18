import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { validate } from 'class-validator';
import { CreatepurchaseDto } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/auth/getuser.decorator';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  //endpoint p cria compra
  @Post()
  async createPurchase(@Body() purchase: CreatepurchaseDto,@GetUser('id') userId:number) {
    //valida obj d compra
    const erros = await validate(purchase);
    if(erros.length > 0){
      throw new Error('validation falied');
    }
    return this.paymentsService.createPayment(purchase,userId);
  }
  //endpoi p obt compra
  @Get()
  getPurchase() {
    return this.paymentsService.getPayments();
  }
}