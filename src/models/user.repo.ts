import { Injectable } from '@nestjs/common';
import { Gender, Prisma } from '@prisma/client';
import { FACULTY_MAP, Faculties } from 'src/auth/constants/faculty.constant';
import {
  FacultiesKey,
  MAJOR_MAP,
  Majors,
} from 'src/auth/constants/major.contant';
import { SSOAuthService } from 'src/auth/providers/sso.service';
import { DbService } from 'src/providers/database/db';

@Injectable()
export class UserRepositories {
  constructor(
    private readonly db: DbService,
    private readonly sso: SSOAuthService,
  ) {}

  async create(username: string, password: string) {
    const user = await this.sso.validate(username, password);
    const { kode_org } = user;
    const split = kode_org.split('.');
    const faculty: Faculties =
      FACULTY_MAP[`#.#.${split[2]}.${split[3].split(':')[0]}`];
    const majorList: Majors[FacultiesKey] = MAJOR_MAP[faculty];
    const userMajor = majorList.find(
      (major) => major.kd_org === kode_org.split(':')[0],
    );
    const { educational_program, study_program } = userMajor;

    return await this.db.user
      .create({
        data: {
          id: user.kodeidentitas,
          fullname: user.nama,
          username: user.username,
          namaRole: user.nama_role,
          organizationCode: user.kode_org,
          account: {
            create: {
              faculty,
              major: educational_program + ' ' + study_program,
              gender: Gender.ATTACK_HELICOPTER,
            },
          },
          lineAcc: null,
          igAcc: null,
        },
      })
      .catch(async (err) => {
        if (err.code === 'P2002') {
          return await this.db.user.findUnique({
            where: { id: user.kodeidentitas },
          });
        }
      });
  }

  async findById(id: string) {
    return await this.db.user.findUnique({
      where: {
        id: id,
      },
      include: {
        account: true,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.db.user.findUnique({
      where: {
        username,
      },
      include: {
        account: true,
      },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return await this.db.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return await this.db.user.delete({
      where: {
        id,
      },
    });
  }
}
