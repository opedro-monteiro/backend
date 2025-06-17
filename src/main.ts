import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');

  app.enableCors({
    origin: 'http://localhost:3000', // trocar para o da PROD
    credentials: true, // permite enviar cookies, auth headers, etc.
  })

  // Pipes and Interceptors
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true, 
    }),
  );

  //  Interceptors
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll', 
      excludeExtraneousValues: true, 
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
