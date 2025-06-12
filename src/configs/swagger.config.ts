import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentação da API')
    .setDescription('Essa API foi construída usando NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();