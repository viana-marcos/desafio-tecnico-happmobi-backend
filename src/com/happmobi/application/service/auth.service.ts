import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(userRequest: any) {
        const user = await this.usersService.findOne(userRequest.email);
        if (!user) throw new UnauthorizedException("Usuário não existe");
        const isValidPassword = await compare(userRequest.password, user.password)
        if (!isValidPassword) throw new UnauthorizedException("Senha inválida");
        const payload = { sub: user._id, name: user.name, userName: user.userName, admin: user.admin };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
