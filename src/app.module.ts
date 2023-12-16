import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/PrismaModule';
import { SurveyModule } from './modules/SurveyModule';
import { AuthModule } from './modules/AuthModule';
import { RoleModule } from './modules/RoleModule';
import { UserModule } from './modules/UserModule';

@Module({
  imports: [PrismaModule, SurveyModule, AuthModule, RoleModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
