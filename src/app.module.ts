/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from './account/account.module';
import { JwtAuthGuard } from './account/jwt.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import config from './config/config';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { WorkspaceModule } from './workspace/workspace.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
  }),
    NotificationModule,
    CompanyModule,
    WorkspaceModule,
    AccountModule,
    MessageModule,
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
    }),
    inject: [ConfigService],
  }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }

// standevcode
// Lvtz6gPI8DKcd1m0
// sNbeRPv0Gt3aIHZ6
//mongodb://127.0.0.1/peersync
// mongodb+srv://kingstanley:Nj12063@cluster0.6noj5.mongodb.net/chatserviceDB?retryWrites=true&w=majority
//mongodb+srv://peer_user:sNbeRPv0Gt3aIHZ6@cluster0.vrx0p3m.mongodb.net/peersync?retryWrites=true&w=majority
