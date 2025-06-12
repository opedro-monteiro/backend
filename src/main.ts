import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // lança erro se houver propriedades extras
      transform: true, // transforma payloads em instâncias dos DTOs
    }),
  );

  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
