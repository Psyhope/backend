import { Injectable } from '@nestjs/common';
import { CreateOnboardingInput } from './dto/create-onboarding.input';
import { DbService } from 'src/providers/database/db';
import { Gender } from '@prisma/client';

@Injectable()
export class OnboardingService {
  constructor(private readonly db: DbService) { }

  async create(createOnboardingInput: CreateOnboardingInput, userId: string) {
    if (createOnboardingInput.socmed == "instagram"){
      await this.db.account.update({
        where: {
          userId,
        },
        data: {
          channel: "INSTAGRAM",
          gender: createOnboardingInput.gender == "Laki-laki" ? Gender.MALE : Gender.FEMALE,
        }
      })

      return await this.db.user.update({
        where : {
          id: userId,
        },
        data:{
          igAcc: createOnboardingInput.linkSocmed,
          isOnboarded: true,
        }
      })
    }
    else {
      await this.db.account.update({
        where: {
          userId,
        },
        data: {
          channel: "LINE",
          gender: createOnboardingInput.gender == "Laki-laki" ? Gender.MALE : Gender.FEMALE,
        }
      })

      return await this.db.user.update({
        where : {
          id: userId,
        },
        data:{
          lineAcc: createOnboardingInput.linkSocmed,
          isOnboarded: true,
        }
      })
    }

    
  }
}
