import { DbUser } from '../DbEntities/DbUser';

export class UserMapper {
  getUser(user: DbUser) {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      email: user.nickname,
      role: user.role,
      surveys: user.surveys,
    };
  }
}
