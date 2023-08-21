import { NotificationModule } from './notification/notification.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
import { AccountModule } from './account/account.module';
import { JwtAuthGuard } from './account/jwt.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { MessageModule } from './message/message.module';
import { WorkspaceModule } from './workspace/workspace.module';

@Module({
  imports: [
    NotificationModule,
    CompanyModule,
    WorkspaceModule,
    AccountModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/peersync', {
      connectionFactory: (connection) => {
        connection.plugin(mongooseAutopopulate);

        return connection;
      },
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
