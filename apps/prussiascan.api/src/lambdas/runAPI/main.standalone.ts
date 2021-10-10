import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { ApplicationModule } from './modules/ApplicationModule';

(async () => {
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );

    await app.listen(process.env.PORT || 3000);
})();
