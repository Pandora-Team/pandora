import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';

const start = async () => {

  try {
    const PORT = process.env.API_PORT || 5000;
    const app = await NestFactory.create(AppModule)
    app.enableCors( {
        origin: ["http://localhost:8080", "https://pandora-kpop.ru"],
        credentials: true,
    })
    app.use(cookieParser("1qaz2wsx3edc5tgb4rfv"));
    Sentry.init({
      dsn: 'https://d35c5df097054211a4af0f0ae380a149@o1065035.ingest.sentry.io/6056280',
    });
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e)
  }

}

start()
