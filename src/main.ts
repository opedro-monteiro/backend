import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  app.enableCors()

  // Pipes and Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // lança erro se houver propriedades extras
      transform: true, // transforma payloads em instâncias dos DTOs
    }),
  );

  //  Interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll', // Por padrão, exclui todos a menos que marcados com @Expose()
      excludeExtraneousValues: true, // Remove campos não definidos no DTO
    })
  );

  // Swagger Configuration
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  const options: SwaggerCustomOptions = {
    ui: true, // Swagger UI is disabled
    raw: ['json'], // JSON API definition is still accessible (YAML is disabled)
  };
  SwaggerModule.setup('docs', app, documentFactory, options);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
