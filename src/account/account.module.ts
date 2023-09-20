/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Channel, ChannelSchema, User, UserSchema } from 'src/models';
import { NotificationModule } from 'src/notification/notification.module';
import { jwtConstants } from './constants';
import { AccountController } from './controllers/account.controller';
import { JwtAuthGuard } from './jwt.guard';
import { AccountService } from './services/account.service';
import { JwtStrategy } from './services/jwt.strategy';
import { UserService } from './services/user.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Channel.name, schema: ChannelSchema },]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expiresIn },
        }),
        PassportModule,
        NotificationModule
    ],
    controllers: [AccountController],
    providers: [
        AccountService,
        UserService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [AccountService, UserService, JwtStrategy],
})
export class AccountModule { }
