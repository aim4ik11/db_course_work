import { PassedSurvey, Role, Survey } from '@prisma/client';

export class DbUser {
  id: number;
  firstname: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  role_id: number;
  passed_surveys: PassedSurvey[];
  surveys: Survey[];
  role: Role;
}
