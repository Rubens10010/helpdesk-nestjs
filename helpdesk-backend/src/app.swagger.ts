import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const initSwagger = (app: INestApplication) => {
    const swaggerConfig = new DocumentBuilder()
    .setTitle("HelpDesk API")
    .setDescription("Esta es una API del sistema de help desk de la OUIS")
    .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, document);
}