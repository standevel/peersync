import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/models';
import { jwtConstants } from './constants';
import { AccountController } from './controllers/account.controller';
import { JwtAuthGuard } from './jwt.guard';
import { AccountService } from './services/account.service';
import { JwtStrategy } from './services/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        PassportModule,
    ],
    controllers: [AccountController],
    providers: [
        AccountService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [AccountService, JwtStrategy],
})
export class AccountModule { }
