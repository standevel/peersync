import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Workspace Service API')
    .setDescription('The service is used to power the workspace app')
    .setVersion('1.0')
    .addTag('Workspace')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
}
bootstrap(); 
