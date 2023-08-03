import { registerEnumType } from '@nestjs/graphql';

export enum CounselorType {
    PSYHOPE = "PSYHOPE",
    FACULTY = "FACULTY"
  }
  
  export enum StatusRequest {
    ACCEPTED = "ACCEPTED",
    NEED_ACCEPTED = "NEED_ACCEPTED"
  }
  

  registerEnumType(CounselorType, {
    name: 'CounselorType',
    description: 'The type of counselor, either PSYHOPE or FACULTY',
  })

  registerEnumType(StatusRequest, {
    name: 'StatusRequest'
  })
  