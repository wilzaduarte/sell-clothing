import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, signinDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles/roles.guard';
import { Roles } from './roles/rodes.decorator';
import { UseRoles } from './roles/roles.enum';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './auth/getuser.decorator';
import { Roles as PrismaRoles } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('signup')
  async signup(@Body() data: AuthDto) {
    const { token } = await this.authservice.signup(data);
    return { token };
  }

  @Post('signin')
  async signin(@Body() data: signinDto) {
    const { token } = await this.authservice.signin(data);
    return { token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@GetUser() User: any) {
    if (!User) {
      return { error: 'USER NOT AUTENTICATED' };
    }
    return User;
  }

  @Roles(PrismaRoles.ADMIN) // apenas o usuario com admin pd acessar a esta metodo
  @Post('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAdmin() {}
}
