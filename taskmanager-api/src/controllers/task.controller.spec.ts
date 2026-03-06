import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TaskModule } from '../modules/task.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TaskStatus, TaskPriority } from '../tasks/enums/task.enum';

describe('TasksController (E2E)', () => {
  let app: INestApplication;

  const mockTaskRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(task => Promise.resolve({ id: 1, ...task })),
    find: jest.fn().mockResolvedValue([
      { id: 1, title: 'Test Task', status: TaskStatus.PENDING }
    ]),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (id === 1) return Promise.resolve({ id: 1, title: 'Test Task' });
      return Promise.resolve(null);
    }),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TaskModule],
    })
      .overrideProvider(getRepositoryToken(Task))
      .useValue(mockTaskRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });
  describe('POST /tasks', () => {
    it('debería crear una tarea y retornar 201', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'Nueva Tarea Jest',
          priority: TaskPriority.HIGH
        })
        .expect(201)
        .expect(res => {
          expect(res.body.title).toBe('Nueva Tarea Jest');
          expect(res.body).toHaveProperty('id');
        });
    });

    it('debería fallar (400) si el titulo es muy corto', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({ title: 'ab' })
        .expect(400);
    });
  });

  describe('GET /tasks', () => {
    it('debería obtener todas las tareas', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0].title).toBe('Test Task');
        });
    });

    it('debería obtener una tarea por ID', () => {
      return request(app.getHttpServer())
        .get('/tasks/1')
        .expect(200);
    });

    it('debería dar 404 si la tarea no existe', () => {
      return request(app.getHttpServer())
        .get('/tasks/999')
        .expect(404);
    });
  });

  describe('PATCH /tasks/:id/status', () => {
    it('debería actualizar solo el estado', () => {
      return request(app.getHttpServer())
        .patch('/tasks/1/status')
        .send({ status: TaskStatus.DONE })
        .expect(200);
    });

    it('debería fallar si el estado no es válido (Enum)', () => {
      return request(app.getHttpServer())
        .patch('/tasks/1/status')
        .send({ status: 'completed' })
        .expect(400);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});