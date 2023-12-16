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
