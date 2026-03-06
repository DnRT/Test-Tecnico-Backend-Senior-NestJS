import { IsString, IsEnum, IsOptional, MinLength } from 'class-validator';
import { TaskStatus, TaskPriority } from '../enums/task.enum';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}

export class UpdateStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}