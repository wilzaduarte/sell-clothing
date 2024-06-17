import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import {Roles as PrismaRoles} from "@prisma/client"
import { ROLES_KEY } from './rodes.decorator';
import * as jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';
import { payloadData } from '../dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private refletor: Reflector, 
    private config: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.refletor.get<PrismaRoles[]>(ROLES_KEY, context.getHandler());
    if (!roles || roles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorizationHeader: string = request.headers["authorization"];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')){
      const token = authorizationHeader.substring(7);
      const decodedToken : any = jwt.verify(token,this.config.get("JWT_SECRET"))
      const user = decodedToken as payloadData

      return roles.some((role) => user.roles === role)
    };
    return false;
  }

}
