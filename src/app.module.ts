import { CompanyModule } from './company/company.module';

import { WorkspaceModule } from './workspace/workspace.module';
import { AccountModule } from './account/account.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';

import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './account/jwt.guard';
import * as mongooseAutopopulate from 'mongoose-autopopulate';

@Module({
  imports: [
    CompanyModule,
    WorkspaceModule,
    AccountModule,
    MessageModule,
    MongooseModule.forRoot('mongodb://127.0.0.1/peersync', {

      connectionFactory: (connection) => {
        connection.plugin(mongooseAutopopulate);

        return connection;
      },

    },),
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
