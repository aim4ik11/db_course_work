# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- Create RoleHasPermission table
CREATE TABLE "RoleHasPermission"
(
    "appointed"     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "role_id"       INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    PRIMARY KEY ("role_id", "permission_id"),
    FOREIGN KEY ("permission_id") REFERENCES "Permission" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE CASCADE
);

-- Create Permission table
CREATE TABLE "Permission"
(
    "id"   SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

-- Create AnswerVariant table
CREATE TABLE "AnswerVariant"
(
    "id"          SERIAL PRIMARY KEY,
    "text"        VARCHAR(255) NOT NULL,
    "question_id" INTEGER      NOT NULL,
    FOREIGN KEY ("question_id") REFERENCES "Question" ("id") ON DELETE CASCADE
);

-- Create Question table
CREATE TABLE "Question"
(
    "id"        SERIAL PRIMARY KEY,
    "text"      VARCHAR(255) NOT NULL,
    "survey_id" INTEGER      NOT NULL,
    FOREIGN KEY ("survey_id") REFERENCES "Survey" ("id") ON DELETE CASCADE
);

-- Create Role table
CREATE TABLE "Role"
(
    "id"   SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

-- Create Survey table
CREATE TABLE "Survey"
(
    "id"          SERIAL PRIMARY KEY,
    "title"       VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "created"     TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    "user_id"     INTEGER      NOT NULL,
    "state"       VARCHAR(255) DEFAULT 'OPENED',
    FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- Create PassedSurvey table
CREATE TABLE "PassedSurvey"
(
    "id"        SERIAL PRIMARY KEY,
    "survey_id" INTEGER NOT NULL,
    "passed"    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "user_id"   INTEGER NOT NULL,
    FOREIGN KEY ("survey_id") REFERENCES "Survey" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- Create Answer table
CREATE TABLE "Answer"
(
    "id"               SERIAL PRIMARY KEY,
    "variant_id"       INTEGER NOT NULL,
    "passed_survey_id" INTEGER NOT NULL,
    FOREIGN KEY ("variant_id") REFERENCES "AnswerVariant" ("id") ON DELETE CASCADE,
    FOREIGN KEY ("passed_survey_id") REFERENCES "PassedSurvey" ("id") ON DELETE CASCADE
);

-- Create User table
CREATE TABLE "User"
(
    "id"        SERIAL PRIMARY KEY,
    "firstname" VARCHAR(255) NOT NULL,
    "lastname"  VARCHAR(255) NOT NULL,
    "nickname"  VARCHAR(255) NOT NULL,
    "email"     VARCHAR(255) NOT NULL,
    "password"  VARCHAR(255) NOT NULL,
    "role_id"   INTEGER      NOT NULL,
    FOREIGN KEY ("role_id") REFERENCES "Role" ("id") ON DELETE CASCADE
);

```

## RESTfull сервіс для управління даними

Схема бази даних (ORM Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model RoleHasPermission {
  appointed     DateTime   @updatedAt @default(now())
  role_id       Int        
  permission_id Int        
  permission    Permission @relation(fields: [permission_id], references: [id], onDelete: Cascade)
  role          Role       @relation(fields: [role_id], references: [id], onDelete: Cascade)

  @@id([role_id, permission_id])
}

model Permission {
  id    Int                 @id @default(autoincrement())
  name  String              
  roles RoleHasPermission[] 
}

model AnswerVariant {
  id          Int      @id @default(autoincrement())
  text        String   
  question    Question @relation(fields: [question_id], references: [id], onDelete: Cascade)
  question_id Int      
  answers     Answer[] 
}

model Question {
  id              Int             @id @default(autoincrement())
  text            String          
  survey_id       Int             
  survey          Survey          @relation(fields: [survey_id], references: [id], onDelete: Cascade)
  answer_variants AnswerVariant[] 
}

model Role {
  id          Int                 @id @default(autoincrement())
  name        String              
  permissions RoleHasPermission[] 
  users       User[]              
}

enum SurveyState {
  OPENED
  CLOSED
  PAUSED
}

model Survey {
  id            Int            @id @default(autoincrement())
  title         String         
  description   String?        
  created       DateTime       @default(now())
  user_id       Int            
  state         SurveyState    @default(OPENED)
  questions     Question[]     
  passed_survey PassedSurvey[] 
  user          User           @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model PassedSurvey {
  id        Int      @id @default(autoincrement())
  survey    Survey   @relation(fields: [survey_id], references: [id], onDelete: Cascade)
  survey_id Int      
  passed    DateTime @default(now())
  user      User     @relation(fields: [user_id], references: [id], onDelete: Cascade)
  user_id   Int      
  answers   Answer[] 
}

model Answer {
  id               Int           @id @default(autoincrement())
  variant          AnswerVariant @relation(fields: [variant_id], references: [id], onDelete: Cascade)
  variant_id       Int           
  passed_survey_id Int           
  survey           PassedSurvey  @relation(fields: [passed_survey_id], references: [id], onDelete: Cascade)
}

model User {
  id             Int            @id @default(autoincrement())
  firstname      String         
  lastname       String         
  nickname       String         
  email          String         
  password       String         
  role_id        Int            
  passed_surveys PassedSurvey[] 
  surveys        Survey[]       
  role           Role           @relation(fields: [role_id], references: [id], onDelete: Cascade)
}
```

## Основний модуль для встановлення зв'язків між репозиторіями та сервісами

```ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { UserRepository } from '../repositories/UserRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { PassedSurveyRepository } from '../repositories/PassedSurveyRepository';
import { RoleRepository } from '../repositories/RoleRepository';
import { PermissionRepository } from '../repositories/PermissionRepository';

@Module({
  exports: [
    PrismaService,
    SurveyRepository,
    UserRepository,
    QuestionRepository,
    PassedSurveyRepository,
    RoleRepository,
    PermissionRepository,
  ],
  providers: [
    PrismaService,
    SurveyRepository,
    UserRepository,
    QuestionRepository,
    PassedSurveyRepository,
    RoleRepository,
    PermissionRepository,
  ],
})
export class PrismaModule {
}
```

## Модуль для встановлення зв'язку між контролером, сервісом, репозиторієм та допоміжними засобами

```ts
import { Module } from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { SurveyController } from '../controllers/SurveyController';
import { PrismaModule } from './PrismaModule';
import { SurveyByIdPipe } from '../pipes/SurveyByIdPipe';
import { SurveyMapper } from '../mappers/SurveyMapper';
import { QuestionMapper } from '../mappers/QuestionMapper';

@Module({
  imports: [PrismaModule],
  exports: [SurveyService, SurveyByIdPipe, SurveyMapper, QuestionMapper],
  providers: [SurveyService, SurveyByIdPipe, SurveyMapper, QuestionMapper],
  controllers: [SurveyController],
})
export class SurveyModule {
}
```

## Контролер для роботи з питаннями

```ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { SurveyService } from '../services/SurveyService';
import { Survey } from '@prisma/client';
import { AddQuestionDTO } from '../dtos/AddQuestionDTO';
import { QuestionByIdPipe } from '../pipes/QuestionByIdPipe';
import { SurveyByIdPipe } from '../pipes/SurveyByIdPipe';
import { QuestionMapper } from '../mappers/QuestionMapper';
import { Access } from '../Decorators/Access';
import { UpdateQuestionDTO } from '../dtos/UpdateQuestionDTO';

@Controller('/survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly questionMapper: QuestionMapper,
  ) {}

  @Access('survey.$surveyId.add.question')
  @Post('/:surveyId/question')
  addQuestion(
    @Body() body: AddQuestionDTO,
    @Param('surveyId') surveyId: number,
  ) {
    return this.surveyService.addQuestion(body, surveyId);
  }
  @Access('survey.$surveyId.delete.question.$questionId')
  @Delete('/:surveyId/question/:questionId')
  deleteQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    return this.surveyService.deleteQuestion(questionId);
  }
  @Access('survey.$surveyId.update.question.$questionId')
  @Patch('/:surveyId/question/:questionId')
  updateQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
    @Body() body: UpdateQuestionDTO,
  ) {
    return this.surveyService.updateQuestion(surveyId, questionId, body);
  }
  @Access('survey.surveyId.get.questions')
  @Get('/:surveyId/questions')
  async getQuestions(@Param('surveyId', SurveyByIdPipe) surveyId: number) {
    const survey = await this.surveyService.getSurveyWithQuestions(surveyId);
    return this.surveyMapper.getSurveyWithQuestions(survey);
  }
  @Access('survey.surveyId.get.questions.$questionId')
  @Get('/:surveyId/questions/:questionId')
  getQuestion(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    return this.surveyService.getQuestion(surveyId, questionId);
  }
  @Access('survey.$surveyId.get.answers.$questionId')
  @Get('/:surveyId/answers/:questionId')
  async getQuestionWithAnswers(
    @Param('surveyId', SurveyByIdPipe) surveyId: number,
    @Param('questionId', QuestionByIdPipe) questionId: number,
  ) {
    const question = await this.surveyService.getQuestionWithAnswers(
      surveyId,
      questionId,
    );
    return this.questionMapper.getQuestionWithAnswers(question);
  }
```

## Сервіс для роботи з питаннями

```ts
import { Injectable } from '@nestjs/common';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { AnswerVariant, Question, Survey } from '@prisma/client';
import { AddQuestionDTO } from '../dtos/AddQuestionDTO';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { NotBelongException } from '../exceptions/NotBelongException';
import { DbQuestion } from '../DbEntities/DbQuestion';
import { UpdateQuestionDTO } from '../dtos/UpdateQuestionDTO';

@Injectable()
export class SurveyService {
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}
    async addQuestion(body: AddQuestionDTO, survey_id: number) {
    const { variants, text } = body;
    const question = await this.questionRepository.find({ survey_id, text });
    if (question) {
      throw new AlreadyExistsException('question');
    }
    return this.questionRepository.create({
      text,
      survey_id,
      answer_variants: {
        createMany: {
          data: variants.map((variant) => ({ text: variant })),
        },
      },
    });
  }
  deleteQuestion(questionId: number) {
    return this.questionRepository.delete({ id: questionId });
  }
  async getQuestion(surveyId: number, questionId: number) {
    const question = this.questionRepository.find({
      survey_id: surveyId,
      id: questionId,
    });

    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return question;
  }
  async getQuestionWithAnswers(surveyId: number, questionId: number) {
    const include = {
      answer_variants: {
        include: {
          answers: true,
        },
      },
    };
    const question = (await this.questionRepository.find(
      {
        survey_id: surveyId,
        id: questionId,
      },
      include,
    )) as any as DbQuestion;

    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return question;
  }
  private async checkAnswers(surveyId: number, answerIds: number[]) {
    const survey = (await this.surveyRepository.find({
      id: surveyId,
    })) as any;

    if (survey.state !== SurveyState.OPENED) {
      throw new SurveyIsClosedException(survey.state);
    }

    if (survey.questions.length !== answerIds.length) {
      throw new WrongAnswersFormatException();
    }

    for (const question of survey.questions) {
      if (
        !question.answer_variants.some((variant) =>
          answerIds.includes(variant.id),
        )
      ) {
        throw new WrongAnswersFormatException();
      }
    }
  }
  async updateQuestion(survey_id: number, id: number, body: UpdateQuestionDTO) {
    const question = await this.questionRepository.find({ id, survey_id });
    if (!question) {
      throw new NotBelongException('question', 'survey');
    }

    return this.questionRepository.updateById(id, {
      text: body.text,
      answer_variants: {
        deleteMany: {},
        createMany: {
          data: body.variants.map((variant) => ({ text: variant })),
        },
      },
    });
  }
}
```

## Репозиторій для доступу до бази даних

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prismaService: PrismaService) {}
  private include = { answer_variants: true };

  create(data: Prisma.QuestionUncheckedCreateInput) {
    return this.prismaService.question.create({ data, include: this.include });
  }

  delete(where: Prisma.QuestionWhereUniqueInput) {
    return this.prismaService.question.delete({ where, include: this.include });
  }

  find(
    where: Prisma.QuestionWhereInput,
    include: Prisma.QuestionInclude = this.include,
  ) {
    return this.prismaService.question.findFirst({
      where,
      include,
    });
  }
  findById(id: number) {
    return this.prismaService.question.findUnique({
      where: { id },
      include: this.include,
    });
  }
  updateById(id: number, data: Prisma.QuestionUncheckedUpdateInput) {
    return this.prismaService.question.update({ where: { id }, data });
  }
}
```

## Виняткові ситуації, що можуть виникнути

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(what: string) {
    super(`This ${what} already exists`, HttpStatus.BAD_REQUEST);
  }
}
```

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class DoesNotExistException extends HttpException {
  constructor(what: string) {
    super(`This ${what} does not exist`, HttpStatus.BAD_REQUEST);
  }
}
```

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class NotBelongException extends HttpException {
  constructor(what: string, where: string) {
    super(`${what} does not belong to ${where}`, HttpStatus.BAD_REQUEST);
  }
}
```

## Пайп для перевірки питання

```ts
import { PipeTransform, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { DoesNotExistException } from '../exceptions/DoesNotExistException';

@Injectable()
export class QuestionByIdPipe implements PipeTransform {
  constructor(private readonly questionRepository: QuestionRepository) {}
  async transform(questionId: number) {
    const question = await this.questionRepository.findById(+questionId);
    if (!question) {
      throw new DoesNotExistException('question');
    }
    return +questionId;
  }
}
```

## DTO для валідації даних

```ts
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddQuestionDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsArray()
  @IsNotEmpty()
  variants: string[];
}
```

```ts
import {
  IsArray,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateQuestionDTO {
  @MinLength(6)
  @MaxLength(256)
  @IsOptional()
  @IsString()
  text?: string;

  @IsArray()
  @IsOptional()
  variants?: string[];
}
```

