import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config, { IConfigSchema } from './config';
import { HealthController } from './health/health.controller';
import { QuestionsModule } from './questions/questions.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService<IConfigSchema>) => {
        const { mongo } = configService.get('database', { infer: true });

        return {
          uri: mongo.uri,
          retryAttempts: mongo.retryAttempts,
          retryDelay: mongo.retryDelay,
          connectTimeoutMS: mongo.connectTimeoutMS,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
    QuestionsModule,
    ResultModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
