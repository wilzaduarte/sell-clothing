import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private purchases = [];

  createPurchases(purchases) {
    this.purchases.push(purchases);
    return purchases;
  }
  getPurchase() {
    return this.purchases;
  }
}
