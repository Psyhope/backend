import { Injectable } from '@nestjs/common';
import { CreateOnboardingInput } from './dto/create-onboarding.input';
import { DbService } from 'src/providers/database/db';
import { UserRepositories } from 'src/models/user.repo';

@Injectable()
export class OnboardingService {
  constructor(private readonly db: DbService, private readonly userRepo: UserRepositories) { }

  async create(createOnboardingInput: CreateOnboardingInput, userId: string) {
    if (createOnboardingInput.socmed == "instagram"){
      await this.db.account.update({
        where: {
          userId,
        },
        data: {
          channel: "INSTAGRAM"
        }
      })
    }
    else {
      await this.db.account.update({
        where: {
          userId,
        },
        data: {
          channel: "LINE"
        }
      })
    }

    return await this.db.user.update({
      where : {
        id: userId,
      },
      data:{
        igAcc: createOnboardingInput.linkSocmed
      }
    })
  }
}
