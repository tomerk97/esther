import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import request from 'supertest';
describe('HealthController', () => {
  let app: INestApplication;
  const sendHealth = () => request(app.getHttpServer()).get('/health');

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('Health check', () => {
    it('should return "healthy"', async () => {
      await sendHealth().expect(200).expect('healthy');
    });
  });
});
