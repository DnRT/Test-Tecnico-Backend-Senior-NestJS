import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { TasksController } from '../controllers/task.controller';
import { TasksService } from '../services/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
