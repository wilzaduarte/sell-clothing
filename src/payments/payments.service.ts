import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatepurchaseDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name)
  
  constructor(private prisma: PrismaService) {}

  // Func p criar um pagamento
  async createPayment(payment: CreatepurchaseDto,userId:number) {
    this.logger.log('Criando pagamento ...');
    
    // Verifica se tod kes produt t exist e tm disponibilidade
    for (const item of payment.products) {
      const clothing = await this.prisma.clothing.findUnique({ where: { id: item.id } });
      if (!clothing) {
        throw new Error(`Produto com ID ${item.id} não encontrado.`);
      }
      if (clothing.stock < item.quantity) {
        throw new BadRequestException(`Produto ${clothing.name} não tem quantidade suficiente.`);
      }
    }

    // Calcular o valor total do pagamento
    let totalPrice = 0;
    for (const item of payment.products) {
      const clothing = await this.prisma.clothing.findUnique({ where: { id: item.id } });
      totalPrice += clothing.price * item.quantity;
      await this.prisma.clothing.update({
        where: { id: item.id },
        data: { stock: clothing.stock - item.quantity },
      });
    }


    // Armazenar o pagamento no banco de dados
    
        const createdPayment = await this.prisma.payment.create({
          data: {
            price: totalPrice,
            country: payment.country,
            age: payment.age,
            state: payment.state,
            name: payment.name,
            items: payment.products,
            cardNumber: payment.cardNumber,
            user: { connect: { id: userId } },
          },
        });
    
    
    this.logger.log('Pagamento criado com sucesso', createdPayment);   
    return createdPayment;
  }

  // Função para obter todos os pagamentos
  async getPayments() {
    return this.prisma.payment.findMany({
      include: {
        clothingItems: {
          include: {
            clothing: true,
          },
        },
      },
    });
  }
}