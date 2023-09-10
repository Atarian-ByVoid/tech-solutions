import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Extension Project')
    .setDescription('API TechSolutions')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Exportar a documentação do Swagger em formato JSON
  const swaggerJson = JSON.stringify(document);
  writeFileSync(join(__dirname, '../swagger.json'), swaggerJson);

  await app.listen(process.env.PORT);
}
bootstrap();
