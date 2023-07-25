import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CounselingLogService } from './counseling-log.service';
import { CounselingLog } from './entities/counseling-log.entity';
import { CreateCounselingLogInput } from './dto/create-counseling-log.input';
import { LoggedIn } from 'src/guards/loggedIn.guard';
import { UserRepositories } from 'src/models/user.repo';
import { UseGuards } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';
import { JwtPayload } from 'src/auth/interfaces/jwt.payload';

@Resolver(() => CounselingLog)
export class CounselingLogResolver {
  constructor(private readonly counselingLogService: CounselingLogService, private readonly userRepo: UserRepositories) {}

  @Mutation(() => CounselingLog, {nullable: true})
  @UseGuards(LoggedIn)
  async createCounselingLog(@Args('createCounselingLogInput') createCounselingLogInput: CreateCounselingLogInput, @CurrentUser() pyload: JwtPayload) {
    const _user = await this.userRepo.findById(pyload.sub)
    if(_user.account.role == "FACULTY_COUNSELOR" || _user.account.role == "PSYHOPE_COUNSELOR")
      return this.counselingLogService.create(createCounselingLogInput);

    return null;
  }


  @Query(() => [CounselingLog],{name:'counselingLog', nullable:true})
  @UseGuards(LoggedIn)
  async counselingLog(@CurrentUser() user: JwtPayload){
    const _user = await this.userRepo.findById(user.sub)
    const { role } = user;
    switch (role) {
      case "FACULTY_COUNSELOR" || "FACULTY_ADMIN":
        return await this.counselingLogService.findAll({
          where : {
            client : {
              account : {
                faculty : _user.account.faculty,
              }
            },
            booking: {
              counselorType: "FACULTY"
            }
          }
        })
      case "PSYHOPE_COUNSELOR" || "PSYHOPE_ADMIN":
        return await this .counselingLogService.findAll({
          where: {
            booking: {
              counselorType : 'PSYHOPE'
            }
          }
        })
      
    }
  }

}
