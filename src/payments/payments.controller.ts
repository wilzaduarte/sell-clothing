import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post()
  createPurchase(@Body() purchase) {
    return this.paymentsService.createPurchases(purchase);
  }
  @Get()
  getPurchase() {
    return this.paymentsService.getPurchase();
  }
}
