import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, signinDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signin(data: signinDto) {
    //encontre o usuario por email
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    //se o usuario nao sair,lance excecao
    if (!user) throw new ForbiddenException('credenciais incorretos');
    //compare password
    const pwMatches = await argon.verify(user.hash, data.password);
    if (!pwMatches) throw new ForbiddenException('credenciais incorretos');
    // envia od vx p usuario
    const token = await this.signToken(user.id, user.email, user.role);
    return { token };
  }

  async signup(data: AuthDto) {
    //gerar o hash do password
    const hash = await argon.hash(data.password);
    //criar o usuario no novo banco de dados(db)
    try {
      const user = await this.prisma.user.create({
        data: {
          fristName: data.name,
          email: data.email,
          lastName: data.lastName,
          hash,
          role: 'USER',
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientUnknownRequestError) {
        if (error.message === 'P2002') {
          throw new ConflictException('Email ja existente');
        }
      }
      throw error;
    }
    //dpox de cria kel usuario t geral um token jwt
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    // gera 1 token jwt p usuario autenticod
    const token = await this.signToken(user.id, user.email, user.role);
    return { token };
  }
  signToken(userId: number, email: string, roles: string): Promise<string> {
    const payload = { sub: userId, email, roles };
    const secret = this.config.get('JWT_SECRET');
    return this.jwt.signAsync(payload, {
      // expiresIn: '15m',
      secret: secret,
    });
  } //try catch para o redor da decodificacao e verificacao do token jwt no caso de otxa err ao verifcar lanco uma forbiddenException informando q o token e invalido.
  async varifyToken(token: string) {
    try {
      const decoded = await this.jwt.verifyAsync(token); //xpia se kel token jwt e valido
      const user = await this.prisma.user.findUnique({
        // xpia kel usuario n bd k base n Id trod n kel token
        where: { id: decoded.sub },
      });
      return user;
    } catch (error) {
      // capta erre caso kel token e invalid
      throw new ForbiddenException('Token invalido');
    }
  }
}
