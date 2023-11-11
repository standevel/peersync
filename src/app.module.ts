import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { RbacMiddleware } from './middlewares/rbac.middleware';
import { NotificationModule } from './notification/notification.module';
import { WorkspaceModule } from './workspace/workspace.module';
@Module({
  imports: [
    ChatModule,
    ConfigModule.forRoot({
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
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(RbacMiddleware)
  //     .forRoutes(
  //       { path: 'workspace', method: RequestMethod.POST },
  //       { path: 'team', method: RequestMethod.POST },
  //       { path: 'channel', method: RequestMethod.POST },
  //       { path: 'message', method: RequestMethod.POST },
  //       // Define similar role requirements for other routes
  //     );
  // }
}

