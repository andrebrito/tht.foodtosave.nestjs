import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { PersonModule } from '../src/person/person.module';

describe('Perosn (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PersonModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/person (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/person');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(0);
  });

  it('/person (POST)', async () => {
    const responseFromPost = await request(app.getHttpServer())
      .post('/person')
      .send({ name: 'Andrew' });

    expect(responseFromPost.statusCode).toBe(201);
    expect(responseFromPost.body).toEqual({
      id: expect.any(Number),
      name: 'Andrew',
      createdAt: expect.any(String),
    });

    const responseFromGetAfterPosting = await request(app.getHttpServer()).get(
      '/person',
    );

    expect(responseFromGetAfterPosting.statusCode).toBe(200);
    expect(responseFromGetAfterPosting.body).toEqual([
      {
        id: responseFromPost.body.id,
        name: 'Andrew',
        createdAt: expect.any(String),
      },
    ]);

    const responseFromGetOneAfterPosting = await request(
      app.getHttpServer(),
    ).get(`/person/${responseFromPost.body.id}`);

    expect(responseFromGetOneAfterPosting.statusCode).toBe(200);
    expect(responseFromGetOneAfterPosting.body).toEqual({
      id: responseFromPost.body.id,
      name: 'Andrew',
      createdAt: expect.any(String),
    });
  });
});
